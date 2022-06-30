$(document).ready(function () {

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }

    //animateOn
    wow = new WOW({
        boxClass:     'wow',   
        animateClass: 'animated', 
        offset:       0,         
        mobile:       true,       
        live:         true       
      })
    wow.init();

    

    //menuToggle
    $('.menu__open').click(function(e){
        $(this).addClass('_active-menu')
        $(".menu__close").addClass('_active-menu')
        $('.menu__box').addClass('_active-menu')
        $('body').addClass('_lock')

    })
    $('.menu__close').click(function(e){
        console.log(1);
        $(this).removeClass('_active-menu')
        $('.menu__open').removeClass('_active-menu')
        $('.menu__box').removeClass('_active-menu')
        $('body').removeClass('_lock')

    })

    //header-move
    // const headerInitialPos = $('.header').offset().top

    // $(window).scroll(function(){
    //     const scrolled = $(this).scrollTop()

    //     //if(document.documentElement.clientWidth > 940){
    //         if(headerInitialPos < scrolled){
    //             $('.header').addClass('_header__scroll')
    //         } else{
    //             $('.header').removeClass('_header__scroll')
    //         }
    //     //}
        
    // })

    //header-anchor
    $('.menu__list .menu__link').click(function(event){
        onMenuLinkClick(event);
    })
    $('.footer-main__list .footer__link').click(function(event){
        onMenuLinkClick(event);
    })

    function onMenuLinkClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');
        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top - Math.round($('.header').height())
            }, 500)
        }
        if($('.menu__toggle').hasClass('_active-menu')){
            
            $('.menu__toggle').removeClass('_active-menu')
            $('.menu__box').removeClass('_active-menu')
            $('body').removeClass('_lock')
        }
        event.preventDefault();
    }

    //main overtake
    $('.main-content__overtake__text').marquee({
        duration: 5000,
        startVisible: true,
        duplicated: true
    });
    $('.jump-in__title').marquee({
        duration: 10000,
        startVisible: true,
        duplicated: true
    });
    $('.roadmap__title').marquee({
        duration: 10000,
        startVisible: true,
        duplicated: true
    });


    //tokenomics observer
    let centerDiagram = $('.tokenomics-diagram__begin')[0]

    let callback = function(entries, observer) {
        /* Content excerpted, show below */
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log(entry.target);
                entry.target.classList.add('_active-diagram')
                document.querySelector('.tokenomics-diagram__end').classList.add('_active-diagram')

                observer.unobserve(entry.target)
            }
        })
    };

    let observer = new IntersectionObserver(callback, {})

    observer.observe(centerDiagram)


    //TEAM-hide 
    let lastItems = []
    let teamItems = Array.from($('.team-list.team-list__main li'))
        //console.log(teamItems);

    function chooseLastItems(countOfLast, teamItems, lastItems){
        teamItems.forEach((item, index) => {
            if(index > countOfLast){
                lastItems.push(item)
            }

        })
    }

    if(document.documentElement.clientWidth <= 1020) {
        chooseLastItems(3, teamItems, lastItems)
    }
    if(document.documentElement.clientWidth < 690) {
        chooseLastItems(2, teamItems, lastItems)
    }

    //console.log(lastItems);

    lastItems.forEach((item, index) => {
        $(item).fadeOut(200)
    })

    $(".team-list__btn__show").click(function (e) { 
        e.preventDefault();
        lastItems.forEach((item, index) => {
            $(item).fadeIn(200)
            $(this).fadeOut(200)
        })
    });

    //swipers
    //swiper customize
    let customCategories = ['Admirer', 'Addict', 'Diehard', 'Enthusiast']

    let customSwiper = new Swiper('.customize-swiper.swiper', {

        slidesPerView: 1,

        allowTouchMove: false,

        spaceBetween: 80,
        autoHeight: true,
        loop: false,
        pagination: {
            
            el: '.swiper-pagination.possibility-customize__pagination__container',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="possibility-customize__pagination ${className}"><strong></strong> ${customCategories[index]}</span>`;
            },
        },
        
    })

    //showcase swipers

    let headSwiper = new Swiper('.showcase-head-swiper.swiper',{
        loop: true,
        //autoHeight: true,
        freeMode: true,
        spaceBetween: 30,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
        },
        slidesPerView: "auto",
        speed: 10000,
        //grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
    })
    let bottomSwiper = new Swiper('.showcase-bottom-swiper.swiper',{
        loop: true,
        
        //autoHeight: true,
        freeMode: true,
        spaceBetween: 30,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        slidesPerView: "auto",
        speed: 10000,
        //grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
    })

    //supporters swipers

    let supportsSwiper = new Swiper('.supporters-swiper.swiper',{
        slidesPerView: 1,
        spaceBetween: 40,
        autoHeight: true,
        loop: false,

        pagination: {
            el: '.swiper-pagination.supporters-swiper__pagination__container',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="supporters-swiper__pagination ${className}"><strong></strong></span>`;
            },
        },
    })

    //support-page swiper
    if(document.documentElement.clientWidth <= 710) {
        $('.supporters-page').addClass('swiper')
        $('.supporters-page .supporters-page__wrapper').addClass('swiper-wrapper')
        $('.supporters-page .supporters-page__wrapper li').addClass('swiper-slide')

        let pageSwiper = new Swiper('.supporters-page.swiper',{
            slidesPerView: 2,
            direction: "vertical",
            spaceBetween: -20,
            // autoHeight: true,
            //freeMode: true,
        })
    }

    //model move----------------------------------------------


    if($('body').hasClass('_pc')){
        let prevX = 0
        let currentX = 0
        let currentImg = 0
        let dopCounter = 0

        let modelContainer = $('.main__model.model__desk')
        const modelLeftCenter = modelContainer.css('left').substring(0, $(modelContainer).css('left').length - 2)

        $('.main').mousemove(function(e) {
            let left = modelContainer.css('left').substring(0, $(modelContainer).css('left').length - 2)
            // console.log('ORIGIN', modelLeftCenter);
            // console.log('LEFT', left);

            //setInterval(()=> {
                if(dopCounter === 3){
                    $('.main__model.model__desk img')[0].src =  `./assets/img/model/0_${currentImg}.png`

                dopCounter = 0
                }
            //}, 10)
            
            // console.log('prev', prevX);
            // console.log('current', currentX);
            currentX = e.offsetX

            if(currentX < prevX){
                if(currentImg < 249){
                    currentImg++
                }
                
                
            }else{
                if(currentImg > 0){
                    currentImg--
                }
                
            }

            prevX = currentX
            
            

            dopCounter++
        })
    }else{
        
        const main = document.querySelector('.main')
        let model

        if(document.documentElement.clientWidth <= 742){
            model = $('.main__model.model__mob img')
        }else{
            model = $('.main__model.model__desk img')
        }

        let prevX = 0
        let currentX = 0
        let currentImg = 0
        let dopCounter = 0
        
        main.addEventListener('touchmove', e => {

            if(dopCounter === 3){
                $(model)[0].src =  `./assets/img/model/0_${currentImg}.png`

                dopCounter = 0
            }

            let currentX = {...e.changedTouches}[0].clientX
            //console.log('x', currentX);

            if(currentX < prevX){
                if(currentImg < 249){
                    currentImg++
                }
                
            }else{
                if(currentImg > 0){
                    currentImg--
                }
            }

            prevX = currentX

            dopCounter++
        })
    }

    //parallax moves section---------------------------------------------------

    const section = $('.main')[0]
    const halfHeight = $(section).innerHeight()/2

    //addParallaxScroll(section, halfHeight)

    function addParallaxScroll(section, halfHeight){
        //const halfHeight = $(section).innerHeight()/2

        let prevY = 0
        let currentY

        if($('body').hasClass('_pc')){
            section.addEventListener('wheel', e => {
                const currentY =  -Math.sign(e.deltaY); //e.deltaY;
                console.log(currentY);


                prevY = 0
                setRegionMovement(e, currentY, section, halfHeight)
            })
        }
        else{
            section.addEventListener('touchmove', e => {
                if (e.cancelable) {
                   e.preventDefault();
                   //e.stopPropagation();
                 }
                currentY = {...e.changedTouches}[0].clientY

                prevY = setRegionMovement(e, currentY, section, halfHeight, prevY)
            })
            // $(section).next()[0].addEventListener('touchmove', e => {
            //     if (e.cancelable) {
            //         //e.preventDefault();
            //         e.stopPropagation();
            //       }
            //     currentY = {...e.changedTouches}[0].clientY
            //     prevY = setRegionMovement(e, currentY, section, halfHeight, prevY)
            // })
        }
    }

    function setRegionMovement(e, currentY, section, halfHeight, prevY = 0){
        let margin = $(section).css('margin-bottom').substring(0, $(section).css('margin-bottom').length - 2)
        let bottomY = $(section).css('padding-bottom').substring(0, $(section).css('padding-bottom').length - 2)

        // console.log(currentY);
        // console.log(halfHeight);

        if(-margin < (halfHeight + 50)){
           // console.log('compare', -margin, halfHeight + 50);
            if(currentY < prevY){ //to up
                //console.log('check', margin);
                moveWithMargin(section, '-', margin)
                e.preventDefault();
            }
        }

        if(margin < -bottomY){
            if(currentY > prevY){ //to down
                // console.log('nope', margin);
                 moveWithMargin(section, '+', margin)
                 e.preventDefault();
             }
        }
        e.stopPropagation();
        return currentY
    }

    function moveWithMargin(section, operator, margin){
        if(operator === '+'){
            $(section).css('margin-bottom', +margin + 150)
        }
        if(operator === '-'){
            $(section).css('margin-bottom', margin - 150)
        }
    }

    //ROAD FUCKING MAP-----------------------------------------

    //let [card1, card2, card3, card4, card5] = Array.from($('.roadmap-list__item'))
    let cards = Array.from($('.roadmap-list__item'))

    let containerWidth = $('.roadmap-list').width()
    let cardWidth = $('.roadmap-list__item').outerWidth()

    let currentIndex = 0

    // console.log('container', containerWidth);
    // console.log('card', cardWidth);



    function roadMechanic(e){
        const delta = Math.sign(e.deltaY);
        
        if(delta === 1){
            moveRightAndCheck(cards[currentIndex], delta, e)
        }
        if(delta === -1){
            moveLeftAndCheck(cards[currentIndex], delta, e)
        }     

        e.preventDefault();
        e.stopPropagation();
        
    }

    let roadmapSwiper = new Swiper('.roadmap__wrapper.swiper',{
        effect: "cards",
        //grabCursor: true,
        //cssMode: true,
        cardsEffect: {
           rotate: false,
        },
    })

    if(document.documentElement.clientWidth >= 890){
         roadmapSwiper.destroy()
        $(".roadmap__wrapper").removeClass('swiper')
        $('.roadmap-list').removeClass('swiper-wrapper')
        $('.roadmap-list__item').removeClass('swiper-slide')

         document.querySelector('.roadmap-list').addEventListener('wheel', roadMechanic, false)
    }
    

    function moveRightAndCheck(item, delta, e){
        let leftParam = $(item).css('left').substring(0, $(item).css('left').length - 2)
            console.log(leftParam);
            if(leftParam < containerWidth- cardWidth*2){
                $(item).css('left', leftParam - -delta*300 + "px")
            }else{
                //$(item).css('left', containerWidth - cardWidth + "px")
                $(item).css('left', containerWidth - cardWidth - currentIndex*24 + "px")
                if(currentIndex !== 3){
                    currentIndex++
                }else{
                    
                    //document.querySelector('.roadmap-list').removeEventListener('wheel', roadMechanic)

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".roadmap").next().offset().top - $(".header").height()
                    }, 100)

                    return
                }
                
            }
    }
    function moveLeftAndCheck(item, delta, e){
        let leftParam = $(item).css('left').substring(0, $(item).css('left').length - 2)
            console.log(leftParam);
            if(leftParam > cardWidth){
                $(item).css('left', leftParam - -delta*300 + "px")
            }else{
                //$(item).css('left', 0 + "px")
                $(item).css('left', 0 + (4 - currentIndex)*24 + "px")

                if(currentIndex !== 0){
                    currentIndex--
                }else{
                    //document.querySelector('.roadmap-list').removeEventListener('wheel', roadMechanic)
                    

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(".roadmap").prev().offset().top + $(".header").height()
                    }, 100)

                    return
                }
                
            }
    }
});