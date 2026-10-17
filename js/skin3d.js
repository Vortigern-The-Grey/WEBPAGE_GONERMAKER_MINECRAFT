document.addEventListener("DOMContentLoaded", () => {

  let skinViewer = new skinview3d.SkinViewer({
		canvas: document.getElementById("skin_container"),
		width: 300,
		height: 400,
		skin: "img/skin.png"
	});

	// Change viewer size
	skinViewer.width = 600;
	skinViewer.height = 800;

	// Load another skin
	skinViewer.loadSkin("img/skin2.png");

	
	// Set the background color
	skinViewer.background = 0x5a76f3;

	// Set the background to a normal image
	skinViewer.loadBackground("img/background.png");

	
	

	// Rotate the player
	skinViewer.autoRotate = true;

});
