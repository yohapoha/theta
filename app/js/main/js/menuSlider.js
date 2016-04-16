/// <reference path="../../../../typings/jquery/jquery.d.ts" />
var MenuSlider = (function () {
    function MenuSlider(buttonSelect) {
        this.body = $(".menu");
        this.sector = {
            element: $(".menu-sector"),
            width: [],
            margin: [],
            childs: []
        };
        this.button = {
            element: $(".menu-button"),
            select: 0
        };
        this.slider = {
            element: $(".menu-slide__slider"),
            width: [],
            margin: []
        };
        var _this = this;
        this.button.select = buttonSelect;
        this.sector.element.map(function (index, element) {
            var sector = $(element);
            var sectorWidth = sector.width();
            var sectorMargin = 0;
            var childs = sector.children();
            var childsNumber = childs.length;
            var childsWidth = 0;
            var sliderMargin = 0;
            _this.sector.width.push(sectorWidth);
            _this.sector.childs.push(childsNumber);
            childs.map(function (index, element) {
                var buttonWidth = $(element).outerWidth();
                childsWidth += buttonWidth;
                _this.slider.width.push(buttonWidth);
            });
            sectorMargin = Math.floor(((sectorWidth - childsWidth) / 2) / childsNumber) - 1;
            _this.sector.margin.push(sectorMargin);
            if (index) {
                (function () {
                    var _index = index;
                    while (_index != 0) {
                        sliderMargin += _this.sector.width[--_index];
                    }
                })();
            }
            childs.map(function (index, element) {
                var buttonIndex = _this.buttonIndex($(element));
                if (!index) {
                    sliderMargin += sectorMargin;
                } else {
                    sliderMargin += _this.slider.width[buttonIndex - 1] + sectorMargin * 2;
                }
                _this.slider.margin.push(sliderMargin);
            });
        });
        this.buttonCentralize();
        this.sliderMover();
        this.sliderActions();
    }
    MenuSlider.prototype.buttonCentralize = function () {
        var _this = this;
        this.sector.element.map(function (index, element) {
            var elem = $(element);
            var elemIndex = index;
            var childs = elem.children();
            childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
        });
    };
    MenuSlider.prototype.buttonIndex = function (element) {
        var button = element;
        var buttonIndex = button.index();
        var sector = button.parent();
        var sectorIndex = sector.index();
        if (sectorIndex) {
            while (sectorIndex != 0) {
                buttonIndex += this.sector.childs[--sectorIndex];
            }
        }
        return buttonIndex;
    };
    MenuSlider.prototype.sliderMover = function (buttonIndex) {
        if (typeof buttonIndex === "undefined") { buttonIndex = this.button.select; }
        this.slider.element.css("margin-left", this.slider.margin[buttonIndex]).css("width", this.slider.width[buttonIndex]);
    };
    MenuSlider.prototype.sliderActions = function () {
        var _this = this;

        /*this.button.element.hover(function() {
        var buttonIndex: number = _this.buttonIndex($(this));
        _this.sliderMover(buttonIndex);
        }, function() {
        _this.sliderMover();
        })
        this.button.element.click(function() {
        var buttonIndex: number = _this.buttonIndex($(this));
        _this.button.select = buttonIndex;
        })*/
        this.button.element.hover(function () {
            $(this).find(".menu-button__line").css("height", "2px").css("background-color", "#2b2b2b");
        }, function () {
            $(this).find(".menu-button__line").css("height", "1px").css("background-color", "#e2e2e2");
        });
    };
    return MenuSlider;
})();
//# sourceMappingURL=menuSlider.js.map
