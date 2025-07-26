const likeBtn = document.querySelector(".like-btn");
const addEmoji = document.querySelector(".add-emoji");
const autoEmoji = document.querySelector(".auto-emoji");

const AUTO_NUM = 50;
const X_TYPE = 11;
const emojiList = [
  "😀",
  "🤣",
  "❤️",
  "😻",
  "👏",
  "🤘",
  "🤡",
  "🤩",
  "👍🏼",
  "🐮",
  "🎈",
  "💕",
  "💓",
  "💚",
];
likeBtn.addEventListener("click", function () {
  // 完成抖动效果
  likeBtn.classList.add("btn-scale");
  // 生成气泡表情
  const ele = document.createElement("div");
  ele.classList.add("emo");
  ele.classList.add("emo-animate");
  ele.innerText = getRandomEmoji();
  ele.style.animationName = `emo-y, emo-opacity, emo-scale, move-x_${Math.ceil(
    Math.random() * X_TYPE
  )}`;
  addEmoji.appendChild(ele);
});

likeBtn.addEventListener("animationend", function () {
  likeBtn.classList.remove("btn-scale");
});

addEmoji.addEventListener("animationend", function (e) {
  e.target.remove();
});

// 自动气泡区域
for (let i = 0; i < AUTO_NUM; i++) {
  const ele = document.createElement("div");
  ele.classList.add("emo");
  ele.classList.add("emo-animate");
  ele.innerText = getRandomEmoji();
  ele.style.opacity = 0.2;
  ele.style.animationIterationCount = "infinite";
  ele.style.animationDelay = i * 0.1 + -AUTO_NUM * .5 + "s";
  ele.style.animationName = `emo-y, emo-scale, move-x_${Math.ceil(
    Math.random() * X_TYPE
  )}`;
  autoEmoji.appendChild(ele);
}

function getRandomEmoji() {
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}
