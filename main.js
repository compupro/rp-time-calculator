//set default values
var daysPerYear = 30;
var lastDateChange = 1527811200;
var lastDateEpoch = 1041379200;

function setSettings(){
	daysPerYear = document.getElementById("daysPerYear").value;
	lastDateChange = new Date(document.getElementById("lastDateChange").value)/1000;
	lastDateEpoch = new Date(document.getElementById("lastDateEpoch").value)/1000;
}

function setTime(){
	var display = document.getElementById("timeDisplay");
	var rpUnixTime = new Date(Math.floor((365/daysPerYear)*((Date.now()/1000)-lastDateChange)+lastDateEpoch)*1000);
	display.innerHTML = "The RP date and time is<br>" + rpUnixTime.toGMTString();
}

setInterval(function(){setTime()}, 1);