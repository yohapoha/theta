/// <reference path="../../typings/jquery/jquery.d.ts" />
interface iNavigation {
    init: {
        nav:JQuery,
        navPanel:JQuery,
        slider:JQuery,
        sliderOuter?:string,
        link:JQuery,
        content:JQuery,
        bottom?:JQuery,
        bottomHeight?:number,
        centralize:boolean,
        fixing?:Array<JQuery>
    }
    functions: {
        centralize:boolean,
    }
    page: {
        height:Array<number>,
        scrollStart:number,
        scrollEnd:number,
        scroll:boolean
    };
    nav: {
        width:number,
        height:number,
        position:number
    }
    slider: {
        type:string,
        width:Array<number>,
        outer:number,
        position:Array<number>
    }
    link: {
        width:number,
        margin:number,
        length:number,
        position:Array<number>,
        hash:Array<string>,
        selected:number
    }
    bottom?: {
        height?:number
    }
}
class Navigation implements iNavigation {
    functions = {
        centralize: true
    };
    page = {
        height: [],
        scrollStart: 0,
        scrollEnd: 0,
        scroll: true,
    };
    nav = {
        width: 0,
        height: 0,
        position: 0
    };
    slider = {
        type: "slider",
        width: [],
        outer: 10,
        position: []
    };
    link = {
        width: 0,
        margin: 0,
        length: 0,
        position: [0],
        hash: [],
        selected: 0
    };
    bottom = {
        height: 40
    };
    constructor(public init:any) {
        var _this = this;
        if(typeof init.sliderOuter === "number") this.slider.outer = init.sliderOuter;
        if(typeof init.bottomHeight === "number") this.bottom.height = init.bottomHeight;
        if(typeof init.centralize === "boolean") this.functions.centralize = init.centralize;
        this.nav.height = init.nav.height();
        this.nav.position = init.nav.offset().top;
        this.link.length = init.link.length;
        init.link.map(function(pos, elem) {
            _this.slider.width.push(elem.offsetWidth + _this.slider.outer * 2);
            _this.link.width += elem.offsetWidth;
            _this.link.hash.push(elem.hash);
            _this.link.position.push(_this.link.position[pos] + elem.offsetWidth);
        });
        this.link.selected = this.link.hash.indexOf(window.location.hash) > -1?this.link.hash.indexOf(window.location.hash):0;
        this.loader();
    };
    valuesLoad():void {
        var _this = this;
        this.page.height = [];
        this.init.link.map(function(pos, elem) {
            pos?_this.page.height.push($(elem.hash + "-page").offset().top - _this.nav.height):_this.page.height.push(0);
        });
        this.nav.width = this.init.navPanel.width();
        this.link.margin = Math.floor((this.nav.width - this.link.width) / (this.link.length * 2));
        this.slider.position = [];
        this.link.position.map(function(val, pos) {
            _this.slider.position.push(_this.link.margin + val + (_this.link.margin * pos * 2) - _this.slider.outer);
        });
    };
    navFix():void {
        var _this = this;
        if ($(window).scrollTop() >= this.nav.position) {
            if(!this.init.nav.hasClass("navbar-fixed-top")) {
                this.init.nav.addClass("navbar-fixed-top");
                this.init.bottom.css("height", this.bottom.height);
                this.init.content.css("padding-top", this.nav.height);
                if(this.init.fixing) {
                    this.init.fixing.map(function(val, pos) {
                        val.css("position", "fixed")
                            .css("top", _this.nav.height)
                    });
                }
            }
        } else {
            if(this.init.nav.hasClass("navbar-fixed-top")) {
                this.init.nav.removeClass("navbar-fixed-top");
                this.init.bottom.css("height", 0);
                this.init.content.css("padding-top", 0);
                if(this.init.fixing) {
                    this.init.fixing.map(function(val, pos) {
                        val.css("position", "relative")
                            .css("top", 0)
                    });
                }
            }
        }
    }
    navLoad():void {
        this.navFix();
        this.sliderMover();
        this.scrollCalc();
        this.scrollTo();
    };
    sliderMover(index:number = this.link.selected):void {
        this.init.slider.css('margin-left', this.slider.position[index]).css('width', this.slider.width[index]);
    };
    scrollTo(index:number = this.link.selected):void {
        $(window).scrollTop(this.page.height[index]);
    };
    scrollCalc():void {
        var currentPage, nextPage;
        currentPage = this.link.selected <= 0 ? 0 : this.link.selected;
        this.page.scrollStart = this.page.height[currentPage];
        nextPage = this.link.selected >= (this.link.length - 1) ? this.link.length - 1 : this.link.selected + 1;
        this.page.scrollEnd = this.page.height[nextPage];
        if(currentPage === 0) this.page.scrollStart = 0;
        if(currentPage === nextPage) this.page.scrollEnd = Infinity;
    };
    scrollCheck(scrollPosition:number):void {
        if(!((this.page.scrollStart <= scrollPosition && scrollPosition <= this.page.scrollEnd))) {
            if(scrollPosition <= this.page.scrollStart && this.link.selected !== 0) {
                --this.link.selected;
            }
            if(scrollPosition >= this.page.scrollEnd && this.link.selected !== this.link.length - 1) {
                ++this.link.selected;
            }
            window.location.hash = this.link.hash[this.link.selected];
            this.scrollCalc();
            this.sliderMover();
        }
    };
    eventsLoad():void {
        var _this = this;
        this.init.link.click(function() {
            _this.page.scroll = false;
            _this.link.selected = _this.link.hash.indexOf(this.hash);
            _this.scrollTo();
            _this.sliderMover();
        });
        this.init.link.hover(function() {
            _this.sliderMover(_this.link.hash.indexOf(this.hash));
        }, function () {
            _this.sliderMover();
        });
        $(window).resize(function() {
            _this.valuesLoad();
            _this.sliderMover();
            _this.functionsLoad();
        }.debounce(300));
        $(window).scroll(function() {
            _this.navFix();
            if(_this.page.scroll) {
                _this.scrollCheck($(window).scrollTop());
            } else {
                _this.page.scroll = true;
            }
        });
    };
    linkCentralize():void {
        this.init.link.css("padding", "0 " + this.link.margin + "px");
    };

    functionsLoad():void {
        !this.functions.centralize || this.linkCentralize();
    };
    loader():void {
        this.valuesLoad();
        this.eventsLoad();
        this.navLoad();
        this.functionsLoad();
    };
}
var nav = new Navigation({
    nav: $(".navigation"),
    navPanel: $(".navigation-panel"),
    slider: $(".slider"),
    link: $(".navigation-link"),
    content: $(".content"),
    bottom: $(".bottom"),
    fixing: [$('#sidebar-order')]
});