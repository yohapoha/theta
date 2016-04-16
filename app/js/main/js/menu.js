/// <reference path="../../../../typings/jquery/jquery.d.ts" />
var Menu = (function () {
    function Menu() {
        this.sector = {
            element: $(".menu-sector"),
            margin: []
        };
        this.button = {
            element: $(".menu-button"),
            select: $(".menu-button_select")
        };
        var _this = this;
        this.sector.element.map(function (index, element) {
            var sector = $(element);
            var sectorWidth = sector.width();
            var sectorMargin = 0;
            var childs = sector.children();
            var childsNumber = childs.length;
            var childsWidth = 0;
            childs.map(function (index, element) {
                childsWidth += $(element).outerWidth();
            });
            sectorMargin = Math.floor(((sectorWidth - childsWidth) / 2) / childsNumber) - 1;
            _this.sector.margin.push(sectorMargin);
        });
        this.buttonCentralize();
        this.menuActions();
    }
    Menu.prototype.buttonCentralize = function () {
        var _this = this;
        this.sector.element.map(function (index, element) {
            var elem = $(element);
            var elemIndex = index;
            var childs = elem.children();
            childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
        });
    };
    Menu.prototype.buttonSelect = function (button) {
        if (typeof button === "undefined") { button = this.button.select; }
        this.button.element.find(".menu-button__line").css("background-color", "inherit");
        button.find(".menu-button__line").css("background-color", "#2b2b2b");
    };
    Menu.prototype.buttonHover = function (button, mouseOver) {
        if (typeof mouseOver === "undefined") { mouseOver = true; }
        if (mouseOver) {
            button.find(".menu-button__line").css("background-color", "#a2a2a2");
        } else {
            button.find(".menu-button__line").css("background-color", "inherit");
        }
    };
    Menu.prototype.menuActions = function () {
        var _this = this;
        this.buttonSelect(this.button.select);
        this.button.element.hover(function () {
            var button = $(this);
            if (!button.hasClass("menu-button_select")) {
                _this.buttonHover(button);
            }
        }, function () {
            var button = $(this);
            if (!button.hasClass("menu-button_select")) {
                _this.buttonHover(button, false);
            }
        });
        this.button.element.click(function () {
            _this.button.select.removeClass("menu-button_select");
            _this.button.select = $(this);
            $(this).addClass("menu-button_select");
            _this.buttonSelect();
        });
    };
    return Menu;
})();
//# sourceMappingURL=menu.js.map
