import { Render } from 'https://esm.run/skin3d';

// Create a viewer
const viewer = new Render({
  canvas: document.getElementById('canvas-container'),
//  width: window.innerWidth,
//  height: window.innerHeight,
  width: 100%,
  height: 100%,
  model: 'default', // 'default' or 'slim'
});


const skinCanvas = document.getElementById('live_skin_canvas');
const skinDataUrl = skinCanvas.toDataURL('image/png');
viewer.loadSkin(skinDataUrl)

// Load a cape
// await viewer.loadCape('https://mc-heads.net/cape/Notch');

// Add animation
// viewer.animation = new WalkingAnimation();

// Enable auto-rotation
// viewer.autoRotate = true;

// Handle window resize
//window.addEventListener('resize', () => {
//  viewer.width = window.innerWidth;
//  viewer.height = window.innerHeight;
//});
