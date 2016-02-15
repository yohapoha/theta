(function() {
  var menuMargin, sliderMargin, topMenu;

  topMenu = {
    panel: $(".menu-panel"),
    slider: $(".slider"),
    links: {
      elems: $(".menu-link"),
      length: $(".menu-link").length,
      width: [],
      position: [],
      allWidth: 0
    },
    elemsMargin: 0
  };

  topMenu.links.elems.map(function(el, val) {
    return topMenu.links.width[el] = val.offsetWidth;
  });

  topMenu.links.allWidth = topMenu.links.width.reduce(function(sum, current) {
    topMenu.links.position.push(sum);
    return sum + current;
  }, 0);

  sliderMargin = function(button) {
    var sliderMarginNum;
    if (button == null) {
      button = $('.menu-link.select');
    }
    sliderMarginNum = topMenu.elemsMargin + topMenu.links.position[button.index()] + (topMenu.elemsMargin * (button.index() * 2) + button.index() * 4) - 20;
    return topMenu.slider.css('margin-left', sliderMarginNum).css('width', button.width() + 40);
  };

  menuMargin = function() {
    var menuWidth;
    menuWidth = topMenu.panel.width();
    topMenu.elemsMargin = Math.floor((menuWidth - topMenu.links.allWidth) / (topMenu.links.length * 2) - 2);
    topMenu.links.elems.css("padding", "0 " + topMenu.elemsMargin + "px");
    return sliderMargin();
  };

  menuMargin();

  $(window).resize(function() {
    return menuMargin();
  });

  topMenu.links.elems.mouseover(function() {
    sliderMargin($(this));
  });

}).call(this);
