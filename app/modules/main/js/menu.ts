/// <reference path="../../../../typings/jquery/jquery.d.ts" />

interface iMenu {
	sector: {
		element: JQuery;
		margin: Array<number>;
	};
	button: {
		element: JQuery;
		select: JQuery;
	};
}
class Menu implements iMenu {
	sector = {
		element: $(".menu-sector"),
		margin: [],
	}
	button = {
		element: $(".menu-button"),
		select: $(".menu-button_select")
	}
	constructor() {
		var _this = this;
		this.sector.element.map(function(index, element) {
			var sector: JQuery = $(element);
			var sectorWidth: number = sector.width();
			var sectorMargin: number = 0;
			var childs: JQuery = sector.children();
			var childsNumber: number = childs.length;
			var childsWidth: number = 0;
			childs.map(function(index, element) {
				childsWidth += $(element).outerWidth();
			})
			sectorMargin = Math.floor(((sectorWidth - childsWidth) / 2) / childsNumber) -1;
			_this.sector.margin.push(sectorMargin);
		})        
		this.buttonCentralize();
		this.menuActions();
	}
	buttonCentralize(): void {
		var _this = this;
		this.sector.element.map(function(index, element) {
			var elem: JQuery = $(element);
			var elemIndex: number = index;
			var childs: JQuery = elem.children();
			childs.css("margin", "0 " + _this.sector.margin[elemIndex] + "px");
		})
	}
	buttonSelect(button: JQuery = this.button.select): void {
		this.button.select.removeClass("menu-button_select")
			.find(".menu-button__line").css("background-color", "inherit");
		button.addClass("menu-button_select")
			.find(".menu-button__line").css("background-color", "#2b2b2b");
		this.button.select = button;
	}
	buttonHover(button: JQuery, mouseOver: boolean = true): void {
		var buttonLine: JQuery = button.find(".menu-button__line");
		if (mouseOver) {
			buttonLine.css("background-color", "#643cfa");
		} else {
			if (button.hasClass("menu-button_select")) {
				buttonLine.css("background-color", "#2b2b2b");
			} else {
				buttonLine.css("background-color", "inherit");
			}
		}
	}
	menuActions(): void {
		var _this = this;
		this.buttonSelect(this.button.select);
		this.button.element.hover(function () {
			_this.buttonHover($(this));
		}, function () {
			_this.buttonHover($(this), false);
		})
		this.button.element.click(function() {
			_this.buttonSelect($(this));
		})
	}
}