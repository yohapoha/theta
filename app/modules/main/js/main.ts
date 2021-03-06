/// <reference path="../../../../typings/maskedinput/maskedinput.d.ts" />
/// <reference path="common.ts"/>
/// <reference path="popup.ts"/>
/// <reference path="menu.ts"/>

$(document).ready(function() {
    centralizeH();
    centralizeV();
    centralizeF();
    jQuery(function($) {
        $("#order-phone").mask("+7(999)999-99-99");
    });
    tabulatorNavigation();
    showOnLoad();
    topFix($(".top-container"), $(".js_top-point"));
    new Popup();
    new Menu();
    if (navigator.userAgent.indexOf('Mac') != -1) {
        console.log("hello")
    }
});