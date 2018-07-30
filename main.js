//set default values
var daysPerYear = 14;
var lastDateChange = 1533081600000; //JS time adds three zeroes to UNIX time
var lastDateEpoch = 1104537600000;

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
	singleIRLTime = new Date((new Date(document.getElementById("singleDate").value)/1) + singleIRLTime*60000 + (new Date().getTimezoneOffset()*60000))/1; //create a date using selected time in milliseconds plus selected time converted to milliseconds plus timezone offset converted to milliseconds
	singleDisplay.innerHTML = getTimeOf(singleIRLTime).toGMTString();
}

setInterval(function(){setTime()}, 1);