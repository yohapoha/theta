(function() {
  var menuMover, sliderMover, topMenu;

  topMenu = {
    panel: $(".menu-panel"),
    slider: $(".slider"),
    links: {
      elems: $(".menu-link"),
      width: [],
      allWidth: 0,
      position: []
    },
    elemsMargin: 0
  };

  topMenu.links.elems.map(function(el, val) {
    return topMenu.links.width[el] = val.offsetWidth;
  });

  topMenu.links.allWidth = topMenu.links.width.reduce(function(sum, cur) {
    topMenu.links.position.push(sum);
    return sum + cur;
  }, 0);

  sliderMover = function(button) {
    var buttonIndex, sliderMarginNum;
    if (button == null) {
      button = $('.menu-link.select');
    }
    buttonIndex = button.index();
    sliderMarginNum = topMenu.elemsMargin + topMenu.links.position[buttonIndex] + (topMenu.elemsMargin * (buttonIndex * 2) + buttonIndex * 4) - 20;
    return topMenu.slider.css('margin-left', sliderMarginNum).css('width', topMenu.links.width[buttonIndex] + 40);
  };

  (menuMover = function() {
    var menuWidth;
    menuWidth = topMenu.panel.width();
    topMenu.elemsMargin = Math.floor((menuWidth - topMenu.links.allWidth) / (topMenu.links.elems.length * 2) - 2);
    topMenu.links.elems.css("padding", "5px " + topMenu.elemsMargin + "px");
    return sliderMover();
  })();

  $(window).resize(function() {
    return menuMover();
  });

  topMenu.links.elems.mouseover(function() {
    return sliderMover($(this));
  });

  topMenu.links.elems.mouseout(function() {
    return sliderMover();
  });

}).call(this);
