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
	buttonHover(element: JQuery, select: boolean = false): void {
		var buttonLine: JQuery = element.find(".menu-button__line");
		if (select) {
			buttonLine.css("height", "2px")
				.css("background-color", "#2b2b2b");
		} else {
			buttonLine.css("height", "1px")
				.css("background-color", "#e2e2e2");
		}
	}
	buttonSelect(element: JQuery, hover: boolean = false): void {
		element.find(".menu-button__line").css("height", "2px")
			.css("background-color", "#2b2b2b");
		if (hover) {
			this.button.select.find(".menu-button__line").css("background-color", "#643cfa");
		}
	}
	buttonFree(element: JQuery, hover: boolean = false): void {
		element.find(".menu-button__line").css("height", "1px")
			.css("background-color", "#e2e2e2");
		if (hover) {
			this.button.select.find(".menu-button__line").css("background-color", "#2b2b2b");
		}
	}
	menuActions(): void {
		var _this = this;
		this.buttonSelect(this.button.select);
		this.button.element.hover(function () {
			var button: JQuery = $(this);
			if (!button.hasClass("menu-button_select")) {
				_this.buttonSelect(button, true);
			}
		}, function () {
			var button: JQuery = $(this);
			if (!button.hasClass("menu-button_select")) {
				_this.buttonFree(button, true);
			}
		})
		this.button.element.click(function() {
			_this.button.element.removeClass("menu-button_select");
			_this.button.select = $(this);
			$(this).addClass("menu-button_select");
			_this.buttonFree(_this.button.element);
			_this.buttonSelect(_this.button.select);
			
		})
	}
}