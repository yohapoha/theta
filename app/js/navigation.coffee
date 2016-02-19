navigation = {
    panel: {
        elem: $(".navigation-panel")
        height: $(".navigation-panel").outerHeight() + $(".slider-panel").outerHeight()
        width: 0
    }
    slider: {
        elem: $(".slider")
        width: []
        outerwidth: 40
        positions: []
        mover: (index = navigation.link.selected) ->
            navigation.slider.elem.css 'margin-left', navigation.slider.positions[index]
                .css 'width', navigation.slider.width[index]
    }
    link: {
        elems: $(".navigation-link")
        length: 0
        width: []
        fullWidth: 0
        margin: 0
        positions: []
        hashes: []
        selected: 0
    }
    page: {
        positions: []
    }
    scroll: {
        head: {
            height: $(".head").outerHeight()
        }
        navbar: {
            elem: $(".navigation")
        }
        content: {
            elem: $(".content")
        }
        bottom: {
            elem: $(".bottom")
            height: 40
        }
        navbarFix: ->
            if $(window).scrollTop() >= navigation.scroll.head.height
                if not navigation.scroll.navbar.elem.hasClass "navbar-fixed-top"
                    navigation.scroll.navbar.elem.addClass "navbar-fixed-top"
                    navigation.scroll.bottom.elem.css "height", navigation.scroll.bottom.height
                    navigation.scroll.content.elem.css "padding-top", navigation.panel.height
            else
                if navigation.scroll.navbar.elem.hasClass "navbar-fixed-top"
                    navigation.scroll.navbar.elem.removeClass "navbar-fixed-top"
                    navigation.scroll.bottom.elem.css "height", 0
                    navigation.scroll.content.elem.css "padding-top", 0
        scrollTo: (index = navigation.link.selected) ->
            $(window).scrollTop(navigation.page.positions[index])
        sliderAutoscroll: {
            startPosition: 0
            endPosition: 0
            byScrolling: true
            calcSliderPositions: ->
                currentPage = if navigation.link.selected <= 0 then 0 else navigation.link.selected
                navigation.scroll.sliderAutoscroll.startPosition = navigation.page.positions[currentPage]
                nextPage = if navigation.link.selected >= (navigation.link.length - 1) then (navigation.link.length - 1) else (navigation.link.selected + 1)
                navigation.scroll.sliderAutoscroll.endPosition = navigation.page.positions[nextPage]
                if currentPage == 0 then navigation.scroll.sliderAutoscroll.startPosition = 0
                if currentPage == nextPage then navigation.scroll.sliderAutoscroll.endPosition = Infinity
            checkSliderPosition: (scrollPosition) ->
                if not (navigation.scroll.sliderAutoscroll.startPosition <= scrollPosition <= navigation.scroll.sliderAutoscroll.endPosition)
                    if scrollPosition <= navigation.scroll.sliderAutoscroll.startPosition and navigation.link.selected != 0
                        --navigation.link.selected
                    if scrollPosition >= navigation.scroll.sliderAutoscroll.endPosition and navigation.link.selected != navigation.link.length-1
                        ++navigation.link.selected
                    window.location.hash = navigation.link.hashes[navigation.link.selected]
                    navigation.scroll.sliderAutoscroll.calcSliderPositions()
                    navigation.slider.mover()

        }
    }
    navigationInit: ->
        navigation.panel.width = navigation.panel.elem.width()
        navigation.link.margin = Math.floor((navigation.panel.width - navigation.link.fullWidth) / (navigation.link.length * 2))
        navigation.link.elems.css "padding", "0 #{navigation.link.margin}px"
        navigation.slider.positions = []
        navigation.link.positions.map (val, pos) ->
            navigation.slider.positions.push(navigation.link.margin + val + (navigation.link.margin * pos * 2) - navigation.slider.outerwidth / 2)
        navigation.slider.mover()
        navigation.page.positions = []
        navigation.link.elems.map (pos, elem) ->
            if pos then navigation.page.positions.push($("#{elem.hash}-page").offset().top - navigation.panel.height)
            else navigation.page.positions.push(0)
        navigation.scroll.sliderAutoscroll.calcSliderPositions()
}
navigation.link.length = navigation.link.elems.length
navigation.link.elems.map (pos, elem) ->
    navigation.slider.width.push elem.offsetWidth + navigation.slider.outerwidth
    navigation.link.width.push elem.offsetWidth
    navigation.link.hashes.push elem.hash

navigation.link.fullWidth = navigation.link.width.reduce (sum, current) ->
    navigation.link.positions.push sum
    sum + current;
, 0
navigation.link.selected = navigation.link.hashes.indexOf(window.location.hash)
navigation.navigationInit()

if navigation.link.selected
    navigation.scroll.sliderAutoscroll.byScrolling = false
    navigation.scroll.scrollTo(navigation.link.selected)
    navigation.scroll.navbarFix()

$(window).resize ->
    navigation.navigationInit()

navigation.link.elems.mouseover ->
    navigation.slider.mover(navigation.link.hashes.indexOf(this.hash))

navigation.link.elems.mouseout ->
    navigation.slider.mover()

navigation.link.elems.click ->
    navigation.link.selected = navigation.link.hashes.indexOf(this.hash)
    navigation.scroll.sliderAutoscroll.byScrolling = false
    navigation.scroll.scrollTo()
    navigation.scroll.sliderAutoscroll.calcSliderPositions()

$(window).scroll ->
    navigation.scroll.navbarFix()
    if navigation.scroll.sliderAutoscroll.byScrolling
        navigation.scroll.sliderAutoscroll.checkSliderPosition($(window).scrollTop())
    navigation.scroll.sliderAutoscroll.byScrolling = true
