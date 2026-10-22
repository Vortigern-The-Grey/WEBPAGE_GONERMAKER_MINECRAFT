
function sndSelect(){
    var audio = new Audio("/audio/snd_select.wav");
    audio.volume = 1;
    audio.play(); 
}

function sndSqueak() {
  var audio = new Audio("/audio/snd_squeak.wav");
  audio.volume = 0.5;
  audio.play();
}

document.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("mouseenter", sndSqueak);
});