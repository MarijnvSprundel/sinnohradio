let audioSource, oldAudio, newAudio, audioVolume, audio, audio2;
const playButton = document.getElementById("play-button");
let isPlaying = false;
let isSwitching = false;
audio = new Audio();
audio2 = new Audio();
audio.src = "audio/canalavecityday.mp3";
audioVolume = 0.1
audio.volume = audio2.volume = audioVolume;

function playMusic(){
  if(audio.paused && audio2.paused){
    audio.play();
    isPlaying = true;
    playButton.textContent = "Pause";
  }
  else{
    if(!audio2.paused){
      audio.src = audio2.src;
      audio.currentTime = audio2.currentTime;
      audio2.pause();
    }
    else{
      audio.pause();
    }
    isPlaying = false;
    playButton.textContent = "Play";
  }
}

function switchTrack(time){
  if(!isSwitching){
    if(!audio.paused || audio.paused && audio2.paused){
      oldAudio = audio;
      newAudio = audio2;
    }
    else{
      oldAudio = audio2;
      newAudio = audio;
    }
    audioSource = oldAudio.src.replace(".mp3", "");
    if(!audioSource.endsWith(time)){
      audioSource = audioSource.replace(/day|night/g, "");
      if(isPlaying){
        isSwitching = true;
        newAudio.src = audioSource + time + ".mp3";
        newAudio.currentTime = oldAudio.currentTime;
        newAudio.volume = 0;
        newAudio.play();
        $(oldAudio).animate({volume: 0}, 1000);
        $(newAudio).animate({volume: audioVolume}, 1000, function() {
          oldAudio.pause();
          isSwitching = false;
        });
      }else{
        audio.src = audioSource + time + ".mp3";
      }
    }
  }
  else{
    console.log("cant switch while switching");
  }
}
