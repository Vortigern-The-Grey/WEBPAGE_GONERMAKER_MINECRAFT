const canvas = document.getElementById("live_skin_canvas");
const offscreen = new OffscreenCanvas(64, 64);
const ctxLive = canvas.getContext("2d");
const ctxOffscreen = offscreen.getContext("2d");
console.log("skin_builder.js: Box canvas")
// Array of vessel body textures
const gonerBodyIndex = [
  "./images/GONER_BODIES/IMAGE_GONERBODY_MED.png", 
  "./images/GONER_BODIES/IMAGE_GONERBODY_TEE.png", 
  "./images/GONER_BODIES/IMAGE_GONERBODY_THICK.png", 
  "./images/GONER_BODIES/IMAGE_GONERBODY_LONG.png", 
  "./images/GONER_BODIES/IMAGE_GONERBODY_VEST.png", 
  "./images/GONER_BODIES/IMAGE_GONERBODY_BUTTONS.png"
];
// Optional: Disable image smoothing for sharp pixel-art rendering
ctxLive.imageSmoothingEnabled = false;toString()
ctxOffscreen.imageSmoothingEnabled = false; 
  // img.src = "./images/GONER_BODIES/IMAGE_GONERBODY_BUTTONS.png"; // Replace with your image source or base64
  
  // img.onload = () => {
  //  // Draw and scale the image to fit the 64x64 canvas
  //   ctx.drawImage(img, 0, 0, 64, 64);
  // };
  

let currentHead = 1;
let currentBody = 6;
let toggleBlush = false;
let toggleHair = false;
function drawGonerSprite(intHead, intBody, boolHair, boolBlush) {
  ctxLive.clearRect(0, 0, canvas.width, canvas.height);
  ctxLive.beginPath();
  
  // Load and draw body image
  const imgBody = new Image();
  imgBody.src = gonerBodyIndex[(intBody - 1)]; 
  imgBody.onload = function() {ctxLive.drawImage(imgBody, 0, 0, 64, 64); }
  
  // Load and draw head texture
  const imgHead = new Image()
  imgHead.src = "./images/GONER_HEADS/IMAGE_GONERHEAD_" + (intHead - 1) + ".png";
  imgHead.onload = function() {ctxLive.drawImage(imgHead, 0, 0, 64, 64);}
  
  // Load and draw hair texture if option selected
  if (boolHair) {
    const imgHair = new Image()
    imgHair.src = "./images/GONER_HAIR/IMAGE_GONERHAIR_" + (intHead - 1) + ".png";
    imgHair.onload = function() { ctxLive.drawImage(imgHair, 0, 0, 64, 64); }
  };

  // Load and draw blush texture if option selected
  if (boolBlush) {
    const imgBlush = new Image()
    imgBlush.src = "./images/GONER_GIFTS/IMAGE_GONERGIFT_KINDNESS.png";
    imgBlush.onload = function() {ctxLive.drawImage(imgBlush, 0, 0, 64, 64); }
  };

  
};

drawGonerSprite(currentHead, currentBody, toggleHair, toggleBlush);

document.getElementById("head").addEventListener("change", function(event) {
  const selectedHead = parseInt(event.target.value);
  currentHead = selectedHead;
  drawGonerSprite(currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("body").addEventListener("change", function(event) {
  const selectedBody = parseInt(event.target.value);
  currentBody = selectedBody;
  drawGonerSprite(currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("blush").addEventListener("change", function(event) {
  if (this.checked) {
    toggleBlush = true
  } else {
    toggleBlush = false
  };
  drawGonerSprite(currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("hair").addEventListener("change", function(event) {
  if (this.checked) {
    toggleHair = true
  } else {
    toggleHair = false
  };
  drawGonerSprite(currentHead, currentBody, toggleHair, toggleBlush); 
});
