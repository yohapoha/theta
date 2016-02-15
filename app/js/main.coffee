topMenu = {
    panel: $(".menu-panel"),
    slider: $(".slider")
    links: {
        elems: $(".menu-link"),
        length: $(".menu-link").length,
        width: [],
        position: []
        allWidth: 0,
    },
    elemsMargin: 0
}

topMenu.links.elems.map (el, val) ->
    topMenu.links.width[el] = val.offsetWidth

topMenu.links.allWidth = topMenu.links.width.reduce (sum, current) ->
    topMenu.links.position.push(sum)
    sum + current;
, 0

sliderMargin = (button = $('.menu-link.select')) ->
    sliderMarginNum = topMenu.elemsMargin + topMenu.links.position[button.index()] + (topMenu.elemsMargin*(button.index()*2) + button.index()*4) - 20
    topMenu.slider.css 'margin-left', sliderMarginNum
        .css 'width', button.width() + 40

menuMargin = ->
    menuWidth = topMenu.panel.width()
    topMenu.elemsMargin = Math.floor((menuWidth-topMenu.links.allWidth)/(topMenu.links.length*2)-2)
    topMenu.links.elems.css "padding", "0 #{topMenu.elemsMargin}px"
    sliderMargin()

menuMargin()

$(window).resize ->
    menuMargin()

topMenu.links.elems.mouseover ->
    sliderMargin $(this)
    return
