//set default values
var daysPerYear = 30;
var lastDateChange = 1527811200000;
var lastDateEpoch = 1041379200000;

function setSettings(){
	daysPerYear = document.getElementById("daysPerYear").value;
	lastDateChange = new Date(document.getElementById("lastDateChange").value)/1; //the /1 turns it into a number
	lastDateEpoch = new Date(document.getElementById("lastDateEpoch").value)/1;
}

function getTimeOf(irlDate){	
	return new Date(Math.floor((365/daysPerYear)*((irlDate)-lastDateChange)+lastDateEpoch));
}

function setTime(){
	var display = document.getElementById("timeDisplay");
	var rpUnixTime = getTimeOf(Date.now());
	display.innerHTML = "The RP date and time is<br>" + rpUnixTime.toGMTString();
}

function getSingleRPTime(){
	var singleDisplay = document.getElementById("singleRPTimeDisplay");
	var singleIRLTime = document.getElementById("singleTime").value.split(":");
	singleIRLTime = parseInt(singleIRLTime[0]*60) + parseInt(singleIRLTime[1]); //get selected time in minutes
	singleIRLTime = new Date((new Date(document.getElementById("singleDate").value)/1) + singleIRLTime*60000)/1; //create a date using selected time in milliseconds plus selected time converted to milliseconds
	singleDisplay.innerHTML = getTimeOf(singleIRLTime).toGMTString();
}

setInterval(function(){setTime()}, 1);