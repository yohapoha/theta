/// <reference path="../../typings/jquery/jquery.d.ts" />
function centralize(element, onResize) {
    if (onResize === void 0) { onResize = false; }
    var parent = element.parent();
    element.css("margin-left", Math.floor((parent.width() - element.width()) / 2));
    if (onResize) {
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.width()) / 2));
        }.debounce(300));
    }
}
centralize($(".input-submit"), true);
//# sourceMappingURL=main.js.map