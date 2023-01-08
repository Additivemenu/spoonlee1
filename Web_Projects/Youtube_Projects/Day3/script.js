// const productContainers = document.querySelectorAll('.product-container');
// const nxtBtn = document.querySelector('.nxt-btn');
// const preBtn = document.querySelectorAll('.pre-btn');

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

console.log(productContainers, productContainers.length)
console.log(nxtBtn, nxtBtn.length)
console.log(preBtn, preBtn.length)

// TODO: why we need forEach loop since we only have 1 element for each querySelector?  --- in order to have the acces to `element` method  & property
// TODO: check https://developer.mozilla.org/en-US/docs/Web/API/Element
// let containerDimensions = productContainers.getBoundingClientRect();
// let containerWidth = containerDimensions.width;
// nxtBtn[0].addEventListener('click', () => {
//     productContainers.scrollLeft += containerWidth;
// })
// preBtn[0].addEventListener('click', () => {
//     productContainers.scrollLeft -= containerWidth;
// })


productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();     // element method
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;          // 每次点击button, scroll的宽度; scrollLeft is an element property
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})