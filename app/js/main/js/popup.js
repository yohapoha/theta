/// <reference path="../../../../typings/jquery/jquery.d.ts" />
var Popup = (function () {
    function Popup() {
        this.container = $(".popup-container");
        this.popup = $(".popup");
        this.body = $(".popup-body");
        this.openButton = $(".js_popup__popup-open");
        this.closeButton = $(".js_popup__popup-close");
        this.popupLoad();
    }
    Popup.prototype.popupClose = function () {
        var _this = this;
        this.container.css("opacity", 0);
        setTimeout(function () {
            _this.container.css("display", "none");
        }, 500);
    };
    Popup.prototype.popupOpen = function () {
        var _this = this;
        this.container.css("display", "block");
        setTimeout(function () {
            _this.container.css("opacity", 1);
        }, 50);
    };
    Popup.prototype.popupSize = function () {
        var bodyChildren = this.body.children();
        this.popup.css("width", bodyChildren.width()).css("height", bodyChildren.height());
    };
    Popup.prototype.popupActions = function () {
        var _this = this;
        this.closeButton.on("click", function () {
            _this.popupClose();
        });
        this.openButton.on("click", function () {
            _this.popupOpen();
        });
    };
    Popup.prototype.popupLoad = function () {
        this.popupSize();
        this.popupActions();
    };
    return Popup;
})();
//# sourceMappingURL=popup.js.map
