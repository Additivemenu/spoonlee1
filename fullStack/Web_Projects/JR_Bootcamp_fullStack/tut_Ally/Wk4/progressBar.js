// get nodes
const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");     // return array

let currentActive = 1;

next.addEventListener("click", ()=>{
    currentActive++;
    console.log('currentActive', currentActive);
    if(currentActive > circles.length){
        currentActive = circles.length;
    }
    update();
});

prev.addEventListener("click", ()=>{
    currentActive--;
    console.log('currentActive', currentActive);
    if(currentActive < 1){
        currentActive = 1;
    }
    update();
});


function update(){

    circles.forEach((ele, index) =>{        // note index starts from 0, while currentActive [1,4]
        if(index < currentActive){
            ele.classList.add("active");
        }else{
            ele.classList.remove("active");
        }
        
    })

    if(currentActive == 1){
        progress.style.width = "0%";
    }else if(currentActive == 2){
        progress.style.width = "33%";
    }else if(currentActive == 3){
        progress.style.width = "66%";
    }else if(currentActive == 4){
        progress.style.width = "100%";
    }
}