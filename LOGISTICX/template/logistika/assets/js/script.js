(function ($) {

    "use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".mobail-menu .open-btn");
        var xbutton = $(".mobail-menu .navbar-toggler");

        openBtn.on("click", function (e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            xbutton.toggleClass("x-close");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function (e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.toggleClass("rotate");
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();

    $("body").on("click", function () {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.open-btn').removeClass('x-close');
    });


    // toggle1
    $('#toggle1').on("click", function () {
        $('.create-account').slideToggle();
        $('.caupon-wrap.s1').toggleClass('active-border')
    })

    // toggle2
    $('#toggle2').on("click", function () {
        $('#open2').slideToggle();
        $('.caupon-wrap.s2').toggleClass('coupon-2')
    })

    // toggle3
    $('#toggle3').on("click", function () {
        $('#open3').slideToggle();
        $('.caupon-wrap.s2').toggleClass('coupon-2')
    })
    // toggle4
    $('#toggle4').on("click", function () {
        $('#open4').slideToggle();
        $('.caupon-wrap.s3').toggleClass('coupon-2')
    })

    $('.payment-select .addToggle').on('click', function () {
        $('.payment-name').addClass('active')
        $('.payment-option').removeClass('active')
    })


    $('.payment-select .removeToggle').on('click', function () {
        $('.payment-option').addClass('active')
        $('.payment-name').removeClass('active')
    });


    // tooltips

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /*------------------------------------------
       = TEAM SECTION
   -------------------------------------------*/
    var singleMember = $('.social');
    singleMember.on('click', function () {
        $(this).toggleClass('active');
    });


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 5);
                var positionValue = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each(function (index) {
        menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },

            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },

            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider-s2 .slide").length) {
            $(".hero-slider-s2 .slide").each(function () {
                var $this = $(this);
                var img = ($this.find(".slider-bg").attr("src")) ? $this.find(".slider-bg").attr("src") : false;

                if (img) {
                    $this.css({
                        backgroundImage: "url(" + img + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                    })
                }
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider-s2").length) {
            $(".hero-slider-s2").slick({
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear',
            });
        }
    }

    //Active heor slider
    heroSlider();




    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function () {

                //active wow
                wow.init();



            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            wrapCSS: "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function () {
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title': this.title,
                helpers: {
                    title: { type: 'inside' },
                    media: {}
                },

                beforeShow: function () {
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
                enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function () {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();


    /* hero-slider */
    if ($(".hero-slider").length) {
        $('.hero-slider').slick({
            autoplay: true,
            speed: 800,
            lazyLoad: 'progressive',
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        }).slickAnimation();
    }

    /*------------------------------------------
      = FUNFACT
  -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.wpo-site-header .navigation').length) {
        cloneNavForSticyMenu($('.wpo-site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.wpo-site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;


    }


    /*------------------------------------------
            = Header search toggle
        -------------------------------------------*/
    if ($(".header-search-form-wrapper").length) {
        var searchToggleBtn = $(".search-toggle-btn");
        var searchToggleBtnIcon = $(".search-toggle-btn i");
        var searchContent = $(".header-search-form");
        var body = $("body");

        searchToggleBtn.on("click", function (e) {
            searchContent.toggleClass("header-search-content-toggle");
            searchToggleBtnIcon.toggleClass("fi flaticon-search fi ti-close");
            e.stopPropagation();
        });

        body.on("click", function () {
            searchContent.removeClass("header-search-content-toggle");
        }).find(searchContent).on("click", function (e) {
            e.stopPropagation();
        });
    }


    /*------------------------------------------
        = Header shopping cart toggle
    -------------------------------------------*/
    if ($(".mini-cart").length) {
        var cartToggleBtn = $(".cart-toggle-btn");
        var cartContent = $(".mini-cart-content");
        var cartCloseBtn = $(".mini-cart-close");
        var body = $("body");

        cartToggleBtn.on("click", function (e) {
            cartContent.toggleClass("mini-cart-content-toggle");
            e.stopPropagation();
        });

        cartCloseBtn.on("click", function (e) {
            cartContent.removeClass("mini-cart-content-toggle");
            e.stopPropagation();
        });

        body.on("click", function () {
            cartContent.removeClass("mini-cart-content-toggle");
        }).find(cartContent).on("click", function (e) {
            e.stopPropagation();
        });
    }




    /*------------------------------------------
        = RECENT CASE SECTION SHOW HIDE
    -------------------------------------------*/
    if ($('.service-thumbs').length) {
        $('.service-thumb').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-case'));
            $('.service-thumb').removeClass('active-thumb');
            $(this).addClass('active-thumb');
            $('.service-content .service-data').hide(0);
            $('.service-data').fadeOut(300).removeClass('active-service-data');
            $(target).fadeIn(300).addClass('active-service-data');
        });
    }


    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".wpo-testimonial-wrap").length) {
        $(".wpo-testimonial-wrap").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 20,
            loop: true,
            fade: true,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            items: 1,
        });
    }

    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".service-slider").length) {
        $(".service-slider").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 30,
            loop: false,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },

                500: {
                    items: 1,
                },

                768: {
                    items: 2
                },
                992: {
                    items: 2
                },

                1200: {
                    items: 3
                },

                1400: {
                    items: 3
                },

            }
        });
    }

    /*------------------------------------------
        = blog-slider 
    -------------------------------------------*/
    if (document.querySelector(".blog-slider")) {
        var swiper = new Swiper(".blog-slider", {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }




    /* accordion js */
    document.addEventListener('DOMContentLoaded', function () {
        const headers = document.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', function () {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');

                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });

                // Toggle the current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    });





    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".wpo-happy-client-slide").length) {
        $(".wpo-happy-client-slide").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 0,
            loop: true,
            autoplayHoverPause: true,
            dots: false,
            nav: false,
            items: 4
        });
    }




    /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
    if ($(".post-slider".length)) {
        $(".post-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="fi ti-arrow-left"></i>', '<i class="fi ti-arrow-right"></i>'],
            dots: false,
            items: 1
        });
    }


    /*------------------------------------------
      = PARTNERS SLIDER
  -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 60,
            loop: true,
            autoplayHoverPause: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },

                768: {
                    items: 3
                },

                992: {
                    items: 4
                },

                1200: {
                    items: 5
                }
            }
        });
    }

    /*------------------------------------------
      = team-slider
  -------------------------------------------*/
    if ($(".team-slider").length) {
        $(".team-slider").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 25,
            loop: true,
            autoplayHoverPause: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },

                768: {
                    items: 2
                },

                992: {
                    items: 3
                },

                1200: {
                    items: 4
                },
                1550: {
                    items: 5
                }
            }
        });
    }

    /*------------------------------------------
      service slider s2
  -------------------------------------------*/
    $('.service-slider-s2').slick({
        dots: true,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1499,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });




    /*------------------------------------------
        = SHOP DETAILS PAGE PRODUCT SLIDER
    -------------------------------------------*/
    if ($(".shop-single-slider").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            prevArrow: '<i class="nav-btn nav-btn-lt ti-arrow-left"></i>',
            nextArrow: '<i class="nav-btn nav-btn-rt ti-arrow-right"></i>',

            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]

        });
    }


    if ($(".testimonial-slider").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
            responsive: [
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            fade: true,
        });
    }
    /* testimonial slider-s3 */



    if ($(".testimonial-slider-s3").length) {
        $('.slider-for-s2').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.slider-nav-s2'
        });
        $('.slider-nav-s2').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider-for-s2',
            focusOnSelect: true,
            fade: true,
            arrows: true,
        });
    }






    /*-----------------------
       cart-plus-minus-button 
     -------------------------*/
    $(".cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });


    /*------------------------------------------
       = BACK TO TOP BTN SETTING
   -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form-main").length) {
        $("#contact-form-main").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                subject: {
                    required: true
                }


            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact subject"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function () {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function () {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }

    /*------------------------------------------
        = CONTACT FORM SUBMISSION2
    -------------------------------------------*/
    if ($("#consultancy-form,#contact-form").length) {
        $("#consultancy-form,#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                subject: {
                    required: true
                }


            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact subject"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function () {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function () {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {

        preloader();

        sortingGallery();

        toggleMobileNavigation();

        smallNavFunctionality();
    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {

        if ($(".wpo-site-header").length) {
            stickyMenu($('.wpo-site-header .navigation'), "sticky-on");
        }

        toggleBackToTopBtn();

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        toggleClassForSmallNav();
        //smallNavFunctionality();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function () {
            smallNavFunctionality();
        }, 200));
    });





})(window.jQuery);








