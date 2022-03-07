document.addEventListener('DOMContentLoaded', () => {
    const btnMnu = document.querySelector('.btnMnu')
    btnMnu.addEventListener('click', (event) => {
        btnMnu.classList.toggle('active')

    })
});
