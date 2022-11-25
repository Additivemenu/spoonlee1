/**get the DOM node: toggle */
const menuToggle = document.querySelector('.toggle');

/**get the DOM node: showcase */
const showcase = document.querySelector('.showcase');

/**DOM2 function addEventListener: define event when click on toggle */
menuToggle.addEventListener('click', ()=>{

    menuToggle.classList.toggle('active') /**toggle: switch,
     if having 'active' then remove it, if not having 'active' then add it in the class name*/
    // menuToggle.classList.add('active')
    // menuToggle.classList.remove('active')
    showcase.classList.toggle('active')
})

