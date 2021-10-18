let timeSelected, audio, audio2, trackInfo, timeoutUI, volumeLevel;

let mouseDown = false;
let isPlaying = false;
let isSwitching = false;
let activeTrack = 0;

timeSelected = "day";
audio = new Audio();
audio2 = new Audio();

audioVolume = 0.1
audio.volume = audio2.volume = audioVolume;
let locationIndex = checkLocation("Route 201");
trackInfo = getTrackInfo(timeSelected);

const timeSlider = document.getElementById("time-slider");
timeSlider.addEventListener("mouseup", function(){
  selectAudio()[0].currentTime = (timeSlider.value / 1000) * selectAudio()[0].duration;
  mouseDown = false;
});
timeSlider.addEventListener("mousedown", function (){
  mouseDown = true;
});
$("#volume-button").click(function(){
  if($(".volume-slider-container").css("visibility") == "visible"){
    $(".volume-slider-container").css("visibility", "hidden");
  }
  else{
    $(".volume-slider-container").css("visibility", "visible");
  }

});
$("#volume-slider").on('input', function (){
  volumeLevel = $(this).val() / 100;
  audio.volume = volumeLevel;
  audio2.volume = volumeLevel;
});
$(".play-button-selector").click(function (){
  musicController();
});

$(".content-container").mouseenter(function(){
  $(".play-button").css("opacity", "1");
  $(".control-container").css("opacity", "1");
  clearTimeout(timeoutUI);
});
$(".content-container").mouseleave(function(){
  timeoutUI = setTimeout(function(){
    $(".play-button").css("opacity", "0");
    $(".control-container").css("opacity", "0");
  }, 3000);
});

const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

Array.prototype.forEach.call(document.getElementsByClassName("nav-button"), function(element) {
  element.addEventListener("click", function(){
    if(checkBorder(element.id)){
      update(locations[locationIndex][element.id + "Border"]);
    }
  });
});

document.addEventListener('keydown', logKey);
function logKey(e){
  switch (e.target.tagName){
    //ADD EXCEPTIONS TO KEYBOARD INPUT BELOW
    case "INPUT": case "SELECT": case "TEXTAREA": return;
  }

  switch (e.key){
    case "w":
      if(checkBorder("up")){
        update(locations[locationIndex]["upBorder"]);
      }
      break;
    case "a":
      if(checkBorder("left")){
        update(locations[locationIndex]["leftBorder"]);
      }
      break;
    case "s":
      if(checkBorder("down")){
        update(locations[locationIndex]["downBorder"]);
      }
      break;
    case "d":
      if(checkBorder("right")){
        update(locations[locationIndex]["rightBorder"]);
      }
      break;
  }
}




audio.src = "audio/" + trackInfo[0];
const locationImage = document.getElementById("location-image");
const locationText = document.getElementById("location-text");

function update(place){
  locationIndex = checkLocation(place);
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
  if(checkBorder("right")){
    rightButton.style.visibility = "visible";
  }
  if(checkBorder("left")){
    leftButton.style.visibility = "visible";
  }
  if(checkBorder("up")){
    upButton.style.visibility = "visible";
  }
  if(checkBorder("down")){
    downButton.style.visibility = "visible";
  }
}
function checkBorder(dir){
  if(locations[locationIndex][dir + "Border"] === undefined){
    return false;
  }
  else{
    return true;
  }
}
function checkLocation(place){
  let i = locations.findIndex((item) => item.name == place);
  if(i != -1){
    return i;
  }
  else{
    return locations.findIndex((item) => item.name == "Mystery Zone");
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



let interval;

function musicController(args){
  if(args == "pause" || !selectAudio()[0].paused){
    selectAudio()[0].pause();
    isPlaying = false;
    clearInterval(interval);
    $(".play-button-selector").removeClass("fa-pause");
    $(".play-button-selector").addClass("fa-play");
  }
  else if(selectAudio()[0].paused){
    selectAudio()[0].play();
    isPlaying = true;
    interval = setInterval(updateSlider, 100);
    $(".play-button-selector").removeClass("fa-play");
    $(".play-button-selector").addClass("fa-pause");
  }
}

function updateSlider(){
  if(!mouseDown){
    timeSlider.value = (selectAudio()[0].currentTime / selectAudio()[0].duration) * 1000;
    if(selectAudio()[0].currentTime == selectAudio()[0].duration){
      musicController("pause");
    }
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
      $(audioArray[1]).animate({volume: volumeLevel}, 200, function() {
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
