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
$(document).ready(function() {
    centralizeH($(".top-center__logo"), true);
    centralizeH($(".contacts"), true);
    centralizeV($(".contacts"));
    centralizeH($(".button-center"));
    jQuery(function($){
        $("#order-phone").mask("+7(999)999-99-99");
    });
});