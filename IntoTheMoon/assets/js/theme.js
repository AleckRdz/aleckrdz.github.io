'use strict';

var theme = {

    // THEME FUNTIONS
    init: function () {

        // Background image
        theme.bgImage();

        // Background image (mobile)
        theme.bgImageMobile();

        // Scroll to top
        theme.scrollTop();

        // header stiked
        theme.headerSticked();

        // Background image
        theme.navbarNav();

        // Switch theme mode
        theme.switchMode();

        // Change Avatar
        theme.changeAvatar();

        // Countdown
        theme.countdown();

        // Room Slide
        theme.roomSlide();

        // Plyr Player
        theme.plyrPlayer();

        // Animation 
        theme.scrollCue();

        // Bootstrap dSelect
        theme.dSelect();

        // Select number of guests
        theme.selectGuest();

        // Hotel datepicker
        // theme.hotelDatePicker();

        // Hotel datepicker
        theme.datePicker();

        // Room slide
        theme.swiperSlider();

        // Glightbox
        theme.gLightbox();

        // Bootstrap validation
        theme.bsValidation();

        // Highlight validation
        theme.highlight();

        // Code Snippet
        theme.codeSnippet();

        // preloader
        theme.preloader();

    },

    // BACKGROUND IMAGE
    bgImage: () => {
        // Select all elements with class 'bg-image'
        let bg = document.querySelectorAll(".bg-image");
        for (let i = 0; i < bg.length; i++) {
            let url = bg[i].getAttribute('data-image-src');
            bg[i].style.backgroundImage = "url('" + url + "')";
        }
    },

    // BACKGROUND IMAGE (MOBILE)
    bgImageMobile: () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|MacIntel/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isMobile) {
            const imageWrappers = document.querySelectorAll(".image-wrapper");
            imageWrappers.forEach((element) => {
                element.classList.add("mobile");
            });
        }
    },

    // SCROLL TO TOP 
    scrollTop: () => {
        // Select the scroll-top element
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            const toggleScrollTop = () => scrollTop.classList.toggle('active', window.scrollY > 150);
            const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            window.addEventListener('load', toggleScrollTop);
            document.addEventListener('scroll', toggleScrollTop);
            scrollTop.addEventListener('click', scrollToTop);
        }
    },

    // HEADER STICKED
    headerSticked: () => {
        // Select the header element with id 'header'
        const headerNavbar = document.querySelector('.header-navbar');
        if (headerNavbar) {
            const scrollThreshold = 150;
            window.addEventListener('scroll', () => {
                const isScrolledPastThreshold = window.scrollY > scrollThreshold;
                headerNavbar.classList.toggle('bg-opacity-100', isScrolledPastThreshold);
                headerNavbar.classList.toggle('header-navbar-sticky', isScrolledPastThreshold);
                headerNavbar.classList.toggle('bg-opacity-0', !isScrolledPastThreshold);
            });
        }
    },

    // NAVBAR NAV
    // 1. Add interactivity to Bootstrap Dropdown:
    // - Show the Dropdown-menu when the mouse enters a Dropdown or Dropdown-item.
    // - Hide the Dropdown-menu after a delay when the mouse leaves.
    // 2. Adds interactivity to an navbar in Off-canvas:
    // - Toggle the icons in Dropdown when Off-canvas is shown or hidden. 
    // - Show the Dropdown-menu when clicking on the toggle icon.
    // - Apply the ‘slideIn’ effect for the Dropdown-menu when showing.
    navbarNav: () => {

        // Select the offcanvas navbar element
        const offcanvasNavbars = document.querySelectorAll('.offcanvas.offcanvas-navbar');

        // If offcanvasNavbar elements exist
        offcanvasNavbars.forEach(offcanvasNavbar => {

            // Declare a variable named timeout
            let timeout;
            // Select all dropdown elements within the offcanvas navbar
            const dropdowns = offcanvasNavbar.querySelectorAll('.nav-item.dropdown');
            // Select all toggle icons within the offcanvas navbar
            const toggleIcons = offcanvasNavbar.querySelectorAll('.dropdown-toggle-icon');

            // Iterate over each dropdown element
            dropdowns.forEach(dropdown => {
                // Select the toggle and menu elements within the dropdown
                const toggle = dropdown.querySelector('.dropdown-toggle-hover');
                const menu = dropdown.querySelector('.dropdown-menu');

                // Check if both the toggle and menu elements exist
                if (toggle && menu) {
                    // Add an event listener for when the mouse enters either the toggle or menu element
                    [toggle, menu].forEach(el => el.addEventListener('mouseenter', () => {
                        // Check if the offcanvas navbar is not shown
                        if (!offcanvasNavbar.classList.contains('show')) {
                            // Clear any existing timeout
                            clearTimeout(timeout);

                            // Remove the show class from all shown menus within the offcanvas navbar
                            offcanvasNavbar.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));

                            // Add classes to the menu element
                            menu.classList.add('show');
                            menu.classList.add('animate', 'slideIn');
                        }
                    }));

                    // Add an event listener for when the mouse leaves either the toggle or menu element
                    [toggle, menu].forEach(el => el.addEventListener('mouseleave', () => {
                        // Check if the offcanvas navbar is not shown
                        if (!offcanvasNavbar.classList.contains('show')) {
                            // Set a timeout to remove classes from the menu element after a delay
                            timeout = setTimeout(() => {
                                menu.classList.remove('show');
                                menu.classList.remove('animate', 'slideIn');
                            }, 500);
                        }
                    }));
                }
            });

            // Add an event listener for when the offcanvas navbar is shown
            offcanvasNavbar.addEventListener('show.bs.offcanvas', () => {
                // Replace the class for each toggle icon
                toggleIcons.forEach(toggleIcon => {
                    toggleIcon.classList.replace("hicon-thin-arrow-down", "hicon-plus-thin");
                });
            });

            // Add an event listener for when the offcanvas navbar is hidden
            offcanvasNavbar.addEventListener('hide.bs.offcanvas', () => {
                // Replace the class for each toggle icon
                toggleIcons.forEach(toggleIcon => {
                    toggleIcon.classList.replace("hicon-plus-thin", "hicon-thin-arrow-down");
                    toggleIcon.classList.replace("hicon-minus-thin", "hicon-thin-arrow-down");
                });
            });

            // Add an event listener for when a toggle icon is clicked
            toggleIcons.forEach(toggleIcon => {
                toggleIcon.addEventListener('click', function (event) {
                    // Check if the offcanvas navbar is shown
                    if (offcanvasNavbar.classList.contains('show')) {
                        // Prevent default behavior of the event
                        event.preventDefault();

                        // Get the parent node of the clicked toggle icon
                        const parentNode = this.parentNode;

                        // Toggle the active class on the parent node
                        parentNode.classList.toggle('active');

                        // Get the next sibling of the parent node
                        const nextSibling = parentNode.nextElementSibling;

                        // Toggle the show class on the next sibling
                        nextSibling.classList.toggle('show');

                        // Toggle classes on the clicked toggle icon
                        toggleIcon.classList.toggle('hicon-plus-thin');
                        toggleIcon.classList.toggle('hicon-minus-thin');
                    }
                })
            });
        });

    },

    // SELECT NUMBER OF GUESTS
    selectGuest: () => {
        {
            // Loop each element total number of guests
            document.querySelectorAll('[data-total-guest]').forEach(function (totalGuest) {
                // Select the input elements for adults and children, and elements to display the total number of adults and children
                const adultsInput = totalGuest.querySelector('input[data-input-adults=""]');
                const childrenInput = totalGuest.querySelector('input[data-input-children=""]');
                const totalAdultsSpan = totalGuest.querySelector('span[data-total-adults=""]');
                const totalChildrenSpan = totalGuest.querySelector('span[data-total-children=""]');

                // Select the button elements for incrementing or decrementing the number of adults and children
                const minusAdultsBtn = totalGuest.querySelector('button[data-minus-adults=""]');
                const plusAdultsBtn = totalGuest.querySelector('button[data-plus-adults=""]');
                const minusChildrenBtn = totalGuest.querySelector('button[data-minus-children=""]');
                const plusChildrenBtn = totalGuest.querySelector('button[data-plus-children=""]');

                //If there exist adult and child input elements
                if (adultsInput && childrenInput) {

                    // If the input elements for adults and children are empty, assign default values to them
                    if (adultsInput.value.trim() === '') {
                        adultsInput.value = 1;
                    }
                    if (childrenInput.value.trim() === '') {
                        childrenInput.value = 0;
                    }

                    // Display the total number of adults and children
                    totalAdultsSpan.innerText = `${adultsInput.value} ${(adultsInput.value > 1) ? 'Adultos' : 'Adulto'}`;
                    totalChildrenSpan.innerText = `${childrenInput.value} ${(childrenInput.value != 1) ? 'Niños' : 'Niño'}`;

                    // This is an adult number input event
                    adultsInput.addEventListener('input', () => {
                        const maxAdults = parseInt(adultsInput.dataset.adultsMax);
                        if (adultsInput.value > maxAdults) {
                            adultsInput.value = maxAdults;
                        }
                        if (adultsInput.value < 1) {
                            adultsInput.value = 1;
                        }
                        // Update the total number of adults
                        totalAdultsSpan.innerText = `${adultsInput.value} ${(adultsInput.value > 1) ? 'Adultos' : 'Adulto'}`;
                    });

                    // This is an children number input event
                    childrenInput.addEventListener('input', () => {
                        const maxChildren = parseInt(childrenInput.dataset.childrenMax);
                        if (childrenInput.value > maxChildren) {
                            childrenInput.value = maxChildren;
                        }
                        // Update the total number of children
                        totalChildrenSpan.innerText = `${childrenInput.value} ${(childrenInput.value != 1) ? 'Niños' : 'Niño'}`;
                    });

                    // This is a click event that reduces the number of adults
                    minusAdultsBtn.addEventListener('click', () => {
                        const currentValue = parseInt(adultsInput.value);
                        if (currentValue > 1) {
                            adultsInput.value = currentValue - 1;
                            // Update the total number of adults
                            totalAdultsSpan.innerText = `${adultsInput.value} ${(adultsInput.value > 1) ? 'Adultos' : 'Adulto'}`;
                        }
                    });

                    // This is a click event that increases the number of adults
                    plusAdultsBtn.addEventListener('click', () => {
                        const currentValue = parseInt(adultsInput.value);
                        const maxAdults = parseInt(adultsInput.dataset.adultsMax);
                        if (currentValue < maxAdults) {
                            adultsInput.value = currentValue + 1;
                            // Update the total number of adults
                            totalAdultsSpan.innerText = `${adultsInput.value} ${(adultsInput.value > 1) ? 'Adultos' : 'Adulto'}`;
                        }
                    });

                    // This is a click event that reduces the number of children
                    minusChildrenBtn.addEventListener('click', () => {
                        const currentValue = parseInt(childrenInput.value);
                        if (currentValue > 0) {
                            childrenInput.value = currentValue - 1;
                            // Update the total number of children
                            totalChildrenSpan.innerText = `${childrenInput.value} ${(childrenInput.value != 1) ? 'Niños' : 'Niño'}`;
                        }
                    });

                    // This is a click event that increases the number of children
                    plusChildrenBtn.addEventListener('click', () => {
                        const currentValue = parseInt(childrenInput.value);
                        const maxChildren = parseInt(childrenInput.dataset.childrenMax);
                        if (currentValue < maxChildren) {
                            childrenInput.value = currentValue + 1;
                            // Update the total number of children
                            totalChildrenSpan.innerText = `${childrenInput.value} ${(childrenInput.value != 1) ? 'Niños' : 'Niño'}`;
                        }
                    });

                    // The number of adults and children must be digits from 0-9
                    function validateNumberInput(input) {
                        input.addEventListener('keypress', function (e) {
                            const keyCode = e.keyCode || e.which;
                            const keyValue = String.fromCharCode(keyCode);

                            if (!/^\d*$/.test(keyValue)) {
                                e.preventDefault();
                            }
                        });
                    }
                    validateNumberInput(adultsInput);
                    validateNumberInput(childrenInput);

                }
            });

        }
    },

    // CHANGE AVATAR
    changeAvatar: () => {

        // Get all elements with the data-user-avatar attribute
        const userAvatars = document.querySelectorAll('[data-user-avatar]');

        // Loop through each data-user-avatar element
        userAvatars.forEach((userAvatar) => {
            // Get the child elements inside the data-user-avatar element
            const inputAvatar = userAvatar.querySelector('[data-input-avatar]');
            const updateAvatarBtn = userAvatar.querySelector('[data-update-avatar]');
            const showAvatarImg = userAvatar.querySelector('[data-show-avatar]');

            // Check if the elements are found
            if (inputAvatar && updateAvatarBtn && showAvatarImg) {
                // Add an event listener to inputAvatar when its value changes
                inputAvatar.addEventListener('change', () => {
                    // Check if a file is selected
                    if (inputAvatar.files && inputAvatar.files[0]) {
                        // Get the file extension of the selected file
                        const fileExtension = inputAvatar.files[0].name.split('.').pop().toLowerCase();

                        // Check if the file extension is valid
                        if (['jpg', 'gif', 'png'].includes(fileExtension)) {
                            // Remove the d-none class from the updateAvatarBtn button
                            updateAvatarBtn.classList.remove('d-none');

                            // Change the source of the showAvatarImg element
                            const reader = new FileReader();
                            reader.addEventListener('load', () => {
                                showAvatarImg.src = reader.result;
                                showAvatarImg.srcset = reader.result;
                            });
                            reader.readAsDataURL(inputAvatar.files[0]);
                        } else {
                            // If the file extension is invalid, add the d-none class to the updateAvatarBtn button
                            updateAvatarBtn.classList.add('d-none');
                        }
                    } else {
                        // If no file is selected, add the d-none class to the updateAvatarBtn button
                        updateAvatarBtn.classList.add('d-none');
                    }
                });
            }
        });
    },

    // COUNTDOWN
    // assets/css/vender/countdown.min.css
    // assets/css/vender/countdown.min.js
    countdown: () => {
        const countdownEl = document.querySelector('.countdown');
        if (countdownEl) {
            const countdown_timer = new countdown({
                target: '.countdown',
                dayWord: 'días',
                hourWord: 'horas',
                minWord: 'mins',
                secWord: 'segs'
            });
        }
    },

    // ROOM SLIDE
    roomSlide: () => {
        document.addEventListener('DOMContentLoaded', function () {
            const roomSlide = document.querySelector('.room-slide');
            if (roomSlide) {
                const roomSlideItems = roomSlide.querySelectorAll('.room-slide-item');

                roomSlide.addEventListener('mouseover', function (event) {
                    const hoveredItem = event.target.closest('.room-slide-item');
                    if (!hoveredItem) return;

                    roomSlideItems.forEach(item => item.classList.remove('active'));
                    hoveredItem.classList.add('active');
                });

                const activeItem = roomSlide.querySelector('.room-slide-item.active');
                if (!activeItem) {
                    roomSlideItems[0].classList.add('active');
                }
            }
        });
    },

    // ANIMATION - SCROLLCUE
    // assets/css/vender/scrollcue.min.css
    // assets/css/vender/scrollcue.min.js
    scrollCue: () => {
        scrollCue.init({
            interval: -200,
            duration: 600,
            percentage: 0.8
        });
        scrollCue.update();
    },

    // BOOTSTRAP DSELECT
    // assets/css/vender/dselect.min.css
    // assets/css/vender/dselect.min.js
    // https://github.com/jarstone/dselect
    dSelect: () => {
        for (const el of document.querySelectorAll('.dselect')) {
            dselect(el)
        }
    },

    // HOTEL DATEPICKER
    // assets/css/vender/hotel-datepicker.min.css
    // assets/js/vender/hotel-datepicker.min.js
    // assets/js/vender/fecha.min.js
    // https://github.com/benitolopez/hotel-datepicker
    // https://github.com/taylorhakes/fecha
    hotelDatePicker: () => {
        // For each '.check-date' element
        document.querySelectorAll('.check-date').forEach(inputDate => {
            // Create a new Date object for the current date
            let dateNow = new Date();
            // Store the current date as a string in the checkIn variable
            let checkIn = dateNow.toString();
            // Increment the date by one day
            dateNow.setDate(dateNow.getDate() + 1);
            // Store the incremented date as a string in the checkOut variable
            let checkOut = dateNow.toString();
            // Set the value of the inputDate element to a formatted string containing the check-in and check-out dates
            inputDate.value = checkIn.slice(4, 15) + " - " + checkOut.slice(4, 15);
            // Create a new HotelDatepicker object for the inputDate element with the specified date format
            let datepicker = new HotelDatepicker(inputDate, {
                format: 'MMM DD YYYY',
            });
        });
    },

    // DATEPICKER
    // assets/js/vender/flatpickr.min.css
    // assets/js/vender/flatpickr.min.js
    // https://github.com/flatpickr/flatpickr
    // https://github.com/taylorhakes/fecha
    datePicker: () => {

        // Date of birth
        const dateOfBirth = document.querySelector(".date-of-birth");
        if (dateOfBirth) {
            new flatpickr(dateOfBirth, {
                allowInput: false,
                minDate: "today",
                static: true,
                position: "right center",
                wrap: true,
                disableMobile: "true",
                dateFormat: "M d Y",
            });
        }

        // Departure -date
        const departureDate = document.querySelector(".departure-date");
        if (departureDate) {
            let dateNow = new Date();
            new flatpickr(departureDate, {
                defaultDate: dateNow.toString(),
                allowInput: false,
                minDate: "today",
                static: true,
                position: "right center",
                wrap: true,
                disableMobile: "true",
                dateFormat: "M d Y",
            });
        }

    },

    // TINY SLIDER
    // assets/css/vender/swiper-bundle.min.css
    // assets/js/vender/swiper-bundle.min.js
    // https://github.com/nolimits4web/swiper
    swiperSlider: () => {

        // create a new Swiper instance for room slider
        if (document.querySelector('.room-slider')) {
            new Swiper(".room-slider", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                centeredSlides: true,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.room-next',
                    prevEl: '.room-prev',
                },
                pagination: {
                    el: ".room-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                }
            });
        }

        // create a new Swiper instance for room photo 1 slider
        if (document.querySelector('.room-photo-slider-1')) {
            new Swiper(".room-photo-slider-1", {
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 600,
                slidesOffsetBefore: 0,
                grabCursor: true,
                navigation: {
                    nextEl: '.room-photo-next-1',
                    prevEl: '.room-photo-prev-1',
                },
                pagination: {
                    el: ".room-photo-pagination-1",
                    type: "fraction",
                },
                breakpoints: {
                    720: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 208,
                    },
                    960: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 198,
                    },
                    1200: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 229,
                    },
                    1400: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 254,
                    },
                }
            });
        }

        // create a new Swiper instance for room photo 2 slider
        if (document.querySelector('.room-photo-slider-2')) {
            new Swiper(".room-photo-slider-2", {
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 600,
                loop: true,
                slidesOffsetBefore: 0,
                grabCursor: true,
                navigation: {
                    nextEl: '.room-photo-next-2',
                    prevEl: '.room-photo-prev-2',
                },
                pagination: {
                    el: ".room-photo-pagination-2",
                    type: "fraction",
                },
                breakpoints: {
                    720: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 208,
                    },
                    960: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 198,
                    },
                    1200: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 229,
                    },
                    1400: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 254,
                    },
                }
            });
        }

        // create a new Swiper instance for related rooms slider
        if (document.querySelector('.related-rooms-slider')) {
            new Swiper(".related-rooms-slider", {
                slidesPerView: 1,
                spaceBetween: 14,
                speed: 600,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.related-rooms-next',
                    prevEl: '.related-rooms-prev',
                },
                pagination: {
                    el: ".related-rooms-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    720: {
                        slidesPerView: 2,
                        spaceBetween: 14,
                    },
                }
            });
        }

        // create a new Swiper instance for clients-says slider
        if (document.querySelector('.client-say-slider')) {
            var swiper = new Swiper(".client-say-slider", {
                slidesPerView: 1,
                spaceBetween: 24,
                speed: 600,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.client-say-next',
                    prevEl: '.client-say-prev',
                },
                pagination: {
                    el: '.client-say-pagination',
                    type: "fraction",
                },
            });
        }

        // create a new Swiper instance for service slider
        if (document.querySelector('.service-slider')) {
            new Swiper(".service-slider", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: '.service-next',
                    prevEl: '.service-prev',
                },
                pagination: {
                    el: ".service-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                }
            });
        }

        // create a new Swiper instance for spa photo slider
        if (document.querySelector('.spa-photo-slider')) {
            new Swiper(".spa-photo-slider", {
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 600,
                slidesOffsetBefore: 0,
                grabCursor: true,
                navigation: {
                    nextEl: '.spa-photo-next',
                    prevEl: '.spa-photo-prev',
                },
                pagination: {
                    el: ".spa-photo-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    720: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 208,
                    },
                    960: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 198,
                    },
                    1200: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 229,
                    },
                    1400: {
                        slidesPerView: 3,
                        slidesOffsetBefore: 254,
                    },
                }
            });
        }

        // create a new Swiper instance for offer 1 slider
        if (document.querySelector('.offer-slider-1')) {
            new Swiper(".offer-slider-1", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: '.offer-next-1',
                    prevEl: '.offer-prev-1',
                },
                pagination: {
                    el: ".offer-pagination-1",
                    type: "fraction",
                },
                breakpoints: {
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 17,
                    },
                }
            });
        }

        // create a new Swiper instance for offer 2 slider
        if (document.querySelector('.offer-slider-2')) {
            new Swiper(".offer-slider-2", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: '.offer-next-2',
                    prevEl: '.offer-prev-2',
                },
                pagination: {
                    el: ".offer-pagination-2",
                    type: "fraction",
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 17,
                    },
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 17,
                    },
                }
            });
        }

        // create a new Swiper instance for news slider
        if (document.querySelector('.news-slider')) {
            new Swiper(".news-slider", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: '.news-next',
                    prevEl: '.news-prev',
                },
                pagination: {
                    el: ".news-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    1240: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    720: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                }
            });
        }

        // create a new Swiper instance for team slider
        if (document.querySelector('.team-slider')) {
            new Swiper(".team-slider", {
                slidesPerView: 1,
                spaceBetween: 14,
                speed: 600,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.team-next',
                    prevEl: '.team-prev',
                },
                pagination: {
                    el: ".team-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 14,
                    },
                    720: {
                        slidesPerView: 2,
                        spaceBetween: 14,
                    },
                }
            });
        }

    },

    // PLYR PLAYER
    // assets/css/vender/plyr.min.css
    // assets/css/vender/plyr.min.js
    // https://github.com/sampotts/plyr
    plyrPlayer: () => {
        // Create a new Plyr object for the html5 video
        const html5Player = new Plyr('.html5-player');
        // Create a new Plyr object for the vimeo video
        const vimeoPlayer = new Plyr('.vimeo-player');
        // Create a new Plyr object for the youtube video
        const youtubePlayer = new Plyr('.youtube-player');
    },

    // GLIGHTBOX
    // assets/css/vender/glightbox.min.css
    // assets/css/vender/glightbox.min.js
    // https://github.com/biati-digital/glightbox
    // assets/css/vender/plyr.min.css
    // assets/css/vender/plyr.min.js
    // https://github.com/sampotts/plyr
    gLightbox: () => {
        // Create a new GLightbox object for elements with the '.glightbox' class
        let photoLightbox = GLightbox({
            selector: '.glightbox'
        });

        // Create a new GLightbox object for elements with the '.media-glightbox' class
        let mediaLightbox = GLightbox({
            selector: '.media-glightbox',
            touchNavigation: true,
            loop: false,
            zoomable: false,
            autoplayVideos: true,
            moreLength: 0,
            slideExtraAttributes: {
                poster: ''
            },
            // Set options for the Plyr player
            plyr: {
                config: {
                    ratio: '16:9',
                    muted: false,
                    hideControls: true,
                    youtube: {
                        noCookie: false,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3
                    },
                    vimeo: {
                        byline: false,
                        portrait: false,
                        title: false,
                        speed: true,
                        transparent: false
                    }
                }
            },
        });
    },

    // SWICH THEME MODE
    // https://getbootstrap.com/docs/5.3/customize/color-modes/
    switchMode: () => {
        
        const storedTheme = localStorage.getItem('theme')

        const getPreferredTheme = () => {
            if (storedTheme) {
                return storedTheme
            }

            return document.documentElement.getAttribute("data-bs-theme")
        }

        const setTheme = function (theme) {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'dark')
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'light')
            }
        }

        setTheme(getPreferredTheme())

        const toggleButton = document.getElementById("toggle-theme");

        if (toggleButton) {
            const showActiveTheme = (theme) => {
                toggleButton.innerHTML = '';
                if (theme === "dark") {
                    toggleButton.setAttribute("data-bs-theme-value", "light");
                    const icon = document.createElement("i");
                    icon.className = "hicon hicon-bold hicon-free-night-stay";
                    toggleButton.appendChild(icon);
                } else {
                    toggleButton.setAttribute("data-bs-theme-value", "dark");
                    const icon = document.createElement("i");
                    icon.className = "hicon hicon-bold hicon-sunny";
                    toggleButton.appendChild(icon);
                }
            };

            showActiveTheme(getPreferredTheme())

            toggleButton.addEventListener('click', () => {
                const theme = toggleButton.getAttribute('data-bs-theme-value');
                localStorage.setItem('theme', theme);
                setTheme(theme);
                showActiveTheme(theme);
            });
        }

    },

    // BOOTSTRAP VALIDATION
    // https://getbootstrap.com/docs/5.3/forms/validation/#how-it-works
    bsValidation: () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    },

    // HIGHLIGHT
    // assets/css/vender/highlight-dark.min.css
    // assets/css/vender/highlight.min.js
    // https://github.com/highlightjs/highlight.js
    highlight: () => {
        hljs.highlightAll();
    },

    // CODE SNIPPET
    // assets/css/vender/clipboard.min.js
    // https://github.com/zenorocha/clipboard.js
    codeSnippet: () => {
        // Define the HTML for the copy button
        var btnHtml = '<button type="button" class="btn btn-sm btn-light btn-clipboard">Copy</button>'

        // Select all elements with the class 'code-wrapper-inner'
        document.querySelectorAll('.code-wrapper-inner').forEach(function (element) {
            // Insert the copy button HTML before each selected element
            element.insertAdjacentHTML('beforebegin', btnHtml)
        })

        // Create a new ClipboardJS instance for elements with the class 'btn-clipboard'
        var clipboard = new ClipboardJS('.btn-clipboard', {
            // Set the target to be the next sibling element of the trigger element
            target: function (trigger) {
                return trigger.nextElementSibling
            }
        })

        // Add an event listener for successful copy events
        clipboard.on('success', event => {
            // Change the text of the trigger element to 'Copied!'
            event.trigger.textContent = 'Copied!';
            // Clear the selection
            event.clearSelection();
            // Set a timeout to change the text of the trigger element back to 'Copy' after 2000ms
            setTimeout(function () {
                event.trigger.textContent = 'Copy';
            }, 2000);
        });

        // Create a new ClipboardJS instance for elements with the class 'btn-copy-icon'
        var copyIconCode = new ClipboardJS('.btn-copy-icon');

        // Add an event listener for successful copy events
        copyIconCode.on('success', function (event) {
            // Clear the selection
            event.clearSelection();
            // Change the text of the trigger element to 'Copied!'
            event.trigger.textContent = 'Copied!';
            // Set a timeout to change the text of the trigger element back to 'Copy' after 2300ms
            window.setTimeout(function () {
                event.trigger.textContent = 'Copy';
            }, 2300);
        });
    },

    // PRELOAD
    preloader: () => {
        // Select the preloader element
        const preloader = document.querySelector('#preloader');

        // Check if the preloader element exists
        if (preloader) {
            window.onload = function () {
                // Check if all resources have been successfully loaded
                if (document.readyState === 'complete') {
                    // Define a function to remove the preloader
                    function removePreloader() {
                        // Remove the preloader element from the DOM
                        preloader.remove();
                        // Remove classes from the body element
                        document.body.classList.remove('vh-100', 'vw-100', 'overflow-hidden');
                    }
                    // Set a timeout to call the removePreloader function after 1500ms
                    setTimeout(() => {
                        // Use requestAnimationFrame to call the removePreloader function
                        window.requestAnimationFrame(removePreloader);
                    }, 350);
                }
            };

        }
    },
}

theme.init();

