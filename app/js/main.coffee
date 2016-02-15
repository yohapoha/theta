topMenu = {
    panel: $(".menu-panel"),
    slider: $(".slider")
    links: {
        elems: $(".menu-link"),
        width: [],
        allWidth: 0,
        position: []
    },
    elemsMargin: 0
}

topMenu.links.elems.map (el, val) ->
    topMenu.links.width[el] = val.offsetWidth

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

$(window).resize ->
    menuMover()

topMenu.links.elems.mouseover ->
    sliderMover($(this))
    
topMenu.links.elems.mouseout ->
    sliderMover()
