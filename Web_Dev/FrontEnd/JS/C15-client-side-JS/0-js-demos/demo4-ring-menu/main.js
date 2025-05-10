const circleSlider = document.querySelector(".circle-slider");
const images = document.querySelectorAll(".slider img");
const imageContainer = document.querySelector(".images");
const indicator = document.querySelector(".indicator");
const menuItems = document.querySelectorAll(".menu span");
const descriptions = document.querySelectorAll(".text");

const ratationValues = [-58, -32, 0, 32, 58];

const colors = [
  "radial-gradient(#a74255, #440412)",
  "radial-gradient(#ff4b5f, #a40b16)",
  "radial-gradient(#fdb76d, #f08a00)",
  "radial-gradient(#849ade, #42395f)",
  "radial-gradient(#e7ad59, #883e2a)",
];

function rotate(roationValue) {
  imageContainer.style.transform = `rotate(${roationValue}deg)`;
  indicator.style.transform = `translate(-50%, -50%) rotate(${roationValue}deg)`;
}

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    images.forEach((image) => {
      image.style.opacity = "0";
    });
    images[index].style.opacity = "1";
    circleSlider.style.background = colors[index];

    rotate(ratationValues[index]);

    descriptions.forEach((description) => {
      description.style.display = "none";
    });
    descriptions[index].style.display = "block";
  });
});
