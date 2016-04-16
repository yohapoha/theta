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
	buttonSelect(element: JQuery, selectHover: boolean = false): void {
		element.find(".menu-button__line").css("background-color", "#2b2b2b");
		if (selectHover) {
			this.button.select.find(".menu-button__line").css("background-color", "#a2a2a2");
		}
	}
	buttonFree(element: JQuery, selectHover: boolean = false): void {
		element.find(".menu-button__line").css("background-color", "inherit");
		if (selectHover) {
			this.button.select.find(".menu-button__line").css("background-color", "#2b2b2b");
		}
	}
	menuActions(): void {
		var _this = this;
		this.buttonSelect(this.button.select);
		this.button.element.hover(function () {
			var button: JQuery = $(this);
			if (!button.hasClass("menu-button_select")) {
				_this.buttonSelect(button);
			}
		}, function () {
			var button: JQuery = $(this);
			if (!button.hasClass("menu-button_select")) {
				_this.buttonFree(button);
			}
		})
		this.button.element.click(function() {
			_this.button.select.removeClass("menu-button_select");
			_this.button.select = $(this);
			$(this).addClass("menu-button_select");
			_this.buttonFree(_this.button.element);
			_this.buttonSelect(_this.button.select);
			
		})
	}
}