$(document).ready(function () {
    setInterval(getTime, 100);
});

function getTime(evt) {
    //http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
    
    var MONTH = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    var Today = new Date();
    
    var YYYY = Today.getFullYear();
    var DD = Today.getUTCDate();
    var MM = Today.getUTCMonth(); //fyi: january is 0
    
    var hr = Today.getUTCHours();
    var min = Today.getUTCMinutes();
    var sec = Today.getUTCSeconds();
    
    if (DD < 10) { DD = '0' + DD }
    //if (MM < 10) { MM = '0' + MM }    //is an int, no longer a string
    if (hr < 10) { hr = '0' + hr }
    if (min < 10) { min = '0' + min }
    if (sec < 10) { sec = '0' + sec }
    
    Today = YYYY + '/' + MONTH[MM] + '/' + DD + "  " + hr + ":" + min + ":" + sec + " UTC";
    
    $("#timespan").html( Today );
}
