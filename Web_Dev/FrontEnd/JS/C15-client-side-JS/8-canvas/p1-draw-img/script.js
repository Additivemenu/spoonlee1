window.onload = function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = "https://utfs.io/f/0aa5de90-7652-4e12-a528-3a081bedf94c-26cmq.png"; // URL of the image

  image.onload = function () {
    // ! the coordinates are relative to the canvas
    ctx.drawImage(image, 50, 50, 300, 400); // Draw image at coordinates (50, 50)
  };
};
