/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralizeH(element, onResize) {
    if (element === void 0) { element = $(".js_centralize-h"); }
    if (onResize === void 0) { onResize = false; }
    element.each(function () {
        var _this = $(this);
        var parent = _this.parent();
        _this.css("margin-left", Math.floor((parent.width() - _this.outerWidth()) / 2));
        parent.css('opacity', 1);
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
        parent.css('opacity', 1);
        console.log(Math.floor((parent.height() - _this.outerHeight()) / 2));
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
        parent.css('opacity', 1);
    });
}
function switchMenu() {
    var menu = $(".switch-menu");
    var button = $(".switch-button");
    var block = $(".switch-block");
    button.on("click", function () {
        var _this = $(this);
        if (!_this.hasClass("switch-button_select")) {
            button.removeClass("switch-button_select");
            _this.addClass("switch-button_select");
            if (!block.eq(_this.index()).hasClass("switch-block_show")) {
                block.removeClass("switch-block_show");
                block.eq(_this.index()).addClass("switch-block_show");
            }
        }
    });
}
$(document).ready(function () {
    centralizeH();
    centralizeV();
    centralizeF();
    jQuery(function ($) {
        $("#order-phone").mask("+7(999)999-99-99");
    });
    switchMenu();
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