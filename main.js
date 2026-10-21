import { Render } from 'https://esm.run/skin3d';

// Load parent div
const container = document.getElementById("preview_box")
// Create a viewer
const viewer = new Render({
  canvas: document.getElementById('canvas-container'),
  width: container.clientWidth,
  height: container.clientHeight,
  skin: "https://mc-heads.net/skin/Steve",
  model: 'default', // 'default' or 'slim'
});


const skinCanvas = document.getElementById('live_skin_canvas');

function refreshSkin() {
  // const skinCanvas = document.getElementById('live_skin_canvas');
  const skinDataUrl = skinCanvas.toDataURL('image/png');
  viewer.loadSkin(skinDataUrl);
};

refreshSkin();

// Load a cape
// await viewer.loadCape('https://mc-heads.net/cape/Notch');

// Add animation
// viewer.animation = new WalkingAnimation();

// Enable auto-rotation
viewer.autoRotate = true;

window.addEventListener("resize", () => {
  console.log("window resized")
  viewer.width = 0;
  viewer.height = 0;

  const width = Math.floor(container.clientWidth);
    const height = Math.floor(container.clientHeight);
    if (viewer.width !== width || viewer.height !== height) {
        viewer.width = width;
        viewer.height = height;
    }
});


// skin auto refresh

skinCanvas.addEventListener("canvasUpdate", () => {
  requestAnimationFrame(() => {
    refreshSkin();
    console.log("skin updated on preview");
  });
});
