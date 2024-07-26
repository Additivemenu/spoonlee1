// start from data logic
// then interface logic (refer to function), as interface is the function of data
// at last the event logic: event -> interface function

/**
 * parse lrc string to lrc object array {time: number, words: string}[]
 * @param {string} lrc
 * @returns {Array<{time: number, words: string}>}
 */
function parseLrc(lrc) {
  const lrcArr = lrc.split("\n");
  const lrcObjArr = lrcArr.map((line) => {
    let parts = line.split("]");

    const timeStr = parts[0].slice(1);

    return (lrcObj = {
      time: parseTimeStrToSeconds(timeStr),
      words: parts[1],
    });
  });
  return lrcObjArr;
}

/**
 *
 * @param {string} timeStr
 * @returns {number}
 */
function parseTimeStrToSeconds(timeStr) {
  const [min, sec] = timeStr.split(":");
  return +min * 60 + +sec;
}

let lrcData = parseLrc(lrc);
console.log(lrcData);

let doms = {
  audio: document.querySelector("audio"),
  lrcList: document.querySelector(".lrc-list"),
  container: document.querySelector(".container"),
};

console.log(findIndex(23));

/**
 * calculate the index of the lrc object array by the current time of the audio
 * if no lrcline is found, return -1
 * @return {number} index of lrc to highlight in the array
 */
function findIndex() {
  let currentTime = doms.audio.currentTime;

  for (let i = 0; i < lrcData.length; i++) {
    if (currentTime < lrcData[i].time) {
      return i - 1;
    }
  }

  // if the currentTime is greater than the last lrc time
  return lrcData.length - 1;
}

// stage2: interface logic
// ! don't consider optimization at the first place -> write the most straightforward code firstly
function createLrcElements() {
  let frag = document.createDocumentFragment(); // this won't change the dom tree

  lrcData.forEach((lrcObj) => {
    let lrcLine = document.createElement("li");
    lrcLine.textContent = lrcObj.words;
    frag.appendChild(lrcLine); // change dom tree
  });

  // use frag to attach the lrc element first, then attach the frag to the dom tree -> reduce the reflow, a bit like caching
  doms.lrcList.appendChild(frag); // change dom tree
}
createLrcElements();

const containerHeight = doms.container.clientHeight;
const liHeight = doms.lrcList.children[0].clientHeight;
const maxOffset = doms.lrcList.clientHeight - containerHeight;
/**
 * set ul element offset ->  make the current lrc line in the middle of the ul element
 */
function setOffset() {
  let index = findIndex();
  let h1 = liHeight * index + liHeight / 2;
  let offset = h1 - containerHeight / 2;
  if (offset < 0) offset = 0;
  if (offset > maxOffset) offset = maxOffset;

  doms.lrcList.style.transform = `translateY(-${offset}px)`;

  // remove active class from previous li active
  let prevLi = doms.lrcList.querySelector(".active");
    if (prevLi) {
        prevLi.classList.remove("active");
    }

  let curLi = doms.lrcList.children[index];
  if (curLi) {
    curLi.classList.add("active");
  }
  console.log(index);
}


// stage3: event logic
doms.audio.addEventListener("timeupdate", setOffset);