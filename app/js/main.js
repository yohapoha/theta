/// <reference path="../../typings/jquery/jquery.d.ts" />
var Centralize = (function () {
    function Centralize(element) {
        this.element = element;
        this.parent = $();
        this.parent = element.parent();
        this.elementCentralize();
    }
    ;
    Centralize.prototype.elementCentralize = function () {
        this.element.css("margin-left", Math.floor(this.parent.width() - this.element.width() / 2));
        console.log(this.parent);
    };
    return Centralize;
})();
new Centralize($("input-submit"));
//# sourceMappingURL=main.js.map