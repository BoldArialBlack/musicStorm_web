$(document).ready(function () {
    /***************** Navbar-Collapse ******************/


    if ($(".navbar").length) {
        $(window).scroll(function () {
            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }
        });
    }


    /***************** Navbar-hide ******************/

    $(function () {
        var winHeight = $(document).scrollTop();

        $(window).scroll(function () {
            var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少

            if (scrollY < $("#main-header").height()) { //如果滚动距离大于550px则隐藏，否则删除隐藏类
                $('.navbar-form').addClass('hidden fadeInUp');
            }
            else {
                $('.navbar-form').removeClass('hidden fadeInUp');
            }

            if (scrollY > winHeight) { //如果没滚动到顶部，删除显示类，否则添加显示类
                $('.navbar-form').removeClass('show fadeInUp');
            }
            else {
                $('.navbar-form').addClass('show fadeInUp');
            }

        });
    });

    /***************** Page Scroll ******************/

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************** Scroll Spy ******************/

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })


    //main-header

    /***************** Owl Carousel ******************/

    $("#owl-hero").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "fadeUp",
        autoPlay: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    /***************** Full Width Slide ******************/

    var slideHeight = $(window).height();

    $('#owl-hero .item').css('height', slideHeight);

    $('.welcome-jumbotron #owl-hero-top').css('height', slideHeight);

    $(window).resize(function () {
        $('#owl-hero .item').css('height', slideHeight);
        $('.welcome-jumbotron #owl-hero-top'.item).css('height', slideHeight);
    });


    /***************** Owl Carousel Testimonials ******************/

    $("#owl-testi").owlCarousel({

        navigation: false, // Show next and prev buttons
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "backSlide",
        autoPlay: true

    });
    /***************** Countdown ******************/

    $('#fun-facts').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    /***************** Google Map ******************/


    /***************** Wow.js ******************/

    new WOW().init();

    /***************** Preloader ******************/

    var preloader = $('.preloader');
    $(window).load(function () {
        preloader.remove();
    });


})


