$(document).ready(function () {
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

    //header-anchor
    $('.menu__list .menu__link').click(function(event){
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


    //TEAM-hide 
    let lastItems = []
    let teamItems = Array.from($('.team-list.team-list__main li'))
        console.log(teamItems);

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

    console.log(lastItems);

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
        grabCursor: true,
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
        grabCursor: true,
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
});