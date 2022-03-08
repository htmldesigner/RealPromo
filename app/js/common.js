document.addEventListener('DOMContentLoaded', () => {

    const btnMnu = document.querySelector('.btnMnu')
    const menu = document.querySelector('.menu')
    const menuOverlay = document.querySelector('.menuOverlay')
    const menuContainer = document.querySelector('.menuContainer')

    btnMnu.addEventListener('click', (event) => {
        btnMnu.classList.toggle('active')

            setTimeout(() => {
                menuContainer.classList.toggle('isActive')
                menuOverlay.classList.toggle('isActive')
            }, 1)



    })

    menuOverlay.addEventListener('click', () => {
        btnMnu.classList.remove('active')
        menuContainer.classList.remove('isActive')
        menuOverlay.classList.remove('isActive')

    })

});
