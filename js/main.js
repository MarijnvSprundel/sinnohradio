let audioSource, timeSelected, audioVolume, audio, audio2, trackInfo;



let isPlaying = false;
let isSwitching = false;
let activeTrack = 0;
let bpmday = 169;
let bpmnight = 138;

timeSelected = "day";
audio = new Audio();
audio2 = new Audio();

audioVolume = 0.1
audio.volume = audio2.volume = audioVolume;
let coordinates = [0, 0];
let locationIndex = checkLocation();
trackInfo = getTrackInfo(timeSelected);


const playButton = document.getElementById("play-button");
playButton.addEventListener("click", function(){
  playMusic();
});
const upButton = document.getElementById("up");
upButton.addEventListener("click", function(){
  coordinates[1] += 1;
  update();
});
const downButton = document.getElementById("down");
downButton.addEventListener("click", function(){
  coordinates[1] -= 1;
  update();
});
const leftButton = document.getElementById("left");
leftButton.addEventListener("click", function(){
  coordinates[0] -= 1;
  update();
});
const rightButton = document.getElementById("right");
rightButton.addEventListener("click", function(){
  coordinates[0] += 1;
  update();
});

audio.src = "audio/" + trackInfo[0];
const locationImage = document.getElementById("location-image");
const locationText = document.getElementById("location-text");

function update(){
  locationIndex = checkLocation();
  locationImage.src = "img/" + locations[locationIndex]["image"];
  locationText.textContent = locations[locationIndex]["name"];
  arrowSelector();
  generateTimeButtons();
  changeImageTime();
  if(!selectAudio()[0].src.endsWith(getTrackInfo(timeSelected)[0])){
    selectAudio()[0].src = "audio/" + getTrackInfo(timeSelected)[0];
    if(isPlaying){
      selectAudio()[0].play();
    }
  }
}

arrowSelector();
function arrowSelector(){
  upButton.style.visibility = rightButton.style.visibility = leftButton.style.visibility = downButton.style.visibility = "hidden";
  locations.forEach((item) => {
    switch (JSON.stringify(item["coords"])) {
      case JSON.stringify([coordinates[0] + 1, coordinates[1]]):
        rightButton.style.visibility = "visible";
        break;
      case JSON.stringify([coordinates[0] - 1, coordinates[1]]):
        leftButton.style.visibility = "visible";
        break;
      case JSON.stringify([coordinates[0], coordinates[1] + 1]):
        upButton.style.visibility = "visible";
        break;
      case JSON.stringify([coordinates[0], coordinates[1] - 1]):
        downButton.style.visibility = "visible";
        break;
    }
  });
}
function checkLocation(){
  let i = locations.findIndex((item) => item.coords[0] == coordinates[0] && item.coords[1] == coordinates[1]);
  if(i != -1){
    return i;
  }
  else{
    return locations.findIndex((item) => item.coords[0] === 666 && item.coords[1] === 666);
  }

}

function getTrackInfo(time){
  const i = locations[locationIndex]["track"].findIndex((item) => item.src.endsWith(time + ".mp3"));
  if(i != -1){
    return [locations[locationIndex]["track"][i]["src"], locations[locationIndex]["track"][i]["bpm"]];
  }
  else{
    return [locations[locationIndex]["track"][0]["src"], locations[locationIndex]["track"][0]["bpm"]];
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
  if(!isSwitching && !audioArray[0].src.endsWith(time + ".mp3")){
    timeSelected = time;
    changeImageTime();
    const bpmOld = trackInfo[1];
    trackInfo = getTrackInfo(timeSelected);
    audioArray[1].src = "audio/" + trackInfo[0];
    audioArray[1].currentTime = (audioArray[0].currentTime * bpmOld) / trackInfo[1];
    if(isPlaying){
      audioArray[1].volume = 0;
      isSwitching = true;
      audioArray[1].play();
      $(audioArray[0]).animate({volume: 0}, 200);
      $(audioArray[1]).animate({volume: audioVolume}, 200, function() {
        audioArray[0].pause();
        activeTrack = 1 - activeTrack;
        isSwitching = false;
      });
    }else{
      activeTrack = 1 - activeTrack;
    }
  }
}

const filter = document.getElementById("filter");
function changeImageTime(){
  if(locations[locationIndex]["track"].length > 1){
    switch (timeSelected) {
      case "night":
          filter.style.backgroundColor = "rgb(58, 82, 157)";
        break;
      case "day":
      default:
        filter.style.backgroundColor = "";
        break;
    }
  }
  else{
    filter.style.backgroundColor = "";
  }
}

const buttonContainer = document.getElementsByClassName("button-container")[0];
generateTimeButtons();
function generateTimeButtons(){
  $(buttonContainer).empty();
  if(locations[locationIndex]["track"].length > 1){
    locations[locationIndex]["track"].forEach((item) => {
      const button = document.createElement("button");
      const time = item.src.split(/[_.]/)[1]
      button.textContent = time[0].toUpperCase() + time.slice(1);
      button.className = "time-button";
      button.addEventListener("click", function (){
        switchTrack(time);
      });
      buttonContainer.appendChild(button);
    });
  }

}