/* languageSelect js */
document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('languageSelect');
    if (!selectElement) {
        return;
    }
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    const customSelect = document.querySelector('.custom-select');
    const customOptions = document.querySelector('.custom-options');
    const customArrow = document.querySelector('.custom-arrow');
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    customSelect.innerHTML = `<img src="${selectedOption.getAttribute('data-icon')}" alt=""> ${selectedOption.text}`;

    Array.from(selectElement.options).forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `<img src="${option.getAttribute('data-icon')}" alt=""> ${option.text}`;
        optionDiv.addEventListener('click', () => {
            customSelect.innerHTML = `<img src="${option.getAttribute('data-icon')}" alt=""> ${option.text}`;
            selectElement.value = option.value;
            customOptions.style.display = 'none';
        });
        customOptions.appendChild(optionDiv);
    });

    customSelectWrapper.addEventListener('click', () => {
        customOptions.style.display = customOptions.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!customSelectWrapper.contains(event.target)) {
            customOptions.style.display = 'none';
        }
    });
});


/* tab js */
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
    var tablinks = document.getElementsByClassName("tablinks");
    if (tablinks.length > 0) {
        tablinks[0].click();
    }
});






/*------------------------------------------
  = TOUCHSPIN FOR PRODUCT SINGLE PAGE
-------------------------------------------*/
function increment() {
    let quantity = document.getElementById("quantity").value;
    document.getElementById("quantity").value = parseInt(quantity) + 1;
}

