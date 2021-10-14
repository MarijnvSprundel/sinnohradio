let audioSource, oldAudio, newAudio, audioVolume, audio, audio2;
const playButton = document.getElementById("play-button");
const locationImage = document.getElementById("location-image");
const locationText = document.getElementById("location-text");
let isPlaying = false;
let isSwitching = false;
let activeTrack = 0;
let bpmday = 169;
let bpmnight = 138;
audio = new Audio();
audio2 = new Audio();
audio.src = "audio/canalavecityday.mp3";
audioVolume = 0.1
audio.volume = audio2.volume = audioVolume;
let coordinates = [0, 0];

let validLocation = true;

function switchLocation(dir){
  validLocation = false;
  switch (dir) {
    case "left":
      coordinates[0] -= 1;
      break;
    case "right":
      coordinates[0] += 1;
      break;
    case "up":
      coordinates[1] += 1;
      break;
    case "down":
      coordinates[1] -= 1;
      break;
  }
  console.log(coordinates);
  locations.forEach((item, index) => {
    if (coordinates[0] == item.coords[0] && coordinates[1] == item.coords[1]){
      validLocation = true;
      locationImage.src = "img/" + item.image;
      locationText.textContent = item.name;
    }
  });
  if(validLocation == false){
    locationImage.src = "img/mysteryzone.png";
    locationText.textContent = "Mystery zone";
  }
}

function playMusic(){
  if(selectAudio()[0].paused){
    selectAudio()[0].play();
    isPlaying = true;
    playButton.textContent = "Pause";
  }
  else{
    selectAudio()[0].pause();
    isPlaying = false;
    playButton.textContent = "Play";
  }
}

function selectAudio(){
  if(activeTrack == 0){
    return [audio, audio2];
  }
  else{
    return [audio2, audio];
  }
}

function switchTrack(time){
  let audioArray = selectAudio();
  if(!isSwitching){
    audioSource = audioArray[0].src.replace(".mp3", "");
    if(!audioSource.endsWith(time)){
      changeImageTime(time);
      audioSource = audioSource.replace(/day|night/g, "");
      audioArray[1].src = audioSource + time + ".mp3";
      audioArray[1].currentTime = (audioArray[0].currentTime * bpmday) / bpmnight;

      if(isPlaying){
        audioArray[1].volume = 0;
        isSwitching = true;
        audioArray[1].play();
        $(audioArray[0]).animate({volume: 0}, 200);
        $(audioArray[1]).animate({volume: audioVolume}, 200, function() {
          audioArray[0].pause();
          activeTrack = 1 - activeTrack;
          isSwitching = false;
          console.log(selectAudio()[0].src)
        });
      }else{
        activeTrack = 1 - activeTrack;
        audioArray[0].src = audioSource + time + ".mp3";
      }
    }
  }
}

function changeImageTime(time){
  switch (time) {
    case "night":
      locationImage.style.filter = "grayscale(52%) brightness(59%) hue-rotate(35deg) saturate(164%) contrast(196%) invert(3%)";
      break;
    case "day":
    default:
      locationImage.style.filter = "";
      break;
  }
}
