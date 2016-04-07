/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralizeH(element, onResize) {
    if (element === void 0) { element = $(".js_centralize-h"); }
    if (onResize === void 0) { onResize = false; }
    element.each(function () {
        var _this = $(this);
        var parent = _this.parent();
        _this.css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
    });
    if (onResize) {
        var parent = element.parent();
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.outerWidth()) / 2));
        }.debounce(300));
    }
}
function centralizeV(element) {
    if (element === void 0) { element = $(".js_centralize-v"); }
    element.each(function () {
        var _this = $(this);
        var parent = _this.parent();
        _this.css("margin-top", Math.floor((parent.height() - _this.outerHeight()) / 2));
    });
}
function centralizeF(element) {
    if (element === void 0) { element = $(".js_centralize-f"); }
    element.each(function () {
        var _this = $(this);
        var parent = _this.parent();
        parent.css('transition', 1);
        _this.css("margin-top", Math.floor((parent.height() - _this.outerHeight()) / 2))
            .css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
    });
}
function tabulatorNavigation(element) {
    if (element === void 0) { element = $(".js_tabulator-navigation"); }
    var menu = element.find(".tabulator");
    var button = element.find(".tabulator-button");
    var block = element.find(".tabulator-block");
    button.on("click", function () {
        var _this = $(this);
        if (!_this.hasClass("tabulator-button_select")) {
            button.removeClass("tabulator-button_select");
            _this.addClass("tabulator-button_select");
            if (!block.eq(_this.index()).hasClass("tabulator-block_select")) {
                block.css("opacity", 0);
                setTimeout(function () {
                    block.removeClass("tabulator-block_select");
                    block.eq(_this.index()).addClass("tabulator-block_select");
                    setTimeout(function () {
                        block.eq(_this.index()).css("opacity", 1);
                    }, 50);
                }, 250);
            }
        }
    });
}
function showOnLoad(element) {
    if (element === void 0) { element = $(".js_show-on-load"); }
    setTimeout(function () {
        element.css('opacity', 1);
    }, 50);
}
function topFix(element, point) {
    var startPosition = point.offset().top;
    var elementHeight = element.outerHeight(true) + 15;
    setTimeout(function () {
        element.css("display", "block")
            .css("top", -elementHeight);
    }, 50);
    $(window).scroll(function () {
        var _this = $(this);
        if (!element.hasClass("fixed") && (_this.scrollTop() >= startPosition)) {
            element.addClass("fixed");
            element.css("top", 0);
        }
        if (element.hasClass("fixed") && (_this.scrollTop() < startPosition)) {
            element.removeClass("fixed");
            element.css("top", -elementHeight);
        }
    });
}
var Popup = (function () {
    function Popup() {
        this.container = $(".popup-container");
        this.popup = $(".popup");
        this.body = $(".popup-body");
        this.openButton = $(".js_popup__popup-open");
        this.closeButton = $(".js_popup__popup-close");
        this.popupLoad();
    }
    ;
    Popup.prototype.popupClose = function () {
        var _this = this;
        this.container.css("opacity", 0);
        setTimeout(function () {
            _this.container.css("display", "none");
        }, 500);
    };
    ;
    Popup.prototype.popupOpen = function () {
        var _this = this;
        this.container.css("display", "block");
        setTimeout(function () {
            _this.container.css("opacity", 1);
        }, 50);
    };
    ;
    Popup.prototype.popupSize = function () {
        var bodyChildren = this.body.children();
        this.popup.css("width", bodyChildren.width())
            .css("height", bodyChildren.height());
    };
    ;
    Popup.prototype.popupActions = function () {
        var _this = this;
        this.closeButton.on("click", function () {
            _this.popupClose();
        });
        this.openButton.on("click", function () {
            _this.popupOpen();
        });
    };
    ;
    Popup.prototype.popupLoad = function () {
        this.popupSize();
        this.popupActions();
    };
    return Popup;
})();
var Slider = (function () {
    function Slider(container) {
        this.container = {
            element: $(),
            width: 0
        };
        this.link = {
            element: $(),
            num: 0,
            width: {
                sum: 0,
                each: []
            },
            margin: 0
        };
        this.linkNum = 0;
        this.slider = {
            element: $(),
            width: [],
            margin: [],
            position: 0
        };
        var _this = this;
        this.container.element = container;
        this.container.width = this.container.element.width();
        this.link.element = container.find(".slider-navigation__link");
        this.link.num = this.link.element.length;
        this.link.element.map(function (index, element) {
            var elementWidth = $(element).outerWidth(true);
            _this.link.width.each.push(elementWidth);
            _this.link.width.sum += elementWidth;
            _this.slider.width.push(elementWidth);
        });
        this.link.margin = Math.floor(((this.container.width - this.link.width.sum) / this.link.num) / 2) - 1;
        this.slider.element = container.find(".slider-line__slider");
        this.link.element.map(function (index, element) {
            if (!index) {
                _this.slider.margin.push(_this.link.margin);
            }
            else {
                _this.slider.margin.push(_this.slider.margin[index - 1] + _this.link.width.each[index - 1] + _this.link.margin * 2);
            }
        });
        this.sliderLoad();
    }
    ;
    Slider.prototype.linkCentralize = function () {
        this.link.element.css("margin", "0 " + this.link.margin + "px");
    };
    Slider.prototype.sliderMove = function (index) {
        if (index === void 0) { index = this.slider.position; }
        this.slider.element.css("width", this.slider.width[index])
            .css("margin-left", this.slider.margin[index]);
    };
    Slider.prototype.sliderActions = function () {
        var _this = this;
        this.link.element.on("click", function () {
            _this.slider.position = $(this).index();
        });
        this.link.element.hover(function () {
            _this.sliderMove($(this).index());
        }, function () {
            _this.sliderMove();
        });
    };
    Slider.prototype.sliderLoad = function () {
        this.linkCentralize();
        this.sliderActions();
        this.sliderMove();
    };
    return Slider;
})();
var MenuSlider = (function () {
    function MenuSlider() {
        this.body = $(".menu");
        this.sector = {
            element: $(".menu-sector"),
            width: [],
            links: []
        };
        this.link = {
            element: $(".menu-sector__link"),
            width: [],
            margin: []
        };
        this.slider = {
            element: $(".menu-slide__slider"),
            margin: []
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
            for (index;;)
                ;
        });
        console.log(this.link.margin);
        this.linkCentralize();
    }
    MenuSlider.prototype.linkCentralize = function () {
        var _this = this;
        this.link.element.map(function (index, element) {
            $(element).css("margin", "0 " + _this.link.margin[index] + "px");
        });
    };
    return MenuSlider;
})();
$(document).ready(function () {
    centralizeH();
    centralizeV();
    centralizeF();
    jQuery(function ($) {
        $("#order-phone").mask("+7(999)999-99-99");
    });
    tabulatorNavigation();
    showOnLoad();
    topFix($(".top-container"), $(".js_top-point"));
    new Popup();
    new Slider($(".header-slider"));
    new MenuSlider();
});
/*
$(document).ready(function() {
    centralizeH($(".top-center__logo"), true);
    centralizeH($(".contacts"), true);
    centralizeV($(".contacts"));

    jQuery(function($){
        $("#order-phone").mask("+7(999)999-99-99");
    });
});*/
//# sourceMappingURL=main.js.map