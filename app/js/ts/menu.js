/// <reference path="../../typings/jquery/jquery.d.ts" />
var MenuSlider = (function () {
    function MenuSlider() {
        this.body = $(".menu");
        this.sector = {
            element: $(".menu-sector"),
            width: [0],
            links: [0]
        };
        this.link = {
            element: $(".menu-sector__link"),
            width: [0],
            margin: [0]
        };
        this.slider = {
            element: $(".menu-slide__slider")
        };
        var _this = this;
        this.sector.element.map(function (index, element) {
            var elem = $(element);
            _this.sector.width.push(elem.width());
            _this.sector.links.push(elem.children().length);
        });
        this.link.element.map(function (index, element) {
            var elem = $(element);
            _this.link.width.push(elem.outerWidth());
        });
        this.sector.links.map(function (index, element) {
        });
    }
    MenuSlider.prototype.linkCentralize = function () {
        var _this = this;
    };
    return MenuSlider;
})();
//# sourceMappingURL=menu.js.map
