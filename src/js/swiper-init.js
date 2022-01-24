const slider = document.getElementById('swiper');

const swiper = new Swiper(slider, {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    setWrapperSize: true,
    slidesPerView: 1,
    grabCursor: true,
    draggable: true,
    slideToClickedSlide: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    // mousewheel: {
    //   sensitivity: 1,
    // },
    
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  
    // If we need pagination
    pagination: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      374: {
        spaceBetween: 210,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // },
      },
      891: {
        spaceBetween: 130,
      },
      // 1801: {
      //   spaceBetween: 150,
      // }
    },

});

swiper.allowTouchMove = true;
swiper.mousewheel.disable();