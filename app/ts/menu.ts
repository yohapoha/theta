/// <reference path="../../typings/jquery/jquery.d.ts" />

interface iMenuSlider {
    body: JQuery;
    sector: {
        element: JQuery;
        width: Array<number>;
        links: Array<number>;
    };
    link: {
        element: JQuery;
        width: Array<number>;
        margin: Array<number>;
    };
}
class MenuSlider implements iMenuSlider {
    body = $(".menu");
    sector = {
        element: $(".menu-sector"),
        width: [0],
        links: [0]
    }
    link = {
        element: $(".menu-sector__link"),
        width: [0],
        margin: [0]
    }
    slider = {
        element: $(".menu-slide__slider"),
    }
    constructor() {
        var _this = this;
        this.sector.element.map(function(index, element) {
            var elem:JQuery = $(element);
            _this.sector.width.push(elem.width());
            _this.sector.links.push(elem.children().length);
        })
        this.link.element.map(function(index, element) {
            var elem:JQuery = $(element);
            _this.link.width.push(elem.outerWidth());
        })
        this.sector.links.map(function(index, element) {
        })
    }
    linkCentralize(): void {
        var _this = this;
    }
}