function decrement() {
    let quantity = document.getElementById("quantity").value;
    if (quantity > 1) {
        document.getElementById("quantity").value = parseInt(quantity) - 1;
    }
}


/* progresbar js */
const block = document.querySelectorAll('.block');
window.addEventListener('load', function () {
    block.forEach(item => {
        let numElement = item.querySelector('.num');
        let num = parseInt(numElement.innerText);
        let count = 0;
        let time = 2000 / num;
        let circle = item.querySelector('.circle');
        setInterval(() => {
            if (count == num) {
                clearInterval();
            } else {
                count += 1;
                numElement.innerText = count;
            }
        }, time)
        circle.style.strokeDashoffset
            = 503 - (503 * (num / 100));

    })
});






//quote-form validations
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('quoteForm');

    if (form) { // Check if the element exists
        form.addEventListener('submit', function (event) {
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var city = document.getElementById('city').value;
            var type = document.getElementById('type').value;
            var incoter = document.getElementById('incoter').value;

            if (name === '') {
                alert('Please enter your name.');
                event.preventDefault();
            } else if (email === '' || !validateEmail(email)) {
                alert('Please enter a valid email.');
                event.preventDefault();
            } else if (phone === '' || !validatePhone(phone)) {
                alert('Please enter a valid phone number.');
                event.preventDefault();
            } else if (city === '') {
                alert('Please select a delivery city.');
                event.preventDefault();
            } else if (type === '') {
                alert('Please select a freight type.');
                event.preventDefault();
            } else if (incoter === '') {
                alert('Please select incoterms.');
                event.preventDefault();
            }
        });
    }

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        var re = /^[0-9]{10,15}$/;
        return re.test(String(phone));
    }
});


