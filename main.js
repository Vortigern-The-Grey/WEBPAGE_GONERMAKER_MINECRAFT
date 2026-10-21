import { Render } from 'https://esm.run/skin3d';

// Load parent div
const container = document.getElementById("preview_box")
// Create a viewer
const viewer = new Render({
  canvas: document.getElementById('canvas-container'),
  width: container.clientWidth,
  height: container.clientHeight,
  model: 'default', 
});

// First load of skinCanvas
const skinCanvas = document.getElementById('live_skin_canvas');


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


function refreshSkin() {
  const skinCanvas = document.getElementById('live_skin_canvas');
  skinCanvas.toBlob((blob) => {
    if (!blob) return;
    
//    if (skinObjectURL) {
//      URL.revokeObjectURL(skinObjectURL)
//    };
    const skinObjectURL = URL.createObjectURL(blob);
    viewer.loadSkin(skinObjectURL);
  }, "image/png");
  console.log("refreshSkin() finished");
};

const debouncedRefresh = debounce(refreshSkin, 100);
debouncedRefresh();

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
    debouncedRefresh();
    console.log("skin updated on preview");
  });
});
