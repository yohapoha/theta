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
        bottomHeight?:string,
        centralize:boolean
    }
    functions: {
        centralize:boolean
    }
    nav: {
        width:number
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
}
class Navigation implements iNavigation {
    functions = {
        centralize: true
    };
    nav = {
        width: 0
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
    constructor(public init:any) {
        var _this = this;
        if(typeof init.centralize === "boolean") this.functions.centralize = init.centralize;
        if(typeof init.sliderOuter === "number") this.slider.outer = init.sliderOuter;
        this.link.length = init.link.length;
        init.link.map(function(pos, elem) {
            _this.slider.width.push(elem.offsetWidth + _this.slider.outer * 2);
            _this.link.width += elem.offsetWidth;
            _this.link.hash.push(elem.hash);
            _this.link.position.push(_this.link.position[pos] + elem.offsetWidth);
        });
        this.loader();
    };
    valuesLoad():void {
        var _this = this;
        this.nav.width = this.init.navPanel.width();
        this.link.margin = Math.floor((this.nav.width - this.link.width) / (this.link.length * 2));
        this.slider.position = [];
        this.link.position.map(function(val, pos) {
            _this.slider.position.push(_this.link.margin + val + (_this.link.margin * pos * 2) - _this.slider.outer);
        });
    };
    linkCentralize():void {
        this.init.link.css("padding", "0 " + this.link.margin + "px");
    };
    sliderMover(index:number = this.link.selected):void {
        this.init.slider.css('margin-left', this.slider.position[index]).css('width', this.slider.width[index]);
    };
    sliderEvents():void {
        var _this = this;
        this.init.link.click(function() {
            _this.link.selected = _this.link.hash.indexOf(this.hash);
            _this.sliderMover();
        });
        this.init.link.hover(function() {
            _this.sliderMover(_this.link.hash.indexOf(this.hash));
        }, function () {
            _this.sliderMover();
        });
    };
    sliderLoad():void {
        this.sliderMover();
        this.sliderEvents();
    };
    windowEvents():void {
        var _this = this;
        $(window).resize(function() {
            _this.valuesLoad();
            _this.linkCentralize();
            _this.sliderMover();
        });
    };
    loader():void {
        this.valuesLoad();
        this.sliderLoad();
        !this.functions.centralize || this.linkCentralize();
        this.windowEvents();
    };
}
var nav = new Navigation({
    nav: $(".navigation"),
    navPanel: $(".navigation-panel"),
    slider: $(".slider"),
    link: $(".navigation-link"),
    content: $(".content"),
    bottom: $(".bottom")
});