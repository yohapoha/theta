/// <reference path="../../../../typings/jquery/jquery.d.ts" />

interface iMenuSlider {
    body: JQuery;
    sector: {
        element: JQuery;
        width: Array<number>;
        margin: Array<number>;
        childs: Array<number>;
    };
    button: {
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
    button = {
        element: $(".menu-button"),
        select: 0
    }
    slider = {
        element: $(".menu-slide__slider"),
        width: [],
        margin: []
    }
    constructor(buttonSelect:number) {
        var _this = this;
        this.button.select = buttonSelect;
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
                var buttonWidth: number = $(element).outerWidth();
                childsWidth += buttonWidth;
                _this.slider.width.push(buttonWidth);
                
            })
            sectorMargin = Math.floor(((sectorWidth - childsWidth) / 2) / childsNumber) -1;
            _this.sector.margin.push(sectorMargin);
            if (index) {
                (function() {
                    var _index: number = index;
                    while (_index != 0) {
                        sliderMargin += _this.sector.width[--_index];
                    }
                })();
            }
            childs.map(function(index, element) {
                var buttonIndex: number = _this.buttonIndex($(element));
                if(!index) {
                    sliderMargin += sectorMargin;
                } else {
                    sliderMargin += _this.slider.width[buttonIndex - 1] + sectorMargin * 2;
                }
                _this.slider.margin.push(sliderMargin);
            })
        })        
        this.buttonCentralize();
        this.sliderMover();
        this.sliderActions();
    }
    buttonCentralize(): void {
        var _this = this;
        this.sector.element.map(function(index, element) {
            var elem: JQuery = $(element);
            var elemIndex: number = index;
            var childs: JQuery = elem.children();
            childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
        })
    }
    buttonIndex(element: JQuery): number {
        var button: JQuery = element;
        var buttonIndex: number = button.index();
        var sector: JQuery = button.parent();
        var sectorIndex: number = sector.index();
        if (sectorIndex) {
            while (sectorIndex != 0) {
                buttonIndex += this.sector.childs[--sectorIndex];
            }
        }
        return buttonIndex;
    }
    sliderMover(buttonIndex: number = this.button.select): void {
        this.slider.element.css("margin-left", this.slider.margin[buttonIndex])
            .css("width", this.slider.width[buttonIndex]);
    }
    sliderActions(): void {
        var _this = this;
        this.button.element.hover(function() {
            var buttonIndex: number = _this.buttonIndex($(this));
            _this.sliderMover(buttonIndex);
        }, function() {
            _this.sliderMover();
        })
        this.button.element.click(function() {
            var buttonIndex: number = _this.buttonIndex($(this));
            _this.button.select = buttonIndex;
        })
    }
}