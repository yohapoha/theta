/// <reference path="../../typings/jquery/jquery.d.ts" />
interface iCentralize {
    element:JQuery,
    parent:JQuery
}
class Centralize implements iCentralize {
    parent = $();
    constructor(public element:JQuery) {
        this.parent = element.parent();
        this.elementCentralize();
    };
    elementCentralize():void {
        this.element.css("margin-left", Math.floor(this.parent.width() - this.element.width()/2));
        console.log(this.parent);
    }

}
new Centralize($("input-submit"));