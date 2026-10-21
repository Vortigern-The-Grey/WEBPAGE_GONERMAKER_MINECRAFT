const canvas = document.getElementById("live_skin_canvas");
const ctxLive = canvas.getContext("2d");
console.log("skin_builder.js: Box canvas");
// Array of vessel body textures
const gonerBodyIndexSlim = [
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_MED.png", 
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_TEE.png", 
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_THICK.png", 
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_LONG.png", 
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_VEST.png", 
  "./images/GONER_BODIES_SLIM/IMAGE_GONERBODY_BUTTONS.png"
];
const gonerBodyIndexWide = [
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_MED.png", 
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_TEE.png", 
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_THICK.png", 
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_LONG.png", 
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_VEST.png", 
  "./images/GONER_BODIES_WIDE/IMAGE_GONERBODY_BUTTONS.png"
];

const gonerHairIndex = Array.from({ length: 5 }, (value, index) => "./images/GONER_HAIR/IMAGE_GONERHAIR_" + index + ".png");



// preload all sprites to prevent lag
async function preloadImages(spriteIndex) {
  // Load wide body images
  try {
    await Promise.all(
      spriteIndex.map(url => fetch(url, { cache: "force-cache" }))
    );
    console.log("Preloaded images from " + spriteIndex)
  } catch (error) {
    console.error("Error preloading images: ", error); 
  }
};

preloadImages(gonerBodyIndexSlim);
preloadImages(gonerBodyIndexWide);
preloadImages(gonerHairIndex);
fetch("./images/GONER_GIFTS/IMAGE_GONERGIFT_KINDNESS.png", { cache: "force-cache" });

ctxLive.imageSmoothingEnabled = false;
  
let currentModel = 1;
let currentHead = 1;
let currentBody = 1;
let toggleBlush = false;
let toggleHair = false;

async function drawGonerSprite(varModel, intHead, intBody, boolHair, boolBlush) {
  console.log("drawGonerSprite(): Function initialised")
  console.log("drawGonerSprite(): varModel = " + varModel)
  console.log("drawGonerSprite(): intHead = " + intHead)
  console.log("drawGonerSprite(): intBody = " + intBody)
  console.log("drawGonerSprite(): boolHair = " + boolHair)
  console.log("drawGonerSprite(): boolBlush = " + boolBlush)
  ctxLive.clearRect(0, 0, canvas.width, canvas.height);
  await ctxLive.beginPath();
  console.log("drawGonerSprite(): Canvas cleared") 
  // Load and draw body image
  const imgBody = new Image();
  imgBody.crossOrigin = "anonymous";
  if (varModel == 1) {
    console.log("drawGonerSprite(): Slim model selected, loading slim texture for body type " + intBody)
    imgBody.src = gonerBodyIndexSlim[(intBody - 1)];
  } else if (varModel == 2) {
    console.log("drawGonerSprite(): Wide model selected, loading wide texture for body type " + intBody)
    imgBody.src = gonerBodyIndexWide[(intBody - 1)];
  };
   
  imgBody.onload = function() {ctxLive.drawImage(imgBody, 0, 0, 64, 64); }
  
  // Load and draw head texture
  const imgHead = new Image()
  imgHead.crossOrigin = "anonymous";
  imgHead.src = "./images/GONER_HEADS/IMAGE_GONERHEAD_" + (intHead - 1) + ".png";
  imgHead.onload = function() {ctxLive.drawImage(imgHead, 0, 0, 64, 64);}
  
  // Load and draw hair texture if option selected
  if (boolHair) {
    const imgHair = new Image();
    imgHair.crossOrigin = "anonymous";
    imgHair.src = "./images/GONER_HAIR/IMAGE_GONERHAIR_" + (intHead - 1) + ".png";
    imgHair.onload = function() { ctxLive.drawImage(imgHair, 0, 0, 64, 64); }
  };

  // Load and draw blush texture if option selected
  if (boolBlush) {
    const imgBlush = new Image();
    imgBlush.crossOrigin = "anonymous";   
    imgBlush.src = "./images/GONER_GIFTS/IMAGE_GONERGIFT_KINDNESS.png";
    imgBlush.onload = function() {ctxLive.drawImage(imgBlush, 0, 0, 64, 64); }
  };
  
  // Send canvasUpdate to let 3d preview know canvas has been updated
  canvas.dispatchEvent(new Event("canvasUpdate")) 
  
};

drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush);

document.getElementById("model").addEventListener("change", function(event) {
  let selectedModel = parseInt(event.target.value);
  console.log({ selectedModel })
  currentModel = selectedModel;
  drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("head").addEventListener("change", function(event) {
  const selectedHead = parseInt(event.target.value);
  currentHead = selectedHead;
  drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("body").addEventListener("change", function(event) {
  const selectedBody = parseInt(event.target.value);
  currentBody = selectedBody;
  drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("blush").addEventListener("change", function(event) {
  if (this.checked) {
    toggleBlush = true
  } else {
    toggleBlush = false
  };
  drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush); 
});

document.getElementById("hair").addEventListener("change", function(event) {
  if (this.checked) {
    toggleHair = true
  } else {
    toggleHair = false
  };
  drawGonerSprite(currentModel, currentHead, currentBody, toggleHair, toggleBlush); 
});