/* request-quate js */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shippingForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            let valid = true;
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            const fullName = document.getElementById('fullName');
            if (fullName.value.trim() === '') {
                valid = false;
                fullName.insertAdjacentHTML('afterend', '<div class="error">Full name is required.</div>');
            }
            const email = document.getElementById('email');
            if (email.value.trim() === '' || !validateEmail(email.value)) {
                valid = false;
                email.insertAdjacentHTML('afterend', '<div class="error">Please enter a valid email address.</div>');
            }

            const subject = document.getElementById('subject');
            if (subject.value.trim() === '') {
                valid = false;
                subject.insertAdjacentHTML('afterend', '<div class="error">Subject is required.</div>');
            }
            const freightType = document.getElementById('freightType');
            if (freightType.value === '') {
                valid = false;
                freightType.insertAdjacentHTML('afterend', '<div class="error">Please select a freight type.</div>');
            }

            const cityOfDeparture = document.getElementById('cityOfDeparture');
            if (cityOfDeparture.value.trim() === '') {
                valid = false;
                cityOfDeparture.insertAdjacentHTML('afterend', '<div class="error">City of departure is required.</div>');
            }

            const deliveryCity = document.getElementById('deliveryCity');
            if (deliveryCity.value.trim() === '') {
                valid = false;
                deliveryCity.insertAdjacentHTML('afterend', '<div class="error">Delivery city is required.</div>');
            }

            const weight = document.getElementById('weight');
            if (weight.value.trim() === '' || weight.value <= 0) {
                valid = false;
                weight.insertAdjacentHTML('afterend', '<div class="error">Weight must be greater than 0.</div>');
            }

            const volume = document.getElementById('volume');
            if (volume.value.trim() === '' || volume.value <= 0) {
                valid = false;
                volume.insertAdjacentHTML('afterend', '<div class="error">Volume must be greater than 0.</div>');
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});


/* get-touch js*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const trackingId = document.getElementById('trackingId').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required.';
                isValid = false;
            }



            if (phone === '') {
                document.getElementById('phoneError').textContent = 'Phone number is required.';
                isValid = false;
            }

            if (trackingId === '') {
                document.getElementById('trackingIdError').textContent = 'Tracking ID is required.';
                isValid = false;
            }

            if (message === '') {
                document.getElementById('messageError').textContent = 'Message is required.';
                isValid = false;
            }

            if (isValid) {
                console.log('Form is valid. Submitting...');
            }
        });
    } else {

    }
});

/* contactForm */
document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            // Prevent form submission
            event.preventDefault();

            // Get form elements
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var message = document.getElementById('message').value.trim();

            // Simple validation checks
            if (name === '') {
                alert('Please enter your name.');
                return;
            }
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (message === '') {
                alert('Please enter your message.');
                return;
            }

            // If all checks pass, you can submit the form or handle it as needed
            alert('Form submitted successfully!');
            // You might submit the form using AJAX here
        });
    }

    function validateEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});


/* commentForm js  */
document.addEventListener('DOMContentLoaded', function () {
    var commentForm = document.getElementById('commentForm');

    if (commentForm) {
        commentForm.addEventListener('submit', function (event) {
            // Prevent default form submission
            event.preventDefault();

            // Get form values
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var website = document.getElementById('website').value.trim();
            var comment = document.getElementById('comment').value.trim();
            var checkbox = document.getElementById('Insuranceb').checked;

            // Simple validation checks
            if (name === '') {
                alert('Please enter your name.');
                return;
            }
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (phone === '') {
                alert('Please enter your phone number.');
                return;
            }
            if (website === '') {
                alert('Please enter your website URL.');
                return;
            }
            if (comment === '') {
                alert('Please enter your message.');
                return;
            }

            // If all checks pass, you can submit the form or handle it as needed
            alert('Message sent successfully!');
            // You might submit the form using AJAX here
        });
    }

    function validateEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

