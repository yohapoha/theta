(function() {
  var menuMargin, sliderMargin, topMenu;

  topMenu = {
    panel: {
      elem: $(".menu-panel"),
      width: 0
    },
    slider: {
      elem: $(".slider"),
      widths: [],
      positions: []
    },
    links: {
      elems: $(".menu-link"),
      widths: [],
      fullWidth: 0,
      margin: 0,
      positions: [],
      hashes: [],
      selected: "#main"
    }
  };

  topMenu.links.elems.map(function(pos, elem) {
    topMenu.slider.widths[pos] = elem.offsetWidth + 40;
    topMenu.links.widths[pos] = elem.offsetWidth;
    topMenu.links.hashes[pos] = elem.hash;
    if (elem.hash === window.location.hash) {
      return topMenu.links.selected = elem.hash;
    }
  });

  topMenu.links.fullWidth = topMenu.links.widths.reduce(function(sum, current) {
    topMenu.links.positions.push(sum);
    return sum + current;
  }, 0);

  sliderMargin = function(hash) {
    var buttonIndex;
    if (hash == null) {
      hash = topMenu.links.selected;
    }
    buttonIndex = topMenu.links.hashes.indexOf(hash);
    return topMenu.slider.elem.css('margin-left', topMenu.slider.positions[buttonIndex]).css('width', topMenu.slider.widths[buttonIndex]);
  };

  (menuMargin = function() {
    topMenu.panel.width = topMenu.panel.elem.width();
    topMenu.links.margin = Math.floor((topMenu.panel.width - topMenu.links.fullWidth) / (topMenu.links.elems.length * 2));
    topMenu.slider.positions = [];
    topMenu.links.positions.map(function(val, pos) {
      return topMenu.slider.positions.push(topMenu.links.margin + val + (topMenu.links.margin * pos * 2) - 20);
    });
    topMenu.links.elems.css("padding", "5px " + topMenu.links.margin + "px");
    return sliderMargin();
  })();

  $(window).resize(function() {
    return menuMargin();
  });

  topMenu.links.elems.mouseover(function() {
    return sliderMargin(this.hash);
  });

  topMenu.links.elems.mouseout(function() {
    return sliderMargin();
  });

  topMenu.links.elems.click(function() {
    topMenu.links.selected = this.hash;
    return sliderMargin();
  });

}).call(this);
