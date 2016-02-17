navigation = {
    panel: {
        elem: $(".navigation-panel")
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
            padding: 40
        }
        content: {
            elem: $(".content")
        }
        bottom: {
            elem: $(".bottom")
            height: 40
        }
        position: 0
        navbarFix: ->
            if $(window).scrollTop() >= navigation.scroll.head.height
                if not navigation.scroll.navbar.elem.hasClass "navbar-fixed-top"
                    navigation.scroll.navbar.elem.addClass "navbar-fixed-top"
                    navigation.scroll.bottom.elem.css "height", navigation.scroll.bottom.height
                    navigation.scroll.content.elem.css "padding-top", navigation.scroll.navbar.padding
            else
                if navigation.scroll.navbar.elem.hasClass "navbar-fixed-top"
                    navigation.scroll.navbar.elem.removeClass "navbar-fixed-top"
                    navigation.scroll.bottom.elem.css "height", 0
                    navigation.scroll.content.elem.css "padding-top", 0
        scrollTo: (index) ->
            $(window).scrollTop(navigation.pages.positions[index] - navigation.scroll.navbar.padding)
    }
}

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
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.elems.length * 2))
    navigation.links.elems.css "padding", "10px #{navigation.links.margin}px 6px"
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


$(window).scroll ->
    navigation.scroll.navbarFix()

    scrollPos = $(window).scrollTop()
    startPos = if navigation.scroll.position <= 0 then 0 else navigation.scroll.position
    scrollStart = navigation.pages.positions[startPos] - navigation.scroll.navbar.padding
    endPos = if navigation.scroll.position >= navigation.links.hashes.length then navigation.links.hashes.length else navigation.scroll.position+1
    scrollEnd = navigation.pages.positions[endPos] - navigation.scroll.navbar.padding
    #console.log navigation.links.hashes[navigation.links.hashes.length-1]
    if not (scrollStart <= scrollPos <= scrollEnd)
        if scrollPos < scrollStart and navigation.scroll.position != 0
            --navigation.scroll.position
        if scrollPos > scrollEnd and navigation.scroll.position != navigation.links.hashes.length-1
            ++navigation.scroll.position
    else
        console.log navigation.links.hashes[navigation.scroll.position]
