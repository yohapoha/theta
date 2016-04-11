/// <reference path="../../typings/jquery/jquery.d.ts" />
var MenuSlider = (function () {
    function MenuSlider(linkSelect) {
        this.body = $(".menu");
        this.sector = {
            element: $(".menu-sector"),
            width: [],
            margin: [],
            childs: []
        };
        this.link = {
            element: $(".menu-sector__link"),
            select: 0
        };
        this.slider = {
            element: $(".menu-slide__slider"),
            width: [],
            margin: []
        };
        var _this = this;
        this.link.select = linkSelect;
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
                var linkWidth = $(element).outerWidth();
                childsWidth += linkWidth;
                _this.slider.width.push(linkWidth);
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
                var linkIndex = _this.linkIndex($(element));
                if (!index) {
                    sliderMargin += sectorMargin;
                } else {
                    sliderMargin += _this.slider.width[linkIndex - 1] + sectorMargin * 2;
                }
                _this.slider.margin.push(sliderMargin);
            });
        });
        this.linkCentralize();
        this.sliderMover();
        this.sliderActions();
    }
    MenuSlider.prototype.linkCentralize = function () {
        var _this = this;
        this.sector.element.map(function (index, element) {
            var elem = $(element);
            var elemIndex = index;
            var childs = elem.children();
            childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
        });
    };
    MenuSlider.prototype.linkIndex = function (element) {
        var link = element;
        var linkIndex = link.index();
        var sector = link.parent();
        var sectorIndex = sector.index();
        if (sectorIndex) {
            while (sectorIndex != 0) {
                linkIndex += this.sector.childs[--sectorIndex];
            }
        }
        return linkIndex;
    };
    MenuSlider.prototype.sliderMover = function (linkIndex) {
        if (typeof linkIndex === "undefined") { linkIndex = this.link.select; }
        this.slider.element.css("margin-left", this.slider.margin[linkIndex]).css("width", this.slider.width[linkIndex]);
    };
    MenuSlider.prototype.sliderActions = function () {
        var _this = this;
        this.link.element.hover(function () {
            var linkIndex = _this.linkIndex($(this));
            _this.sliderMover(linkIndex);
        }, function () {
            _this.sliderMover();
        });
        this.link.element.click(function () {
            var linkIndex = _this.linkIndex($(this));
            _this.link.select = linkIndex;
        });
    };
    return MenuSlider;
})();
//# sourceMappingURL=menu.js.map
