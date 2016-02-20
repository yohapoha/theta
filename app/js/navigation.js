(function() {
  var navigation;

  navigation = {
    panel: {
      elem: $(".navigation-panel"),
      width: 0
    },
    slider: {
      elem: $(".slider"),
      margin: [],
      outerwidth: 20,
      positions: [],
      mover: function(index) {
        if (index == null) {
          index = navigation.link.selected;
        }
        return navigation.slider.elem.css('margin-left', navigation.slider.positions[index]).css('width', navigation.slider.margin[index]);
      }
    },
    link: {
      elem: $(".navigation-link"),
      length: 0,
      fullWidth: 0,
      margin: 0,
      position: [],
      hash: [],
      selected: 0
    },
    page: {
      position: []
    },
    scroll: {
      navbar: {
        elem: $(".navigation"),
        height: $(".navigation").outerHeight(),
        position: $(".navigation").offset().top
      },
      content: {
        elem: $(".content")
      },
      bottom: {
        elem: $(".bottom"),
        height: 40
      },
      navbarFix: function() {
        if ($(window).scrollTop() >= navigation.scroll.navbar.position) {
          if (!navigation.scroll.navbar.elem.hasClass("navbar-fixed-top")) {
            navigation.scroll.navbar.elem.addClass("navbar-fixed-top");
            navigation.scroll.bottom.elem.css("height", navigation.scroll.bottom.height);
            return navigation.scroll.content.elem.css("padding-top", navigation.scroll.navbar.height);
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
        if (index == null) {
          index = navigation.link.selected;
        }
        return $(window).scrollTop(navigation.page.position[index]);
      },
      sliderAutoscroll: {
        startPosition: 0,
        endPosition: 0,
        byScrolling: true,
        calcSliderPositions: function() {
          var currentPage, nextPage;
          currentPage = navigation.link.selected <= 0 ? 0 : navigation.link.selected;
          navigation.scroll.sliderAutoscroll.startPosition = navigation.page.position[currentPage];
          nextPage = navigation.link.selected >= (navigation.link.length - 1) ? navigation.link.length - 1 : navigation.link.selected + 1;
          navigation.scroll.sliderAutoscroll.endPosition = navigation.page.position[nextPage];
          if (currentPage === 0) {
            navigation.scroll.sliderAutoscroll.startPosition = 0;
          }
          if (currentPage === nextPage) {
            return navigation.scroll.sliderAutoscroll.endPosition = Infinity;
          }
        },
        checkSliderPosition: function(scrollPosition) {
          if (!((navigation.scroll.sliderAutoscroll.startPosition <= scrollPosition && scrollPosition <= navigation.scroll.sliderAutoscroll.endPosition))) {
            if (scrollPosition <= navigation.scroll.sliderAutoscroll.startPosition && navigation.link.selected !== 0) {
              --navigation.link.selected;
            }
            if (scrollPosition >= navigation.scroll.sliderAutoscroll.endPosition && navigation.link.selected !== navigation.link.length - 1) {
              ++navigation.link.selected;
            }
            window.location.hash = navigation.link.hash[navigation.link.selected];
            navigation.scroll.sliderAutoscroll.calcSliderPositions();
            return navigation.slider.mover();
          }
        }
      }
    },
    navigationInit: function() {
      navigation.panel.width = navigation.panel.elem.width();
      navigation.link.margin = Math.floor((navigation.panel.width - navigation.link.fullWidth) / (navigation.link.length * 2));
      navigation.link.elem.css("padding", "0 " + navigation.link.margin + "px");
      navigation.slider.positions = [];
      navigation.link.position.map(function(val, pos) {
        return navigation.slider.positions.push(navigation.link.margin + val + (navigation.link.margin * pos * 2) - navigation.slider.outerwidth);
      });
      navigation.slider.mover();
      navigation.page.position = [];
      navigation.link.elem.map(function(pos, elem) {
        if (pos) {
          return navigation.page.position.push($(elem.hash + "-page").offset().top - navigation.scroll.navbar.height);
        } else {
          return navigation.page.position.push(0);
        }
      });
      return navigation.scroll.sliderAutoscroll.calcSliderPositions();
    }
  };

  navigation.link.length = navigation.link.elem.length;

  navigation.link.elem.map(function(pos, elem) {
    navigation.slider.margin.push(elem.offsetWidth + navigation.slider.outerwidth * 2);
    navigation.link.fullWidth += elem.offsetWidth;
    navigation.link.hash.push(elem.hash);
    return navigation.link.position.push((navigation.link.position[pos - 1] || 0) + elem.offsetWidth);
  });

  navigation.link.position.unshift(0);

  navigation.link.position.pop();

  navigation.link.selected = navigation.link.hash.indexOf(window.location.hash) + 1 ? navigation.link.hash.indexOf(window.location.hash) : 0;

  navigation.navigationInit();

  if (navigation.link.selected) {
    navigation.scroll.sliderAutoscroll.byScrolling = false;
    navigation.scroll.scrollTo(navigation.link.selected);
    navigation.scroll.navbarFix();
  }

  $(window).resize(function() {
    return navigation.navigationInit();
  });

  navigation.link.elem.mouseover(function() {
    return navigation.slider.mover(navigation.link.hash.indexOf(this.hash));
  });

  navigation.link.elem.mouseout(function() {
    return navigation.slider.mover();
  });

  navigation.link.elem.click(function() {
    navigation.link.selected = navigation.link.hash.indexOf(this.hash);
    navigation.scroll.sliderAutoscroll.byScrolling = false;
    navigation.scroll.scrollTo();
    return navigation.scroll.sliderAutoscroll.calcSliderPositions();
  });

  $(window).scroll(function() {
    navigation.scroll.navbarFix();
    if (navigation.scroll.sliderAutoscroll.byScrolling) {
      navigation.scroll.sliderAutoscroll.checkSliderPosition($(window).scrollTop());
    }
    return navigation.scroll.sliderAutoscroll.byScrolling = true;
  });

}).call(this);
