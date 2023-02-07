let num = 0



const Count = () =>{

    const container = document.createElement('div')

    // text
    const text = document.createTextNode(num)       // create text node here once per render

    // button
    const handleClick = () => {
        num++;

        // !!! re-render !!!
        document.querySelector('#root').innerHTML = ''
        document.querySelector('#root').appendChild(Count())
    }
    

    // DOM ---------------------------------------------

    const button = document.createElement('button')
    button.innerHTML = 'Plus'
    button.type = 'button'
    button.addEventListener('click', handleClick);

    // add up
    container.appendChild(text)
    container.appendChild(button)

    // div
    //      text
    //      button
    return container

}


document.querySelector('#root').appendChild(Count())