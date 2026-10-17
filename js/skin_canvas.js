document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("live_skin_canvas");
  const ctx = canvas.getContext("2d");

  // Optional: Disable image smoothing for sharp pixel-art rendering
  ctx.imageSmoothingEnabled = false;

  const img = new Image();
  img.src = "./images/GONER_BODIES/IMAGE_GONERBODY_BUTTONS.png"; // Replace with your image source or base64
  
  img.onload = () => {
    // Draw and scale the image to fit the 64x64 canvas
    ctx.drawImage(img, 0, 0, 64, 64);
  };
});

function drawNewSprite(image) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.drawImage(image, 0, 0, 64, 64)
};

