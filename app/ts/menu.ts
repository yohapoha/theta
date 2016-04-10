/// <reference path="../../typings/jquery/jquery.d.ts" />

interface iMenuSlider {
    body: JQuery;
    sector: {
        element: JQuery;
        width: Array<number>;
        margin: Array<number>;
        childs: Array<number>;
    };
    link: {
        element: JQuery;
        select: number;
    };
    slider: {
        element: JQuery;
        width: Array<number>;
        margin: Array<number>;
    }
}
class MenuSlider implements iMenuSlider {
    body = $(".menu");
    sector = {
        element: $(".menu-sector"),
        width: [],
        margin: [],
        childs: []
    }
    link = {
        element: $(".menu-sector__link"),
        select: 1
    }
    slider = {
        element: $(".menu-slide__slider"),
        width: [],
        margin: []
    }
    constructor() {
        var _this = this;
        this.sector.element.map(function(index, element) {
            var sector: JQuery = $(element);
            var sectorWidth: number = sector.width();
            var sectorMargin: number = 0;
            var childs: JQuery = sector.children();
            var childsNumber: number = childs.length;
            var childsWidth: number = 0;
            var sliderMargin: number = 0;
            _this.sector.width.push(sectorWidth);
            _this.sector.childs.push(childsNumber);
            childs.map(function(index, element) {
                var linkWidth: number = $(element).outerWidth();
                childsWidth += linkWidth;
                _this.slider.width.push(linkWidth);
                
            })
            sectorMargin = Math.floor(((sectorWidth - childsWidth) / 2) / childsNumber);
            _this.sector.margin.push(sectorMargin);
            if (index) {
                (function() {
                    var _index = index;
                    while (_index != 0) {
                        sliderMargin += _this.sector.width[--_index];
                    }
                })();
            }
            childs.map(function(index, element) {
                var linkIndex = _this.linkIndex($(element));
                if(!index) {
                    sliderMargin += sectorMargin;
                } else {
                    sliderMargin += _this.slider.width[linkIndex - 1] + sectorMargin * 2;
                }
                _this.slider.margin.push(sliderMargin);
            })
        })        
        this.linkCentralize();
        this.sliderMover();
        this.sliderActions();
    }
    linkCentralize(): void {
        var _this = this;
        this.sector.element.map(function(index, element) {
            var elem: JQuery = $(element);
            var elemIndex: number = index;
            var childs: JQuery = elem.children();
            childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
        })
    }
    linkIndex(element: JQuery): number {
        var link: JQuery = element;
        var linkIndex: number = link.index();
        var sector: JQuery = link.parent();
        var sectorIndex: number = sector.index();
        if (sectorIndex) {
            while (sectorIndex != 0) {
                linkIndex += this.sector.childs[--sectorIndex];
            }
        }
        return linkIndex;
    }
    sliderMover(linkIndex: number = this.link.select): void {
        this.slider.element.css("margin-left", this.slider.margin[linkIndex])
            .css("width", this.slider.width[linkIndex]);
    }
    sliderActions(): void {
        var _this = this;
        this.link.element.hover(function() {
            var linkIndex = _this.linkIndex($(this));
            _this.sliderMover(linkIndex);
        }, function() {
            _this.sliderMover();
        })
        this.link.element.click(function() {
            var linkIndex = _this.linkIndex($(this));
            _this.link.select = linkIndex;
        })
    }
}