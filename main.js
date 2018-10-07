//set values according to the URL parameters if it exists, using defaults if they don't
var pageUrl = new URLSearchParams(window.location.search);
var daysPerYear = pageUrl.get("daysperyear") ? pageUrl.get("daysperyear")/1 : 14;
var lastDateChange = pageUrl.get("lastdatechange") ? pageUrl.get("lastdatechange")/1 : 1533081600000; //JS time adds three zeroes to UNIX time
var lastDateEpoch = pageUrl.get("lastdateepoch") ? pageUrl.get("lastdateepoch")/1 : 1104537600000;

//change the HTML elements to reflect the values
document.getElementById("daysPerYear").value = daysPerYear;
document.getElementById("lastDateChange").value = new Date(lastDateChange).toISOString().split("T")[0];
document.getElementById("lastDateEpoch").value = new Date(lastDateEpoch).toISOString().split("T")[0];

function setSettings(){
	daysPerYear = document.getElementById("daysPerYear").value;
	lastDateChange = new Date(document.getElementById("lastDateChange").value)/1; //the /1 turns it into a number
	lastDateEpoch = new Date(document.getElementById("lastDateEpoch").value)/1;
}

function exportSettings(){
	var paramString = "?";
	paramString += "daysperyear=" + daysPerYear;
	paramString += "&lastdatechange=" + lastDateChange;
	paramString += "&lastdateepoch=" + lastDateEpoch;
	window.prompt("Copy the following link:", window.location.pathname + paramString);
}

function getTimeOf(irlDate){	
	return new Date(Math.floor((365/daysPerYear)*((irlDate)-lastDateChange)+lastDateEpoch));
}

function setTime(){
	var display = document.getElementById("timeDisplay");
	var rpJSTime = getTimeOf(Date.now());
	display.innerHTML = "The RP date and time is<br>" + rpJSTime.toGMTString();
}

function getSingleRPTime(){
	var singleDisplay = document.getElementById("singleRPTimeDisplay");
	var singleIRLTime = document.getElementById("singleTime").value.split(":");
	singleIRLTime = parseInt(singleIRLTime[0]*60) + parseInt(singleIRLTime[1]); //get selected IRL time in minutes
	var singleIRLOffset = document.getElementById("singleOffset").value*3600000; //get selected IRL timezone offset and convert to milliseconds
	
	singleIRLTime = new Date((new Date(document.getElementById("singleDate").value)/1) + singleIRLTime*60000 + singleIRLOffset)/1; //create a date using selected time in milliseconds plus selected time converted to milliseconds plus timezone offset in milliseconds
	singleDisplay.innerHTML = getTimeOf(singleIRLTime).toGMTString();
}

setInterval(function(){setTime()}, 1);