navigation = {
    panel: {
        elem: $(".navigation-panel")
        height: $(".navigation-panel").outerHeight() + $(".slider-panel").outerHeight()
        width: 0
    }
    slider: {
        elem: $(".slider")
        widths: []
        outerwidth: 40
        positions: []
    }
    links: {
        elems: $(".navigation-link")
        length: 0
        widths: []
        fullWidth: 0
        margin: 0
        positions: []
        hashes: []
        selected: 0
    }
    pages: {
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
        scrollTo: (index) ->
            $(window).scrollTop(navigation.pages.positions[index] - navigation.panel.height)
        sliderAutoscroll: {
            startPosition: 0
            endPosition: 0
            calcPositions: ->
                currentPage = if navigation.links.selected <= 0 then 0 else navigation.links.selected
                navigation.scroll.sliderAutoscroll.startPosition = navigation.pages.positions[currentPage] - navigation.panel.height
                nextPage = if navigation.links.selected >= (navigation.links.length - 1) then (navigation.links.length - 1) else (navigation.links.selected + 1)
                navigation.scroll.sliderAutoscroll.endPosition = navigation.pages.positions[nextPage] - navigation.panel.height
                if currentPage == 0 then navigation.scroll.sliderAutoscroll.startPosition = 0
                if currentPage == nextPage then navigation.scroll.sliderAutoscroll.endPosition = Infinity
    }
    }
}
navigation.links.length = navigation.links.elems.length

navigation.scroll.navbarFix()
navigation.links.elems.map (pos, elem) ->
    navigation.slider.widths.push elem.offsetWidth + navigation.slider.outerwidth
    navigation.links.widths.push elem.offsetWidth
    navigation.links.hashes.push elem.hash
    if elem.hash == window.location.hash
        navigation.links.selected = navigation.links.hashes.indexOf(elem.hash)

navigation.links.fullWidth = navigation.links.widths.reduce (sum, current) ->
    navigation.links.positions.push sum
    sum + current;
, 0
sliderMove = (index = navigation.links.selected) ->
    navigation.slider.elem.css 'margin-left', navigation.slider.positions[index]
        .css 'width', navigation.slider.widths[index]

do linksMargin = ->
    navigation.panel.width = navigation.panel.elem.width()
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.length * 2))
    navigation.links.elems.css "padding", "0 #{navigation.links.margin}px"
    navigation.slider.positions = []
    navigation.links.positions.map (val, pos) ->
        navigation.slider.positions.push(navigation.links.margin + val + (navigation.links.margin * pos * 2) - navigation.slider.outerwidth / 2)
    sliderMove()
    navigation.pages.positions = []
    navigation.links.elems.map (pos, elem) ->
        navigation.pages.positions.push $("#{elem.hash}-page").offset().top

$(window).resize ->
    linksMargin()

navigation.links.elems.mouseover ->
    sliderMove(navigation.links.hashes.indexOf(this.hash))

navigation.links.elems.mouseout ->
    sliderMove()

navigation.links.elems.click ->
    navigation.links.selected = navigation.links.hashes.indexOf(this.hash)
    sliderMove(navigation.links.selected)
    navigation.scroll.scrollTo(navigation.links.selected)


console.log navigation.scroll.s

$(window).scroll ->
    navigation.scroll.navbarFix()

    scrollPos = $(window).scrollTop()
    
    if not (navigation.scroll.sliderAutoscroll.startPosition <= scrollPos <= navigation.scroll.sliderAutoscroll.endPosition)
        if scrollPos < navigation.scroll.sliderAutoscroll.startPosition and navigation.links.selected != 0
            --navigation.links.selected
        if scrollPos > navigation.scroll.sliderAutoscroll.endPosition and navigation.links.selected != navigation.links.length-1
            ++navigation.links.selected
        navigation.scroll.sliderAutoscroll.calcPositions()
        sliderMove(navigation.links.selected)
    else
        console.log navigation.links.hashes[navigation.links.selected]
