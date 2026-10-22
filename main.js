import { Render } from 'https://esm.run/skin3d';

// First load of skinCanvas
const skinCanvas = document.getElementById('live_skin_canvas');

// Load parent div
const container = document.getElementById("preview_box")

// Create a viewer
const viewer = new Render({
  canvas: document.getElementById('canvas-container'),
  width: container.clientWidth,
  height: container.clientHeight,
  model: 'default', 
});

// debounce function for refreshSkin
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

async function refreshSkin() {
  await requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const skinCanvas = document.getElementById('live_skin_canvas');
      // const skinURL = skinCanvas.toDataURL()
      viewer.loadSkin(skinCanvas);
    });
  });
  console.log("refreshSkin(): Finished");
};

// enable debounce function
const debouncedRefresh = debounce(refreshSkin, 100);
debouncedRefresh();

// Load a cape
// await viewer.loadCape('https://mc-heads.net/cape/Notch');

// Add animation
// viewer.animation = new WalkingAnimation();

// Enable auto-rotation
viewer.autoRotate = true;

// Canvas resizer
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
    setTimeout(() => {
      debouncedRefresh();
      console.log("skin updated on preview");
    }, 0);
  });
});
