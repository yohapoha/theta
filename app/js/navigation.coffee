navigation = {
    elem: $(".navigation")
    panel: $(".navigation-panel")
    width: 0 #Ширина панели навигации
    height: $(".navigation").outerHeight() #Высота навигации
    position: $(".navigation").offset().top #Позиция навигации относительно высоты
    slider: {
        elem: $(".slider")
        margin: [] #Размеры отступов элементов навигации
        outerwidth: 20 #Размер выступа слайдера
        positions: [] #Позиции слайдера относителньно ширины
    }
    link: {
        elem: $(".navigation-link")
        length: 0
        fullWidth: 0 #Ширина всех линков
        margin: 0 #Отступ между линками
        position: [] #Позиции линков относительно ширины
        hash: [] #Хеши линков
        selected: 0 #Выбранный линк
    }
    page: {
        position: [] #Позиции страниц относительно высоты
        scrollStart: 0 #Начало текущей страницы при скроллинге
        scrollEnd: 0 #Конец текущей страницы при скроллинге
    }
    scroll: {
        byScrolling: true #Прокрутка с помощью скролла
        content: {
            elem: $(".content")
        }
        bottom: {
            elem: $(".bottom")
            height: 40 #Высота низа
        }
    }
    sliderMover: (index = navigation.link.selected) ->
        navigation.slider.elem.css 'margin-left', navigation.slider.positions[index]
            .css 'width', navigation.slider.margin[index]
    sliderPositionsLoad: ->
        navigation.slider.positions = []
        navigation.link.position.map (val, pos) ->
            navigation.slider.positions.push(navigation.link.margin + val + (navigation.link.margin * pos * 2) - navigation.slider.outerwidth)
    scrollPositionCalc: ->
        currentPage = if navigation.link.selected <= 0 then 0 else navigation.link.selected
        navigation.page.scrollStart = navigation.page.position[currentPage]
        nextPage = if navigation.link.selected >= (navigation.link.length - 1) then (navigation.link.length - 1) else (navigation.link.selected + 1)
        navigation.page.scrollEnd = navigation.page.position[nextPage]
        if currentPage == 0 then navigation.page.scrollStart = 0
        if currentPage == nextPage then navigation.page.scrollEnd = Infinity
    scrollPositionCheck: (scrollPosition) ->
        if not (navigation.page.scrollStart <= scrollPosition <= navigation.page.scrollEnd)
            if scrollPosition <= navigation.page.scrollStart and navigation.link.selected != 0
                --navigation.link.selected
            if scrollPosition >= navigation.page.scrollEnd and navigation.link.selected != navigation.link.length-1
                ++navigation.link.selected
            window.location.hash = navigation.link.hash[navigation.link.selected]
            navigation.scrollPositionCalc()
            navigation.sliderMover()
    pagePositionsLoad: ->
        navigation.page.position = []
        navigation.link.elem.map (pos, elem) ->
            if pos then navigation.page.position.push($("#{elem.hash}-page").offset().top - navigation.height) else navigation.page.position.push(0)
    pageScroll: (index = navigation.link.selected) ->
        navigation.scroll.byScrolling = false
        $(window).scrollTop(navigation.page.position[index])
    navigationCentralize: ->
        navigation.width = navigation.panel.width()
        navigation.link.margin = Math.floor((navigation.width - navigation.link.fullWidth) / (navigation.link.length * 2))
        navigation.link.elem.css "padding", "0 #{navigation.link.margin}px"
    navigationFixing: ->
        console.log navigation.position
        if $(window).scrollTop() >= navigation.position
            if not navigation.elem.hasClass "navbar-fixed-top"
                navigation.elem.addClass "navbar-fixed-top"
                navigation.scroll.bottom.elem.css "height", navigation.scroll.bottom.height
                navigation.scroll.content.elem.css "padding-top", navigation.height
        else
            if navigation.elem.hasClass "navbar-fixed-top"
                navigation.elem.removeClass "navbar-fixed-top"
                navigation.scroll.bottom.elem.css "height", 0
                navigation.scroll.content.elem.css "padding-top", 0
    navigationInit: ->
        navigation.navigationCentralize()
        navigation.sliderPositionsLoad()
        navigation.sliderMover()
        navigation.pagePositionsLoad()
        navigation.scrollPositionCalc()
}
navigation.link.length = navigation.link.elem.length
navigation.link.elem.map (pos, elem) ->
    navigation.slider.margin.push elem.offsetWidth + navigation.slider.outerwidth * 2
    navigation.link.fullWidth += elem.offsetWidth
    navigation.link.hash.push elem.hash
    navigation.link.position.push (navigation.link.position[pos-1] || 0) + elem.offsetWidth
navigation.link.position.unshift(0)
navigation.link.position.pop()

navigation.link.selected = if navigation.link.hash.indexOf(window.location.hash) + 1 then navigation.link.hash.indexOf(window.location.hash) else 0

navigation.navigationInit()

if navigation.link.selected
    navigation.pageScroll(navigation.link.selected)
    navigation.navigationFixing()

$(window).resize ->
    navigation.navigationInit()

navigation.link.elem.mouseover ->
    navigation.sliderMover(navigation.link.hash.indexOf(this.hash))

navigation.link.elem.mouseout ->
    navigation.sliderMover()

navigation.link.elem.click ->
    navigation.link.selected = navigation.link.hash.indexOf(this.hash)
    navigation.pageScroll()
    navigation.scrollPositionCalc()

$(window).scroll ->
    navigation.navigationFixing()
    if navigation.scroll.byScrolling then navigation.scrollPositionCheck($(window).scrollTop())
    else navigation.scroll.byScrolling = true
