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
    const isGavnoPhone = {
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        any: function(){
            return(
                isGavnoPhone.iOS()
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

    //h1 appear
    const showTitle = () => {
        const span = document.querySelector(`.text-animation`);
         if (span) span.classList.add("text-animation--middle");
    };
    showTitle()

    //menu items random effect

    // let options = {
    //     preload: {
    //       selector: `.preload-1`,
    //       itemSelector: `.preload__letter__1`,
    //       text: `ecosystem`,
    //     }
    // }
    let menus = [
        {
            preload: {
                selector: `.preload-1`,
                itemSelector: `.preload__letter__1`,
                text: `ecosystem`,
            }
        },{
            preload: {
                selector: `.preload-2`,
                itemSelector: `.preload__letter__2`,
                text: `get_the_app`,
            }
        },{
            preload: {
                selector: `.preload-3`,
                itemSelector: `.preload__letter__3`,
                text: `roadmap`,
            }
        },{
            preload: {
                selector: `.preload-4`,
                itemSelector: `.preload__letter__4`,
                text: `team`,
            }
        },{
            preload: {
                selector: `.preload-5`,
                itemSelector: `.preload__letter__5`,
                text: `ACTIVITIES`,
            }
        },
        {
            preload: {
                selector: `.preload-f-1`,
                itemSelector: `.preload__letter__f__1`,
                text: `ecosystem`,
            }
        },{
            preload: {
                selector: `.preload-f-2`,
                itemSelector: `.preload__letter__f__2`,
                text: `get_the_app`,
            }
        },{
            preload: {
                selector: `.preload-f-3`,
                itemSelector: `.preload__letter__f__3`,
                text: `roadmap`,
            }
        },{
            preload: {
                selector: `.preload-f-4`,
                itemSelector: `.preload__letter__f__4`,
                text: `team`,
            }
        },{
            preload: {
                selector: `.preload-f-5`,
                itemSelector: `.preload__letter__f__5`,
                text: `ACTIVITIES`,
            }
        },

    ]
    
    menus.forEach((item) => {
        //setTimeout(() => {
            Preload(item)
            $(item.preload.selector).mouseenter(()=> Preload(item))
            
           // $(`.footer-main__list ${item.preload.selector}`).mouseenter(()=> Preload(item))
        //}, 1000);
    })

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
    }

    // setInterval(() => {
    //         let rand = randomNum(0, 4)
    //         Preload(menus[rand])
    //     }, 7000);

        function Preload(options) {
            let preloadLetters = document.querySelectorAll(options.preload.itemSelector);
            let text = options.preload.text.toUpperCase().split('');
            let intervals = [];

              for(let i = 0; i < text.length; i++) {
                letterRandomize(preloadLetters[i], i, intervals, Date.now(), text);
                    //console.log(intervals  );
              }
             // console.log('énd of the word');
            
        }
        function letterRandomize(el, index, intervals, unique, text) {
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            intervals[index+unique] = setInterval(function(){
              el.innerHTML = possible.charAt(Math.floor(Math.random() * possible.length))
            }, 50);
            setTimeout(function(){
              clearInterval(intervals[index+unique]);
              intervals = []  
              el.innerHTML = text[index];
              el.classList.add('preload__letter--loaded');
            }, 250*index);
          }
          
    

    //menuToggle
    $('.menu__open').click(function(e){
        menus.forEach(item => {
            setTimeout(() => {
                Preload(item)
            }, 500);
        })
        $(this).addClass('_active-menu')
        $(".menu__close").addClass('_active-menu')
        $('.menu__box').addClass('_active-menu')
        $('body').addClass('_lock')

    })
    $('.menu__close').click(function(e){
        //console.log(1);
        $(this).removeClass('_active-menu')
        $('.menu__open').removeClass('_active-menu')
        $('.menu__box').removeClass('_active-menu')
        $('body').removeClass('_lock')

    })

    //video pop up
    $('.show-video').click(function(e){
        e.preventDefault()

        $('.pop-up-video').addClass('_avtive-video')
        $('.video__item ')[0].load()
        $('.video__item ')[0].play()
    })
    $('.pop-up-video__close__btn').click(function(e){
        e.preventDefault()

        $('.pop-up-video').removeClass('_avtive-video')
        $('.video__item ')[0].pause()
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
        if($('.menu__open').hasClass('_active-menu')){
            
            $('.menu__open').removeClass('_active-menu')

            $('.menu__box').removeClass('_active-menu')
            $(".menu__close").removeClass('_active-menu')
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
                //console.log(entry.target);
                entry.target.classList.add('_active-diagram')
                document.querySelector('.tokenomics-diagram__end').classList.add('_active-diagram')

                observer.unobserve(entry.target)
            }
        })
    };

    let observer = new IntersectionObserver(callback, {})

    observer.observe(centerDiagram)

    //tokenomiks hover
    $('.tokenomics-statistic__item').mouseenter(  handlerIn ).mouseleave(  handlerOut );
    
    function handlerIn(){
        let attr = $(this).attr('data-hover')
        //console.log(attr);
        $(`.diagram__sector__${attr}`).addClass('_active-path')

    }
    function handlerOut(){
        let attr = $(this).attr('data-hover')
        //console.log(attr);
        $(`.diagram__sector__${attr}`).removeClass('_active-path')

    }

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

        allowTouchMove: true,

        spaceBetween: 80,
        //autoHeight: true,
        loop: false,
        pagination: {
            
            el: '.swiper-pagination.possibility-customize__pagination__container',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="possibility-customize__pagination ${className}"><strong></strong> ${customCategories[index]}</span>`;
            },
        },

        navigation: {
                nextEl: '.possibility-customize__btns__container .swiper-button-next',
                prevEl: '.possibility-customize__btns__container .swiper-button-prev',
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
        slidesPerView: 2,
        centeredSlides: false,
        slidesPerGroup: 2,
        slidesPerGroupSkip: 0,
        spaceBetween: 30,
        autoHeight: true,
        loop: false,

        breakpoints: {
            650:{
                slidesPerView: 3,
                centeredSlides: false,
                slidesPerGroup: 3,
            },
            1040:{
                slidesPerView: 4,
                centeredSlides: false,
                slidesPerGroup: 4,
            },
        },

        pagination: {
            el: '.swiper-pagination.supporters-swiper__pagination__container',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="supporters-swiper__pagination ${className}"><strong></strong></span>`;
            },
        },
    })

    //support-page swiper
    // if(document.documentElement.clientWidth <= 710) {
    //     $('.supporters-page').addClass('swiper')
    //     $('.supporters-page .supporters-page__wrapper').addClass('swiper-wrapper')
    //     $('.supporters-page .supporters-page__wrapper li').addClass('swiper-slide')

    //     let pageSwiper = new Swiper('.supporters-page.swiper',{
    //         slidesPerView: 2,
    //         direction: "vertical",
    //         spaceBetween: -20,
    //         // autoHeight: true,
    //         //freeMode: true,
    //     })
    // }

    //model move----------------------------------------------

    let modelInterval
    let modelContainer
    let imgArr = []
    let iterator = {i: 0}
    let dopCounter = 0
    const main = document.querySelector('.main')
        

    if(document.documentElement.clientWidth <= 742){
        modelContainer = $('.main__model.model__mob')
        imgArr = Array.from($('.main__model.model__mob img'))
    }else{
        modelContainer = $('.main__model.model__desk')
        imgArr = Array.from($('.main__model.model__desk img'))
    }

    function loadMore(active, iterator){
        $(active).attr('src', `./assets/img/model/0_${iterator.i}.png`)
    }

    // if($('body').hasClass('_touch')){
    //     document.querySelectorAll('.main__model img').forEach(item =>{
    //         item.classList.add('touch')
    //     })
    //    }
    // if($('body').hasClass('_pc')){
    //     document.querySelectorAll('.main__model img').forEach(item =>{
    //         item.classList.add('no-touch')
    //     })
        
    // }
    
        //console.log(imgArr);

        function loadTen(imgArr, iterator){
            imgArr.forEach(item => {
                $(item).attr('src', `./assets/img/model/0_${iterator.i}.png`)
                iterator.i++
            })
        }

        //ANIMATION
        


        function animateModel(imgArr, iterator){
            
            let [active] = imgArr.filter(item => item.classList.contains('_model-active'))
            let activeIndex = imgArr.indexOf(active)

            //console.log(activeIndex, active);
            //console.log(iterator.i);

            if(iterator.i === 1){
                if (activeIndex < 49) {
                    imgArr[activeIndex].classList.remove('_model-active')
                    imgArr[activeIndex +1].classList.add('_model-active')


                } else if(activeIndex === 49){
                    //activeIndex = 0
                    clearInterval(modelInterval);
                    return
                }


            }else{

                if (activeIndex < 49 && dopCounter === 0) {
                   
                    imgArr[activeIndex].classList.remove('_model-active')
                    imgArr[activeIndex +1].classList.add('_model-active')

                    // iterator.i++
                    // loadMore(active, iterator)

                } else if(activeIndex === 49){
                    
                    //iterator.i++
                    imgArr[activeIndex].classList.remove('_model-active')
                    imgArr[0].classList.add('_model-active')
                    dopCounter++
                    return
                    //clearInterval(modelInterval);
                    //return

                    // imgArr[activeIndex].classList.remove('_model-active')
                    // activeIndex = 0
                    // imgArr[activeIndex].classList.add('_model-active')

                    // iterator.i++
                    // loadMore(active, iterator)
                } else{
                    console.log('oooops');
                }
            }
        }

        setTimeout(()=>{
            $('.preloader').addClass('loaded')
            $('body').removeClass('_lock')
            // clearInterval(modelInterval);
            console.log(iterator.i);
            setTimeout(() => {
                iterator.i++
            }, 1000);
            
        },3000)
        

        function searchCurrentFrame(imgArr, iterator){
            let [active] = imgArr.filter(item => item.classList.contains('_model-active'))
            let activeIndex = imgArr.indexOf(active)

            let posStart = $(active).attr('src').indexOf('0_')
            let posEnd = $(active).attr('src').indexOf('.png')
            let result = $(active).attr('src').slice(posStart+2, posEnd)
            
            
            imgArr[activeIndex].classList.remove('_model-active')
            //imgArr[0] = active
            imgArr[0].classList.add('_model-active')

            iterator.i = +result
            loadTen(imgArr, iterator)
            iterator.i = +result
        }

        modelInterval = setInterval(() => animateModel(imgArr, iterator), 50);

        // main.addEventListener('touchstart', e => {
        //     clearInterval(modelInterval);
        // })
        // main.addEventListener('touchend', e => {

        //     searchCurrentFrame(imgArr, iterator)
        //     //setTimeout(()=>{
        //         modelInterval = setInterval(() => {
        //             animateModel(imgArr, iterator)
        //         }, 50)
        //     //},2000)
            
            
            
        // })
    if($('body').hasClass('_touch')){
        //CONTROLS-----------------------------------------
        let model

        let prevX = 0
        let currentX = 0
        let prevY = 0
        let currentY = 0
        let currentImg = 0
        let dopCounter = 0

        const modelTopCenter = modelContainer.css('top').substring(0, $(modelContainer).css('top').length - 2)


        // main.addEventListener('touchmove', e => {
        //     let top = modelContainer.css('top').substring(0, $(modelContainer).css('top').length - 2)
        //     // console.log('ORIGIN', modelTopCenter);
        //     // console.log('TOP', top);
        //     let currentY = {...e.changedTouches}[0].clientY

        //     if(currentY < prevY && +top < +modelTopCenter+20){
        //         modelContainer.css('top', +top + 1 + 'px')
        //     }
        //     if(currentY > prevY && +top > +modelTopCenter-20){
        //         deviation = -1
        //         modelContainer.css('top', +top - 1 + 'px')
        //     }

        //     prevY = currentY
        // })
        
        
        // main.addEventListener('touchmove', e => {

        //     let currentX = {...e.changedTouches}[0].clientX
        //     //console.log('x', currentX);

        //     let [active] = imgArr.filter(item => item.classList.contains('_model-active'))
        //     let activeIndex = imgArr.indexOf(active)

        //     //console.log(imgArr, active, activeIndex,  iterator.i, prevX, currentX);

           

        //     if(currentX > prevX){
                
        //         if(iterator.i < 249){
        //         //     imgArr[activeIndex].classList.remove('_model-active')
        //         //     imgArr[activeIndex +1].classList.add('_model-active')

        //             if (activeIndex < 9) {
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 imgArr[activeIndex +1].classList.add('_model-active')
        //                 iterator.i++
        //                 loadMore(active, iterator)
        //             }
        //             else if (activeIndex === 9){
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 activeIndex = 0
        //                 imgArr[activeIndex].classList.add('_model-active')

        //                 iterator.i++
        //                 loadMore(active, iterator)
        //             }
        //         }
                
        //     }
        //     if(currentX < prevX){
        //         if(iterator.i > 0){
        //             if (activeIndex > 0) {
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 imgArr[activeIndex -1].classList.add('_model-active')
        //                 iterator.i--
        //                 loadMore(active, iterator)
        //             }
        //             else if (activeIndex === 0){
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 activeIndex = 9
        //                 imgArr[activeIndex].classList.add('_model-active')

        //                 iterator.i--
        //                 loadMore(active, iterator)
        //             }
        //         }
        //     }

        //     prevX = currentX

        //     dopCounter++
        // })
    }

    if($('body').hasClass('_pc')){
        let prevX = 0
        let currentX = 0
        let prevY = 0
        let currentY = 0
        let currentImg = 0
        let dopCounter = 0

        const modelTopCenter = modelContainer.css('top').substring(0, $(modelContainer).css('top').length - 2)


        // $('.main').mousemove(function(e) {
        //     let top = modelContainer.css('top').substring(0, $(modelContainer).css('top').length - 2)
        //     // console.log('ORIGIN', modelTopCenter);
        //     // console.log('TOP', top);
        //     let currentY = e.offsetY
        //     //console.log(currentY, prevY);

        //     if(currentY < prevY && +top < +modelTopCenter+20){

        //         modelContainer.css('top', +top + 1 + 'px')
        //     }
        //     if(currentY > prevY && +top > +modelTopCenter-20){
        //         //console.log('hui');
        //         deviation = -1
        //         modelContainer.css('top', +top - 1 + 'px')
        //     }

        //     prevY = currentY
        // })

        // $('.main').mousemove(function(e) {

        //     currentX = e.offsetX

        //     //console.log('x', currentX);

        //     let [active] = imgArr.filter(item => item.classList.contains('_model-active'))
        //     let activeIndex = imgArr.indexOf(active)

        //     //console.log(imgArr, active, activeIndex,  iterator.i, prevX, currentX);

            

        //     if(currentX > prevX){
                
        //         if(iterator.i < 249){
        //         //     imgArr[activeIndex].classList.remove('_model-active')
        //         //     imgArr[activeIndex +1].classList.add('_model-active')

        //             if (activeIndex < 9) {
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 imgArr[activeIndex +1].classList.add('_model-active')
        //                 iterator.i++
        //                 loadMore(active, iterator)
        //             }
        //             else if (activeIndex === 9){
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 activeIndex = 0
        //                 imgArr[activeIndex].classList.add('_model-active')

        //                 iterator.i++
        //                 loadMore(active, iterator)
        //             }
        //         }
                
                
        //     }
        //     if(currentX < prevX){
        //         if(iterator.i > 0){
        //             if (activeIndex > 0) {
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 imgArr[activeIndex -1].classList.add('_model-active')
        //                 iterator.i--
        //                 loadMore(active, iterator)
        //             }
        //             else if (activeIndex === 0){
        //                 imgArr[activeIndex].classList.remove('_model-active')
        //                 activeIndex = 9
        //                 imgArr[activeIndex].classList.add('_model-active')

        //                 iterator.i--
        //                 loadMore(active, iterator)
        //             }
        //         }
        //     }
            
        //     prevX = currentX
            
        //     //dopCounter++
        // })
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



    // function roadMechanic(e){
    //     const delta = Math.sign(e.deltaY);
        
    //     if(delta === 1){
    //         moveRightAndCheck(cards[currentIndex], delta, e)
    //     }
    //     if(delta === -1){
    //         moveLeftAndCheck(cards[currentIndex], delta, e)
    //     }     

    //     e.preventDefault();
    //     e.stopPropagation();
        
    // }

    let roadmapSwiper
    // if(isGavnoPhone.any()){
    //     roadmapSwiper = new Swiper('.roadmap__wrapper.swiper',{
    //         effect: "slide",
    //         spaceBetween: 20,
    //         //grabCursor: true,
    //         //cssMode: true,
    //         cardsEffect: {
    //            rotate: false,
    //         },
    //     })
    // }else{
        roadmapSwiper = new Swiper('.roadmap__wrapper.swiper',{
            //effect: "cards",
            //grabCursor: true,
            //cssMode: true,
            // cardsEffect: {
            //    rotate: false,
            // },
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,

            pagination: {
                el: '.swiper-pagination.roadmap__pagination__container',
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="roadmap__pagination ${className}"></span>`;
                },
            },

            breakpoints: {
                850:{
                    slidesPerView: 3,

                },
                1110:{
                    slidesPerView: 4,

                },
            },
        })
    //}
    

    // if(document.documentElement.clientWidth >= 890){
    //      roadmapSwiper.destroy()
    //     $(".roadmap__wrapper").removeClass('swiper')
    //     $('.roadmap-list').removeClass('swiper-wrapper')
    //     $('.roadmap-list__item').removeClass('swiper-slide')

    //      document.querySelector('.roadmap-list').addEventListener('wheel', roadMechanic, false)
    // }
    

    // function moveRightAndCheck(item, delta, e){
    //     let leftParam = $(item).css('left').substring(0, $(item).css('left').length - 2)
    //         //console.log(leftParam);
    //         if(leftParam < containerWidth- cardWidth*2){
    //             $(item).css('left', leftParam - -delta*300 + "px")
    //         }else{
    //             //$(item).css('left', containerWidth - cardWidth + "px")
    //             $(item).css('left', containerWidth - cardWidth - currentIndex*24 + "px")
    //             if(currentIndex !== 3){
    //                 currentIndex++
    //             }else{
                    
    //                 //document.querySelector('.roadmap-list').removeEventListener('wheel', roadMechanic)

    //                 // $([document.documentElement, document.body]).animate({
    //                 //     scrollTop: $(".roadmap").next().offset().top - $(".header").height()
    //                 // }, 400)

    //                 window.scrollTo({
    //                     top: $(".roadmap").next()[0].offsetTop,
    //                     behavior: 'smooth',
    //                   })

    //                 return
    //             }
                
    //         }
    // }
    // function moveLeftAndCheck(item, delta, e){
    //     let leftParam = $(item).css('left').substring(0, $(item).css('left').length - 2)
    //         //console.log(leftParam);
    //         if(leftParam > cardWidth){
    //             $(item).css('left', leftParam - -delta*300 + "px")
    //         }else{
    //             //$(item).css('left', 0 + "px")
    //             $(item).css('left', 0 + (4 - currentIndex)*24 + "px")

    //             if(currentIndex !== 0){
    //                 currentIndex--
    //             }else{
    //                 //document.querySelector('.roadmap-list').removeEventListener('wheel', roadMechanic)
                    

    //                 // $([document.documentElement, document.body]).animate({
    //                 //     scrollTop: $(".roadmap").prev().offset().top + $(".header").height()
    //                 // }, 400)
    //                 window.scrollTo({
    //                     top: $(".roadmap").prev()[0].offsetTop,
    //                     behavior: 'smooth',
    //                   })

    //                 return
    //             }
                
    //         }
    // }
});