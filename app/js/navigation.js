(function() {
  var linksMargin, navigation, scrolling, sliderMove;

  navigation = {
    panel: {
      elem: $(".navigation-panel"),
      width: 0
    },
    slider: {
      elem: $(".slider"),
      widths: [],
      outerwidth: 40,
      positions: []
    },
    links: {
      elems: $(".navigation-link"),
      widths: [],
      fullWidth: 0,
      margin: 0,
      positions: [],
      hashes: [],
      selected: "#main"
    },
    scroll: {
      head: {
        height: $(".head").outerHeight()
      },
      nav: {
        elem: $(".navigation")
      },
      bottom: {
        elem: $(".bottom"),
        height: 40
      }
    }
  };

  navigation.links.elems.map(function(pos, elem) {
    navigation.slider.widths[pos] = elem.offsetWidth + navigation.slider.outerwidth;
    navigation.links.widths[pos] = elem.offsetWidth;
    navigation.links.hashes[pos] = elem.hash;
    if (elem.hash === window.location.hash) {
      return navigation.links.selected = elem.hash;
    }
  });

  navigation.links.fullWidth = navigation.links.widths.reduce(function(sum, current) {
    navigation.links.positions.push(sum);
    return sum + current;
  }, 0);

  sliderMove = function(hash) {
    var buttonIndex;
    if (hash == null) {
      hash = navigation.links.selected;
    }
    buttonIndex = navigation.links.hashes.indexOf(hash);
    return navigation.slider.elem.css('margin-left', navigation.slider.positions[buttonIndex]).css('width', navigation.slider.widths[buttonIndex]);
  };

  (linksMargin = function() {
    navigation.panel.width = navigation.panel.elem.width();
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.elems.length * 2));
    navigation.slider.positions = [];
    navigation.links.positions.map(function(val, pos) {
      return navigation.slider.positions.push(navigation.links.margin + val + (navigation.links.margin * pos * 2) - navigation.slider.outerwidth / 2);
    });
    navigation.links.elems.css("padding", "10px " + navigation.links.margin + "px 6px");
    return sliderMove();
  })();

  (scrolling = function() {
    if ($(window).scrollTop() >= navigation.scroll.head.height) {
      if (!navigation.scroll.nav.elem.hasClass("navbar-fixed-top")) {
        navigation.scroll.nav.elem.addClass("navbar-fixed-top");
        return navigation.scroll.bottom.elem.css("height", navigation.scroll.bottom.height);
      }
    } else {
      if (navigation.scroll.nav.elem.hasClass("navbar-fixed-top")) {
        navigation.scroll.nav.elem.removeClass("navbar-fixed-top");
        return navigation.scroll.bottom.elem.css("height", 0);
      }
    }
  })();

  $(window).resize(function() {
    return linksMargin();
  });

  navigation.links.elems.mouseover(function() {
    return sliderMove(this.hash);
  });

  navigation.links.elems.mouseout(function() {
    return sliderMove();
  });

  navigation.links.elems.click(function() {
    navigation.links.selected = this.hash;
    return sliderMove();
  });

  $(window).scroll(function() {
    return scrolling();
  });

}).call(this);
