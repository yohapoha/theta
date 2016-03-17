/// <reference path="../../typings/jquery/jquery.d.ts" />
function centralize(element:JQuery, onResize:boolean = false):void {
    var parent:JQuery = element.parent();
    element.css("margin-left", Math.floor((parent.width() - element.width())/2));
    if(onResize) {
        $(window).resize(function () {
            element.css("margin-left", Math.floor((parent.width() - element.width()) / 2));
        }.debounce(300));
    }
}
centralize($(".input-submit"), true);