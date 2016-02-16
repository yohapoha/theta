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
        selected: "#main"
    }
    scroll: {
        head: {
            height: $(".head").outerHeight()
        }
        nav: {
            elem: $(".navigation")
        }
        bottom: {
            elem: $(".bottom")
            height: 40
        }
    }
}

navigation.links.elems.map (pos, elem) ->
    navigation.slider.widths[pos] = elem.offsetWidth + navigation.slider.outerwidth
    navigation.links.widths[pos] = elem.offsetWidth
    navigation.links.hashes[pos] = elem.hash
    if elem.hash == window.location.hash
        navigation.links.selected = elem.hash

navigation.links.fullWidth = navigation.links.widths.reduce (sum, current) ->
    navigation.links.positions.push(sum)
    sum + current;
, 0

sliderMove = (hash = navigation.links.selected) ->
    buttonIndex = navigation.links.hashes.indexOf(hash)
    navigation.slider.elem.css 'margin-left', navigation.slider.positions[buttonIndex]
        .css 'width', navigation.slider.widths[buttonIndex]

do linksMargin = ->
    navigation.panel.width = navigation.panel.elem.width()
    navigation.links.margin = Math.floor((navigation.panel.width - navigation.links.fullWidth) / (navigation.links.elems.length * 2))
    navigation.slider.positions = []
    navigation.links.positions.map (val, pos) ->
        navigation.slider.positions.push(navigation.links.margin + val + (navigation.links.margin * pos * 2) - navigation.slider.outerwidth / 2)
    navigation.links.elems.css "padding", "10px #{navigation.links.margin}px 6px"
    sliderMove()

do scrolling =  ->
    if $(window).scrollTop() >= navigation.scroll.head.height
        if not navigation.scroll.nav.elem.hasClass "navbar-fixed-top"
            navigation.scroll.nav.elem.addClass "navbar-fixed-top"
            navigation.scroll.bottom.elem.css "height", navigation.scroll.bottom.height
    else
        if navigation.scroll.nav.elem.hasClass "navbar-fixed-top"
            navigation.scroll.nav.elem.removeClass "navbar-fixed-top"
            navigation.scroll.bottom.elem.css "height", 0

$(window).resize ->
    linksMargin()

navigation.links.elems.mouseover ->
    sliderMove(this.hash)

navigation.links.elems.mouseout ->
    sliderMove()

navigation.links.elems.click ->
    navigation.links.selected = this.hash
    sliderMove()

$(window).scroll ->
    scrolling()
