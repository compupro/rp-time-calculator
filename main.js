//set values according to the URL parameters if it exists, using defaults if they don't
var pageUrl = new URLSearchParams(location.search);
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
	window.prompt("Copy the following link:", [location.protocol, "//", location.host, location.pathname].join('') + paramString);
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
    singleIRLTime *= 60000; //make it milliseconds
	var singleIRLOffset = document.getElementById("singleOffset").value; //get selected IRL timezone in hours
    singleIRLOffset *= 3600000; //make it milliseconds
    singleIRLTime -= singleIRLOffset; //subtract the offset from the time to make it UTC

    var singleIRLDate = document.getElementById("singleDate").value; //get the value of the date picker
    singleIRLDate = new Date(singleIRLDate)/1; //turn it into js time (milliseconds)
    var dateTime = new Date(singleIRLDate + singleIRLTime)/1;

	singleDisplay.innerHTML = getTimeOf(dateTime).toGMTString();
}

setInterval(function(){setTime()}, 1);