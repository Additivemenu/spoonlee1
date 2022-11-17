// get a single node ------------------------
const content = document.querySelector(".content"); // get the first node that meets specification
content.innerHTML = "Hahahahahahah";
console.log(content);

// get multiple nodes -----------------------
const contents = document.querySelectorAll(".content"); // get nodes
console.log(contents);

contents.forEach((node, index) => {     // loop over nodes, edit innerHTML 
node.innerHTML = `content ${index}`;
})



// // create Element --------------------------
// const span = document.createElement('span')
// span.innerHTML = "click me"

// // // *** append span onto a node ***
// // contents[contents.length - 1].appendChild(span) //appendChild, append result in the same effect here

// // append span onto a node---
// const domBody = document.querySelector("body") // note there is no '.' in front of body 
// domBody.appendChild(span)


// create element---
const div = document.createElement('div')
div.innerHTML = "<h1>click me</h1>"
// append span onto a node---
const domBody = document.querySelector("body") // note there is no '.' in front of body 
domBody.appendChild(div) 

// append over CSS: add a style to span we just added using JS
div.classList.toggle('active')  // toogle: switch

div.setAttribute('style', 'cursor:pointer') // 

// define click event 
div.addEventListener('click', ()=>{  
    div.classList.toggle('active') 
})