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

    // progress bar's growth
    const actives = document.querySelectorAll(".active");
    progress.style.width =
      ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

    // disable button on BCs
    if (currentActive === 1) {
        prev.disabled = true;
      } else if (currentActive === circles.length) {
        next.disabled = true;
      } else {
        prev.disabled = false;
        next.disabled = false;
      }
}