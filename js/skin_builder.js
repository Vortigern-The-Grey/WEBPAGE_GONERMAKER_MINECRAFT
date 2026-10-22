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

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const imgTemp = new Image();
    imgTemp.crossOrigin = "anonymous";
    imgTemp.onload = () => resolve(imgTemp);
    imgTemp.onerror = (err) => reject(err);

    imgTemp.src = path;
  });
};

// preloadImages(gonerBodyIndexSlim);
// preloadImages(gonerBodyIndexWide);
// preloadImages(gonerHairIndex);
// fetch("./images/GONER_GIFTS/IMAGE_GONERGIFT_KINDNESS.png", { cache: "force-cache" });

ctxLive.imageSmoothingEnabled = false;
  
let currentModel = 1;
let currentHead = 1;
let currentBody = 1;
let toggleBlush = false;
let toggleHair = false;

async function drawGonerSprite(varModel, intHead, intBody, boolHair, boolBlush) {
  console.log("drawGonerSprite(): Function initialised")
  ctxLive.clearRect(0, 0, canvas.width, canvas.height);
  await ctxLive.beginPath();
  console.log("drawGonerSprite(): Canvas cleared") 
  // Load and draw body image
  let pathBody = null;
  if (varModel == 1) {
    console.log("drawGonerSprite(): Slim model selected, loading slim texture for body type " + intBody)
    pathBody = gonerBodyIndexSlim[(intBody - 1)];
  } else if (varModel == 2) {
    console.log("drawGonerSprite(): Wide model selected, loading wide texture for body type " + intBody)
    pathBody = gonerBodyIndexWide[(intBody - 1)];
  };
  const imgBody = await loadImage(pathBody);
  ctxLive.drawImage(imgBody, 0, 0, 64, 64);
  
  // Load and draw head texture
  let pathHead = null;
  pathHead = ("./images/GONER_HEADS/IMAGE_GONERHEAD_" + (intHead - 1) + ".png");
  const imgHead = await loadImage(pathHead);
  ctxLive.drawImage(imgHead, 0, 0, 64, 64);
  
  // Load and draw hair texture if option selected
  if (boolHair) {
    let pathHair = null;
    pathHair = "./images/GONER_HAIR/IMAGE_GONERHAIR_" + (intHead - 1) + ".png";
    const imgHair = await loadImage(pathHair);
    ctxLive.drawImage(imgHair, 0, 0, 64, 64);
  };

  // Load and draw blush texture if option selected
  if (boolBlush) {
    let pathBlush = null;  
    pathBlush = "./images/GONER_GIFTS/IMAGE_GONERGIFT_KINDNESS.png";
    const imgBlush = await loadImage(pathBlush);
    ctxLive.drawImage(imgBlush, 0, 0, 64, 64);
  };
  
  // Send canvasUpdate to let 3d preview know canvas has been updated
  requestAnimationFrame(() => {
    setTimeout(() => {
      canvas.dispatchEvent(new Event("canvasUpdate")) 
      console.log("canvasUpdate dispatched");    
    }, 0);
  });
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
