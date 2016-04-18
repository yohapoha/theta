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
        this.button.select.removeClass("menu-button_select").find(".menu-button__line").css("background-color", "inherit");
        button.addClass("menu-button_select").find(".menu-button__line").css("background-color", "#2b2b2b");
        this.button.select = button;
    };
    Menu.prototype.buttonHover = function (button, mouseOver) {
        if (typeof mouseOver === "undefined") { mouseOver = true; }
        var buttonLine = button.find(".menu-button__line");
        if (mouseOver) {
            buttonLine.css("background-color", "#643cfa");
        } else {
            if (button.hasClass("menu-button_select")) {
                buttonLine.css("background-color", "#2b2b2b");
            } else {
                buttonLine.css("background-color", "inherit");
            }
        }
    };
    Menu.prototype.menuActions = function () {
        var _this = this;
        this.buttonSelect(this.button.select);
        this.button.element.hover(function () {
            _this.buttonHover($(this));
        }, function () {
            _this.buttonHover($(this), false);
        });
        this.button.element.click(function () {
            _this.buttonSelect($(this));
        });
    };
    return Menu;
})();
//# sourceMappingURL=menu.js.map
