(function() {
  var linksMargin, navigation, sliderMove;

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
      selected: 0
    },
    pages: {
      positions: []
    },
    scroll: {
      head: {
        height: $(".head").outerHeight()
      },
      navbar: {
        elem: $(".navigation"),
        padding: 40
      },
      content: {
        elem: $(".content")
      },
      bottom: {
        elem: $(".bottom"),
        height: 40
      },
      position: 0,
      navbarFix: function() {
        if ($(window).scrollTop() >= navigation.scroll.head.height) {
          if (!navigation.scroll.navbar.elem.hasClass("navbar-fixed-top")) {
            navigation.scroll.navbar.elem.addClass("navbar-fixed-top");
            navigation.scroll.bottom.elem.css("height", navigation.scroll.bottom.height);
            return navigation.scroll.content.elem.css("padding-top", navigation.scroll.navbar.padding);
          }
        } else {
          if (navigation.scroll.navbar.elem.hasClass("navbar-fixed-top")) {
            navigation.scroll.navbar.elem.removeClass("navbar-fixed-top");
            navigation.scroll.bottom.elem.css("height", 0);
            return navigation.scroll.content.elem.css("padding-top", 0);
          }
        }
      },
      scrollTo: function(index) {
        return $(window).scrollTop(navigation.pages.positions[index] - navigation.scroll.navbar.padding);
      }
    }
  };

  navigation.scroll.navbarFix();

  navigation.links.elems.map(function(pos, elem) {
    navigation.slider.widths.push(elem.offsetWidth + navigation.slider.outerwidth);
    navigation.links.widths.push(elem.offsetWidth);
    navigation.links.hashes.push(elem.hash);
    if (elem.hash === window.location.hash) {
      return navigation.links.selected = navigation.links.hashes.indexOf(elem.hash);
    }
  });

  navigation.links.fullWidth = navigation.links.widths.reduce(function(sum, current) {
    navigation.links.positions.push(sum);
    return sum + current;
  }, 0);

  sliderMove = function(index) {
    if (index == null) {
      index = navigation.links.selected;
    }
    return navigation.slider.elem.css('margin-left', navigation.slider.positions[index]).css('width', navigation.slider.widths[index]);
  };

  (linksMargin = function() {
    navigation.panel.width = navigation.panel.elem.width();
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.elems.length * 2));
    navigation.links.elems.css("padding", "10px " + navigation.links.margin + "px 6px");
    navigation.slider.positions = [];
    navigation.links.positions.map(function(val, pos) {
      return navigation.slider.positions.push(navigation.links.margin + val + (navigation.links.margin * pos * 2) - navigation.slider.outerwidth / 2);
    });
    sliderMove();
    navigation.pages.positions = [];
    return navigation.links.elems.map(function(pos, elem) {
      return navigation.pages.positions.push($(elem.hash + "-page").offset().top);
    });
  })();

  $(window).resize(function() {
    return linksMargin();
  });

  navigation.links.elems.mouseover(function() {
    return sliderMove(navigation.links.hashes.indexOf(this.hash));
  });

  navigation.links.elems.mouseout(function() {
    return sliderMove();
  });

  navigation.links.elems.click(function() {
    navigation.links.selected = navigation.links.hashes.indexOf(this.hash);
    sliderMove(navigation.links.selected);
    return navigation.scroll.scrollTo(navigation.links.selected);
  });

  $(window).scroll(function() {
    var endPos, scrollEnd, scrollPos, scrollStart, startPos;
    navigation.scroll.navbarFix();
    scrollPos = $(window).scrollTop();
    startPos = navigation.scroll.position <= 0 ? 0 : navigation.scroll.position;
    scrollStart = navigation.pages.positions[startPos] - navigation.scroll.navbar.padding;
    endPos = navigation.scroll.position >= navigation.links.hashes.length ? navigation.links.hashes.length : navigation.scroll.position + 1;
    scrollEnd = navigation.pages.positions[endPos] - navigation.scroll.navbar.padding;
    if (!((scrollStart <= scrollPos && scrollPos <= scrollEnd))) {
      if (scrollPos < scrollStart && navigation.scroll.position !== 0) {
        --navigation.scroll.position;
      }
      if (scrollPos > scrollEnd && navigation.scroll.position !== navigation.links.hashes.length - 1) {
        return ++navigation.scroll.position;
      }
    } else {
      return console.log(navigation.links.hashes[navigation.scroll.position]);
    }
  });

}).call(this);
