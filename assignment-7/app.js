var clock = document.getElementById('clock');
var hours = document.getElementById('hours');
var min = document.getElementById('min');
var sec = document.getElementById('sec');
var amPm = document.getElementById('amPm');
var date = document.getElementById('date');
var days = document.getElementById('days');
var year = document.getElementById('year');
var month = document.getElementById('month');
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var dayNames = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];

//DIDGITAL CLOCK FUNCTION :
function getTime(){
    
    var d = new Date();
    
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var fullYear = d.getFullYear();
    var currentDay = d.getDay();
    // clock.innerHTML = h + ":" + m + ":" + s;  
    hours.innerHTML = h;
    min.innerHTML = m;
    sec.innerHTML = s;
    date.innerHTML = currentDate;
    month.innerHTML = monthNames[currentMonth];
    year.innerHTML = fullYear
    days.innerHTML = dayNames[currentDay];
    //condition (h,m,s):
    if(m<10){
        min.innerText = '0'+m;
    } 
    else{
        min.innerText = m;
    }

    if(h<10){
        hours.innerText = '0'+h;
    }
    else{
        hours.innerText = h;
    }

    if(s<10){
        sec.innerText = '0'+s
    }
    else{
        sec.innerText = s;
    }
    //AM OR PM :
    if(h == 0){
        amPm.innerText = 12 + "AM";
    
    }
    else if(h >=1 && h <=11){
        amPm.innerText = "AM";
    }
    else if(h == 12){
        amPm.innerText = 12 + 'PM';
    }
    else{
        h -= 12;
        amPm.innerText = 'PM';
    }
    // date or days :
    if(currentDate < 10){
        date.innerText = '0'+ currentDate;
    }
    else{
        date.innerText = currentDate;
    }
    if(currentDay < 10){
        days.innerText = '0'+ currentDay;
    }
    else{
        days.innerText = currentDay;
    }
}
setInterval(getTime , 1000);