const imageCount = 8;
const slide = document.querySelector(".slide");
for (let i = 0; i < imageCount; i++) {
  const item = document.createElement("div");
  item.classList.add("item");

  paddingNumber = (i + 1).toString().padStart(2, "0");
  item.style.backgroundImage = `url(./images/image-${paddingNumber}.jpg)`;
  slide.appendChild(item);

  const content = document.createElement("div");
  content.classList.add("content");
  item.appendChild(content);

  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = `Image ${paddingNumber}`;
  content.appendChild(name);

  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";
  content.appendChild(description);

  const button = document.createElement("button");
  button.textContent = "View Details";
  content.appendChild(button);
}

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

next.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
});
