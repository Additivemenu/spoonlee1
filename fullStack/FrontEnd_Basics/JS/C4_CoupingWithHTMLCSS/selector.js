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
