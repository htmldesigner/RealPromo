document.addEventListener('DOMContentLoaded', () => {

    const btnMnu = document.querySelector('.btnMnu')
    const menu = document.querySelector('.menu')
    const menuOverlay = document.querySelector('.menuOverlay')
    const menuContainer = document.querySelector('.menuContainer')

    btnMnu.addEventListener('click', (event) => {
        btnMnu.classList.toggle('active')

        if (btnMnu.classList.contains('active')) {
            menu.classList.add('active')
            setTimeout(() => {
                menuContainer.classList.toggle('isActive')
                menuOverlay.classList.toggle('isActive')
            }, 1)
        } else {
            menuContainer.classList.remove('isActive')
            menuOverlay.classList.remove('isActive')
            setTimeout(() => {
                menu.classList.remove('active')
            }, 500)
        }
    })

    menuOverlay.addEventListener('click', () => {
        btnMnu.classList.remove('active')
        menuContainer.classList.remove('isActive')
        menuOverlay.classList.remove('isActive')
        setTimeout(() => {
            menu.classList.remove('active')
        }, 500)
    })




    // $('.test-popup-link').magnificPopup({
    //     type: 'image',
    //     // closeOnContentClick: true,
    //     // // closeBtnInside: false,
    //     // // fixedContentPos: true,
    //     // // mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    //     // image: {
    //     //     verticalFit: true
    //     // },
    //     // zoom: {
    //     //     enabled: true,
    //     //     duration: 300 // don't foget to change the duration also in CSS
    //     // }
    // });


    $('.image-link').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
        },
        zoom: {
            enabled: true,
            duration: 200
        }
    });


    $('.realEstateItemImage').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        // variableWidth: true,
    });

    $('.slick-dots li button').on('click', function(e){
        e.preventDefault(); // use this
    });


});
