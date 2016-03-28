/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralizeH(element:JQuery = $(".js_centralize-h"), onResize:boolean = false):void {
    element.each(function() {
        var _this = $(this);
        var parent:JQuery = _this.parent();
        _this.css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
    })
    if(onResize) {
        var parent:JQuery = element.parent()
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.outerWidth()) / 2));
        }.debounce(300));
    }
}
function centralizeV(element:JQuery = $(".js_centralize-v")):void {
    element.each(function() {
        var _this = $(this);
        var parent:JQuery = _this.parent();
        _this.css("margin-top", Math.floor((parent.height() - _this.outerHeight()) / 2));
    })
}
function centralizeF(element:JQuery = $(".js_centralize-f")):void {
    element.each(function() {
        var _this = $(this);
        var parent:JQuery = _this.parent();
        parent.css('transition', 1);
        _this.css("margin-top", Math.floor((parent.height() - _this.outerHeight()) / 2))
            .css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
    })
}
function tabulatorNavigation(element:JQuery = $(".js_tabulator-navigation")):void {
    var menu:JQuery = element.find(".tabulator");
    var button:JQuery = element.find(".tabulator-button");
    var block:JQuery = element.find(".tabulator-block");
    button.on("click", function() {
        var _this = $(this);
        if(!_this.hasClass("tabulator-button_select")) {
            button.removeClass("tabulator-button_select");
            _this.addClass("tabulator-button_select");
            if(!block.eq(_this.index()).hasClass("tabulator-block_select")) {
                block.css("opacity", 0);
                setTimeout(function() {
                    block.removeClass("tabulator-block_select");
                    block.eq(_this.index()).addClass("tabulator-block_select")
                    setTimeout(function() {
                        block.eq(_this.index()).css("opacity", 1);
                    }, 50)
                }, 250)
            }
        }
    })
}
function showOnLoad(element:JQuery = $(".js_show-on-load")):void {
    setTimeout(function() {
        element.css('opacity', 1);
    }, 50);
}
function topFix(element:JQuery, point:JQuery) {
    var startPosition = point.offset().top;
    var elementHeight = element.outerHeight(true) + 15;
    element.css("display", "block")
        .css("top", -elementHeight);
    $(window).scroll(function() {
        var _this = $(this);
        if(!element.hasClass("fixed") && (_this.scrollTop() >= startPosition)) {
            element.addClass("fixed");
            element.css("top", 0)
        }
        if(element.hasClass("fixed") && (_this.scrollTop() < startPosition)) {
            element.removeClass("fixed");
            element.css("top", -elementHeight);
        }
    })
}
$(document).ready(function() {
    centralizeH();
    centralizeV();
    centralizeF();
    jQuery(function($){
        $("#order-phone").mask("+7(999)999-99-99");
    });
    tabulatorNavigation();
    showOnLoad();
    topFix($(".top-container"), $(".content-container"));
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
