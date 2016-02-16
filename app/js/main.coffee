topMenu = {
    panel: {
        elem: $(".menu-panel")
        width: 0
    }
    slider: {
        elem: $(".slider")
        widths: []
        positions: []
    }
    links: {
<<<<<<< HEAD
        elems: $(".menu-link")
        widths: []
        fullWidth: 0
        margin: 0
        positions: []
        hashes: []
        selected: "#main"
    }
=======
        elems: $(".menu-link"),
        width: [],
        allWidth: 0,
        position: []
    },
    elemsMargin: 0
>>>>>>> origin/master
}

topMenu.links.elems.map (pos, elem) ->
    topMenu.slider.widths[pos] = elem.offsetWidth + 40
    topMenu.links.widths[pos] = elem.offsetWidth
    topMenu.links.hashes[pos] = elem.hash
    if elem.hash == window.location.hash
        topMenu.links.selected = elem.hash

<<<<<<< HEAD
topMenu.links.fullWidth = topMenu.links.widths.reduce (sum, current) ->
    topMenu.links.positions.push(sum)
    sum + current;
, 0

sliderMargin = (hash = topMenu.links.selected) ->
    buttonIndex = topMenu.links.hashes.indexOf(hash)
    topMenu.slider.elem.css 'margin-left', topMenu.slider.positions[buttonIndex]
        .css 'width', topMenu.slider.widths[buttonIndex]

do menuMargin = ->
    topMenu.panel.width = topMenu.panel.elem.width()
    topMenu.links.margin = Math.floor((topMenu.panel.width - topMenu.links.fullWidth) / (topMenu.links.elems.length * 2))
    topMenu.slider.positions = []
    topMenu.links.positions.map (val, pos) ->
        topMenu.slider.positions.push(topMenu.links.margin + val + (topMenu.links.margin * pos * 2) - 20)
    topMenu.links.elems.css "padding", "5px #{topMenu.links.margin}px"
    sliderMargin()
=======
topMenu.links.allWidth = topMenu.links.width.reduce (sum, cur) ->
    topMenu.links.position.push(sum)
    sum + cur;
, 0

sliderMover = (button = $('.menu-link.select')) ->
    buttonIndex = button.index()
    sliderMarginNum = topMenu.elemsMargin + topMenu.links.position[buttonIndex] + (topMenu.elemsMargin * (buttonIndex * 2) + buttonIndex * 4) - 20
    topMenu.slider.css 'margin-left', sliderMarginNum
        .css 'width', topMenu.links.width[buttonIndex] + 40

do menuMover = ->
    menuWidth = topMenu.panel.width()
    topMenu.elemsMargin = Math.floor((menuWidth - topMenu.links.allWidth) / (topMenu.links.elems.length * 2) - 2)
    topMenu.links.elems.css "padding", "5px #{topMenu.elemsMargin}px"
    sliderMover()
>>>>>>> origin/master

$(window).resize ->
    menuMover()

topMenu.links.elems.mouseover ->
<<<<<<< HEAD
    sliderMargin(this.hash)

topMenu.links.elems.mouseout ->
    sliderMargin()

topMenu.links.elems.click ->
    topMenu.links.selected = this.hash
    sliderMargin()
=======
    sliderMover($(this))
    
topMenu.links.elems.mouseout ->
    sliderMover()
>>>>>>> origin/master
