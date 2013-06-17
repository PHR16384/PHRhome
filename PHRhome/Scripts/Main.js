$(document).ready(function () {
    //stuff to run once:
    $("#warnJS").remove();  //remove this item if JavaScript is enabled
    
    //alert(window.innerWidth + "px * " + window.innerHeight + "px.")
    
    //stuff to run repeatedly:
    setInterval(function () {
        getTime();
        checkViewSize();
    }, 143);
});


function getTime() {
    /*  http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript  */

    //store jQuery object-grabbers into vars starting with "$":
    var $Time = $("#timespan");
    
    var MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var Today = new Date();

    var YYYY = Today.getFullYear();
    var DD = Today.getUTCDate();
    var MM = Today.getUTCMonth(); //fyi: january is 0

    var hr = Today.getUTCHours();
    var min = Today.getUTCMinutes();
    var sec = Today.getUTCSeconds();

    if (DD < 10) { DD = '0' + DD }
    //if (MM < 10) { MM = '0' + MM }    //is an index int, no longer a string
    if (hr < 10) { hr = '0' + hr }
    if (min < 10) { min = '0' + min }
    if (sec < 10) { sec = '0' + sec }

    Today = YYYY + '/' + MONTH[MM] + '/' + DD + "  " + hr + ":" + min + ":" + sec + " UTC";

    $Time.html(Today);
}

function checkViewSize() {
    var W = window.innerWidth;
    var H = window.innerHeight;

    var $WarnScr = $("#warnScreen");

    $WarnScr.html(W + "px W * " + H + "px H");

    if (W < 1024 || H < 624) {
        $WarnScr.append("<br /><span class='Red'>The viewport may be too small to display this site properly.  Please resize the window, hide one or more browser toolbars, or increase your screen resolution.</span>");
    }
}


/// http://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

