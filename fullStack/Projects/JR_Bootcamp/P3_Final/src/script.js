/**find class toggle */
const menuToggle = document.querySelector('.toggle');

/**find class showcase */
const showcase = document.querySelector('.showcase');

/**define event when click on toggle */
menuToggle.addEventListener('click', ()=>{

    menuToggle.classList.toggle('active') /**toggle: switch,
     if having 'active' then remove it, if not having 'active' then add it*/
    // menuToggle.classList.add('active')
    // menuToggle.classList.remove('active')
    showcase.classList.toggle('active')
})

