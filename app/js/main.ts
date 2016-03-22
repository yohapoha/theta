/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralizeH(element:JQuery, onResize:boolean = false):void {
    var parent:JQuery = element.parent();
    element.css("margin-left", Math.floor((parent.width() - element.outerWidth())/2));
    if(onResize) {
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.outerWidth()) / 2));
        }.debounce(300));
    }
}
function centralizeV(element:JQuery) {
    var parent:JQuery = element.parent();
    element.css("margin-top", Math.floor((parent.height() - element.outerHeight())/2));
}
function centralizeF(element:JQuery):void {
    var parent:JQuery = element.parent();
    element.css("margin-top", Math.floor((parent.height() - element.outerHeight())/2))
            .css("margin-left", Math.floor((parent.width() - element.outerWidth())/2));
}
$(document).ready(function() {
    centralizeF($(".top-logo__logo"));
    centralizeF($(".top-switch__body"));
    centralizeH($(".button-center"));
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
