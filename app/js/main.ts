/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralizeH(element:JQuery = $(".js_centralize-h"), onResize:boolean = false):void {
    element.each(function() {
        var _this = $(this);
        var parent:JQuery = _this.parent();
        _this.css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
        parent.css('opacity', 1);
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
        parent.css('opacity', 1);
        console.log(Math.floor((parent.height() - _this.outerHeight()) / 2))
    })
}
function centralizeF(element:JQuery = $(".js_centralize-f")):void {
    element.each(function() {
        var _this = $(this);
        var parent:JQuery = _this.parent();
        parent.css('transition', 1);
        _this.css("margin-top", Math.floor((parent.height() - _this.outerHeight()) / 2))
            .css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
        parent.css('opacity', 1);
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

$(document).ready(function() {
    centralizeH();
    centralizeV();
    centralizeF();
    jQuery(function($){
        $("#order-phone").mask("+7(999)999-99-99");
    });
    tabulatorNavigation();
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
