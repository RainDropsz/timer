// https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project#introduction
// Count down 25 minutes of work
// Indicate it's break time
// Count down 5 minutes
// Start over again


//Global Variables
let myTimer;
let mode = 0;
let mySound = new sound("beep-01a.mp3");

//Functions
function countdown() {
  let timestr = document.getElementById("display").innerText;
  let mm = parseInt(timestr.slice(0,2));
  let ss = parseInt(timestr.slice(3,5));
  let mstr = "", sstr = "";

  if (timestr == "00:00") {
    if (mode == 0) {
      mm =  0; ss = 21; mode = 1;
      mySound.play();
    }
    else {
      mm = 20; ss = 01; mode = 0;
      mySound.play();
    }
    changeBgColor();
  }

  ss = ( ss + 60 - 1 ) % 60;
  if (ss == 59) { mm = mm - 1; }

  mstr = ("00" + mm).slice(-2);
  sstr = ("00" + ss).slice(-2);

  document.getElementById("display").innerHTML = mstr + ":" + sstr;
}

function clickPlay() {
  document.getElementById("play").removeEventListener("click", clickPlay);
  myTimer = setInterval(countdown, 1000);
}

function clickTest() {
  mode = 2;
  document.getElementById("play").removeEventListener("click", clickPlay);
  document.getElementById("reset").click();
  document.getElementById("display").innerHTML = "00:05";
  myTimer = setInterval(countdown, 1000);
}

function clickPause() {
  document.getElementById("play").addEventListener("click", clickPlay);
  clearInterval (myTimer);
}

function clickReset() {
  clearInterval( myTimer );
  if ( mode != 2) {
    document.getElementById("play").addEventListener("click", clickPlay);
    document.getElementById("display").innerHTML = "20:00";

  }

  mode = 0;
  changeBgColor();
}

function changeBgColor() {
  if (mode == 0 || mode == 2) {
    document.getElementById("display").style.backgroundColor = "transparent";  }
  else if (mode == 1) {
    document.getElementById("display").style.backgroundColor = "#ccddee";  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


//Event Listeners
document.getElementById("play").addEventListener("click", clickPlay);
document.getElementById("pause").addEventListener("click", clickPause);
document.getElementById("reset").addEventListener("click", clickReset);
document.getElementById("test").addEventListener("click", clickTest);
