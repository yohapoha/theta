/*
(function() {
  var navigation;

  navigation = {
    elem: $(".navigation"),
    panel: $(".navigation-panel"),
    width: 0,
    height: $(".navigation").outerHeight(),
    position: $(".navigation").offset().top,
    slider: {
      elem: $(".slider"),
      margin: [],
      outerwidth: 20,
      positions: []
    },
    link: {
      elem: $(".navigation-link"),
      length: 0,
      width: 0,
      margin: 0,
      position: [],
      hash: [],
      selected: 0
    },
    page: {
      position: [],
      scrollStart: 0,
      scrollEnd: 0
    },
    scroll: {
      byScrolling: true,
      content: {
        elem: $(".content")
      },
      bottom: {
        elem: $(".bottom"),
        height: 40
      }
    },
    sliderMover: function(index) {
      if (index == null) {
        index = navigation.link.selected;
      }
      return navigation.slider.elem.css('margin-left', navigation.slider.positions[index]).css('width', navigation.slider.margin[index]);
    },
    sliderPositionsLoad: function() {
      navigation.slider.positions = [];
      return navigation.link.position.map(function(val, pos) {
        return navigation.slider.positions.push(navigation.link.margin + val + (navigation.link.margin * pos * 2) - navigation.slider.outerwidth);
      });
    },
    scrollPositionCalc: function() {
      var currentPage, nextPage;
      currentPage = navigation.link.selected <= 0 ? 0 : navigation.link.selected;
      navigation.page.scrollStart = navigation.page.position[currentPage];
      nextPage = navigation.link.selected >= (navigation.link.length - 1) ? navigation.link.length - 1 : navigation.link.selected + 1;
      navigation.page.scrollEnd = navigation.page.position[nextPage];
      if (currentPage === 0) {
        navigation.page.scrollStart = 0;
      }
      if (currentPage === nextPage) {
        return navigation.page.scrollEnd = Infinity;
      }
    },
    scrollPositionCheck: function(scrollPosition) {
      if (!((navigation.page.scrollStart <= scrollPosition && scrollPosition <= navigation.page.scrollEnd))) {
        if (scrollPosition <= navigation.page.scrollStart && navigation.link.selected !== 0) {
          --navigation.link.selected;
        }
        if (scrollPosition >= navigation.page.scrollEnd && navigation.link.selected !== navigation.link.length - 1) {
          ++navigation.link.selected;
        }
        window.location.hash = navigation.link.hash[navigation.link.selected];
        navigation.scrollPositionCalc();
        return navigation.sliderMover();
      }
    },
    pagePositionsLoad: function() {
      navigation.page.position = [];
      return navigation.link.elem.map(function(pos, elem) {
        if (pos) {
          return navigation.page.position.push($(elem.hash + "-page").offset().top - navigation.height);
        } else {
          return navigation.page.position.push(0);
        }
      });
    },
    pageScroll: function(index) {
      if (index == null) {
        index = navigation.link.selected;
      }
      navigation.scroll.byScrolling = false;
      return $(window).scrollTop(navigation.page.position[index]);
    },
    navigationCentralize: function() {
      navigation.width = navigation.panel.width();
      navigation.link.margin = Math.floor((navigation.width - navigation.link.width) / (navigation.link.length * 2));
      return navigation.link.elem.css("padding", "0 " + navigation.link.margin + "px");
    },
    navigationFixing: function() {
      if ($(window).scrollTop() >= navigation.position) {
        if (!navigation.elem.hasClass("navbar-fixed-top")) {
          navigation.elem.addClass("navbar-fixed-top");
          navigation.scroll.bottom.elem.css("height", navigation.scroll.bottom.height);
          return navigation.scroll.content.elem.css("padding-top", navigation.height);
        }
      } else {
        if (navigation.elem.hasClass("navbar-fixed-top")) {
          navigation.elem.removeClass("navbar-fixed-top");
          navigation.scroll.bottom.elem.css("height", 0);
          return navigation.scroll.content.elem.css("padding-top", 0);
        }
      }
    },
    navigationInit: function() {
      navigation.sliderPositionsLoad();
      navigation.sliderMover();
      navigation.pagePositionsLoad();
      return navigation.scrollPositionCalc();
    }
  };

  navigation.link.length = navigation.link.elem.length;

  navigation.link.elem.map(function(pos, elem) {
    navigation.slider.margin.push(elem.offsetWidth + navigation.slider.outerwidth * 2);
    navigation.link.width += elem.offsetWidth;
    navigation.link.hash.push(elem.hash);
    return navigation.link.position.push((navigation.link.position[pos - 1] || 0) + elem.offsetWidth);
  });

  navigation.link.position.unshift(0);

  navigation.link.position.pop();

  navigation.link.selected = navigation.link.hash.indexOf(window.location.hash) + 1 ? navigation.link.hash.indexOf(window.location.hash) : 0;

  navigation.navigationInit();

  if (navigation.link.selected) {
    navigation.pageScroll(navigation.link.selected);
    navigation.navigationFixing();
  }

  $(window).resize(function() {
    return navigation.navigationInit();
  });

  navigation.link.elem.mouseover(function() {
    return navigation.sliderMover(navigation.link.hash.indexOf(this.hash));
  });

  navigation.link.elem.mouseout(function() {
    return navigation.sliderMover();
  });

  navigation.link.elem.click(function() {
    navigation.link.selected = navigation.link.hash.indexOf(this.hash);
    navigation.pageScroll();
    return navigation.scrollPositionCalc();
  });

  $(window).scroll(function() {
    navigation.navigationFixing();
    if (navigation.scroll.byScrolling) {
      return navigation.scrollPositionCheck($(window).scrollTop());
    } else {
      return navigation.scroll.byScrolling = true;
    }
  });

}).call(this);
*/
