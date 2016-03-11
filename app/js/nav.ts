/// <reference path="../../typings/jquery/jquery.d.ts" />
interface iNavigation {
    init: {
        nav:JQuery,
        navPanel:JQuery,
        slider:JQuery,
        sliderOuter?:string,
        link:JQuery,
        content:JQuery,
        bottom?:JQuery,
        bottomHeight?:string,
        centralize:boolean
    }
    functions: {
        centralize:boolean
    }
    nav: {
        width:number
    }
    slider: {
        type:string,
        outer:number,
        margin:Array<number>
    }
    link: {
        width:number,
        margin:number,
        length:number,
        position:Array<string>,
        hash:Array<string>
    }
}
class Navigation implements iNavigation {
    functions = {
        centralize: true
    };
    nav = {
        width: 0
    };
    slider = {
        type: "slider",
        outer: 20,
        margin: []

    };
    link = {
        width: 0,
        margin: 0,
        length: 0,
        position: [],
        hash: []
    };
    constructor(public init:any) {
        if(typeof init.centralize === "boolean") this.functions.centralize = init.centralize;
        if(typeof init.sliderOuter === "number") this.slider.outer = init.sliderOuter;
        this.nav.width = init.navPanel.width();
        console.log(this.slider.outer);
        this.loadMap(init.link, this.slider, this.link);
        this.link.length = init.link.length;
        this.link.margin = Math.floor((this.nav.width - this.link.width) / (this.link.length * 2));
        this.loader();
    };
    loadMap(element, slider, link):void {
        element.map(function(pos, elem) {
            slider.margin.push(elem.offsetWidth + slider.outer * 2);
            link.width += elem.offsetWidth;
            link.hash.push(elem.hash);
            link.position.push((link.position[pos - 1] || 0) + elem.offsetWidth);
        });
    };
    navigationCentralize():void {
        this.init.link.css("padding", "0 " + this.link.margin + "px");
    };
    sliderType():void {
        if(this.slider.type === "slider") {

        }
    };
    loader():void {
        !this.functions.centralize || this.navigationCentralize();
    }
}
var nav = new Navigation({
    nav: $(".navigation"),
    navPanel: $(".navigation-panel"),
    slider: $(".slider"),
    link: $(".navigation-link"),
    content: $(".content"),
    bottom: $(".bottom")
});