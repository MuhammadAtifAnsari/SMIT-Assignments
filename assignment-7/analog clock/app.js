var userName = prompt("Enter your name!").toUpperCase();
var userGreet = "WELCOME " + userName + " !";
var greet = document.getElementById("greet");
greet.innerHTML = userGreet;

var hours = document.getElementById("hours");
var min = document.getElementById("min");
var sec = document.getElementById("sec");

function getTime() {
    var d = new Date();
    var hr = d.getHours() * 30 ;  // + Math.round(minutes / 12)
    var minutes = d.getMinutes() * 6;
    var seconds = d.getSeconds() * 6;
    hours.style.transform = "rotate(" + hr + "deg)";
    min.style.transform = "rotate(" + minutes + "deg)";
    sec.style.transform = "rotate(" + seconds + "deg)";
} 
setInterval(getTime,1000);