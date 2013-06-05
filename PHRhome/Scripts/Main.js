$(document).ready(function () {
    //stuff to run once:
    $("#warnJS").remove();  //remove this item if JavaScript is enabled
    
    //alert(window.innerWidth + "px * " + window.innerHeight + "px.")
    
    //store jQuery object-grabbers into vars starting with "$":
    var $Time = $("#timespan");
    var $WarnScr = $("#warnScreen");
    
    //stuff to run repeatedly:
    setInterval(function () {
        getTime();
        checkViewSize();
    }, 143);
    
    
    function getTime() {
        /*  http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript  */

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
        
        $WarnScr.html( W + "px W * " + H + "px H" );
        
        if (W < 1000 || H < 600) {
            $WarnScr.append("<br /><span class='R'>The viewport may be too small to display this site properly.  Please resize the window, hide one or more browser toolbars, or increase your screen resolution.</span>");
        }
    }
    
});

