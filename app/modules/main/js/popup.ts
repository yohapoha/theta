/// <reference path="../../typings/jquery/jquery.d.ts" />

interface iPopup {
    container:JQuery;
    popup:JQuery;
    body:JQuery;
    openButton:JQuery;
    closeButton: JQuery;
}
class Popup implements iPopup {
    container:JQuery = $(".popup-container");
    popup:JQuery = $(".popup");
    body:JQuery = $(".popup-body");
    openButton = $(".js_popup__popup-open");
    closeButton:JQuery = $(".js_popup__popup-close");
    constructor() {
        this.popupLoad();
    }
    popupClose(): void {
        var _this = this;
        this.container.css("opacity", 0);
        setTimeout(function() {
            _this.container.css("display", "none");
        }, 500);
    }
    popupOpen(): void {
        var _this = this;
        this.container.css("display", "block")
        setTimeout(function() {
            _this.container.css("opacity", 1);
        }, 50);
    }
    popupSize(): void {
        var bodyChildren = this.body.children();
        this.popup.css("width", bodyChildren.width())
            .css("height", bodyChildren.height());
    }
    popupActions(): void {
        var _this = this;
        this.closeButton.on("click", function() {
            _this.popupClose();
        });
        this.openButton.on("click", function() {
            _this.popupOpen();
        });
    }
    popupLoad(): void {
        this.popupSize();
        this.popupActions();
    }
}