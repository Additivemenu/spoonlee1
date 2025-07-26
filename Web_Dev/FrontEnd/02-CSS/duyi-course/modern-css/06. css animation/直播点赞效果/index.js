const likeBtn = document.querySelector(".like-btn");
const addEmoji = document.querySelector(".add-emoji");
const autoEmoji = document.querySelector(".auto-emoji");
const X_TYPE = 11;
const AUTO_SIZE = 50;
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
// 点击按钮
likeBtn.addEventListener("click", function () {
  // 添加抖动效果
  this.classList.add("btn-scale");
  // 生成表情添加动画
  // 创建具有随机表情的元素，添加特定的类名
  const ele = document.createElement("div");
  ele.innerText = getRandomEmoji();
  ele.style.animationName = `emo-scale, move-y, emo-opacity, move-x_${Math.ceil(
    Math.random() * X_TYPE
  )}`;
  ele.className = "emoji emoji-animate";
  addEmoji.appendChild(ele);
});

likeBtn.addEventListener("animationend", function () {
  this.classList.remove("btn-scale");
});

// 动画在完成后删除
addEmoji.addEventListener("animationend", function (e) {
  e.target.remove();
});

// 添加自动滚动的表情
for (let i = 0; i < AUTO_SIZE; i++) {
  const ele = document.createElement("div");
  ele.innerText = getRandomEmoji();
  ele.style.animationName = `emo-scale, move-y, move-x_${Math.ceil(
    Math.random() * X_TYPE
  )}`;
  ele.className = "emoji emoji-animate";
  ele.style.animationIterationCount = "infinite";
  ele.style.animationDelay = i * 0.1 + -AUTO_SIZE / 2 + "s";
  ele.style.opacity = .2;
  autoEmoji.appendChild(ele);
}

function getRandomEmoji() {
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}
