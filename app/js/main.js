/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/maskedinput/maskedinput.d.ts" />
function centralize(element, onResize) {
    if (onResize === void 0) { onResize = false; }
    var parent = element.parent();
    element.css("margin-left", Math.floor((parent.width() - element.outerWidth()) / 2));
    if (onResize) {
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.outerWidth()) / 2));
        }.debounce(300));
    }
}
$(document).ready(function () {
    centralize($(".button-center"));
    jQuery(function ($) {
        $("#order-phone").mask("+7(999)999-99-99");
    });
});
//# sourceMappingURL=main.js.map