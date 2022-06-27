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
});