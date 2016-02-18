(function() {
  var linksMargin, navigation, sliderMove;

  navigation = {
    panel: {
      elem: $(".navigation-panel"),
      height: $(".navigation-panel").outerHeight() + $(".slider-panel").outerHeight(),
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
      length: 0,
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
        elem: $(".navigation")
      },
      content: {
        elem: $(".content")
      },
      bottom: {
        elem: $(".bottom"),
        height: 40
      },
      navbarFix: function() {
        if ($(window).scrollTop() >= navigation.scroll.head.height) {
          if (!navigation.scroll.navbar.elem.hasClass("navbar-fixed-top")) {
            navigation.scroll.navbar.elem.addClass("navbar-fixed-top");
            navigation.scroll.bottom.elem.css("height", navigation.scroll.bottom.height);
            return navigation.scroll.content.elem.css("padding-top", navigation.panel.height);
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
        return $(window).scrollTop(navigation.pages.positions[index] - navigation.panel.height);
      },
      sliderAutoscroll: {
        startPosition: 0,
        endPosition: 0,
        calcPositions: function() {
          var currentPage, nextPage;
          currentPage = navigation.links.selected <= 0 ? 0 : navigation.links.selected;
          navigation.scroll.sliderAutoscroll.startPosition = navigation.pages.positions[currentPage] - navigation.panel.height;
          nextPage = navigation.links.selected >= (navigation.links.length - 1) ? navigation.links.length - 1 : navigation.links.selected + 1;
          navigation.scroll.sliderAutoscroll.endPosition = navigation.pages.positions[nextPage] - navigation.panel.height;
          if (currentPage === 0) {
            navigation.scroll.sliderAutoscroll.startPosition = 0;
          }
          if (currentPage === nextPage) {
            return navigation.scroll.sliderAutoscroll.endPosition = Infinity;
          }
        }
      }
    }
  };

  navigation.links.length = navigation.links.elems.length;

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
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.length * 2));
    navigation.links.elems.css("padding", "0 " + navigation.links.margin + "px");
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

  console.log(navigation.scroll.s);

  $(window).scroll(function() {
    var scrollPos;
    navigation.scroll.navbarFix();
    scrollPos = $(window).scrollTop();
    if (!((navigation.scroll.sliderAutoscroll.startPosition <= scrollPos && scrollPos <= navigation.scroll.sliderAutoscroll.endPosition))) {
      if (scrollPos < navigation.scroll.sliderAutoscroll.startPosition && navigation.links.selected !== 0) {
        --navigation.links.selected;
      }
      if (scrollPos > navigation.scroll.sliderAutoscroll.endPosition && navigation.links.selected !== navigation.links.length - 1) {
        ++navigation.links.selected;
      }
      navigation.scroll.sliderAutoscroll.calcPositions();
      return sliderMove(navigation.links.selected);
    } else {
      return console.log(navigation.links.hashes[navigation.links.selected]);
    }
  });

}).call(this);
