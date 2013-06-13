var sStyle = "PTable.css";


$(document).ready(function ()
{
    AddStyle();
    PTableCalc();
});


// these lines of code add the stylesheet to this page exclusively; I don't have to change anything in the _Layout page:
function AddStyle()
{
    // http://stackoverflow.com/questions/10665268/correct-way-to-include-css-after-head
    /*
    linkElement = document.createElement("link");   //create a new <link> node
    linkElement.rel = "stylesheet";
    linkElement.href = "./PTable.css";
    
    document.head.appendChild(linkElement);         //append the newly-created <link> to the <head>
    */

    // The jQuery way:
    // http://rickardnilsson.net/post/2008/08/02/Applying-stylesheets-dynamically-with-jQuery.aspx

    $('head').append('<link rel="stylesheet" type="text/css" href="' + sStyle + '" />');
}


function PTableCalc()
{
    /*
        IDEA:  Since the elements are grouped into blocks, append them as DOM blocks
    */
    
    var $Elem = $("#testElem");

    var arcBlock = ["s", "p", "d", "f", "g"];
    var ar$Block = new Array(); //an array to be filled with PT blocks
    var ar$Elem = new Array();  //to be filled with the Elements
    
    var arnBlock = new Array();
    var arnPeriod = new Array();
    var B = arcBlock.length;  //blocks
    var P = 7;  //periods
    var b, p, x;
    var str;
    
    //calculate block widths:
    for (b = 0; b < B; b++) {
        arnBlock[b] = b * 4 + 2;    //2, 6, 10, 14, 18, ...

        ar$Block[b] = $("<div id='block-" + arcBlock[b] + "'></div>");
        ar$Block[b].width( arnBlock[b] * 84 );
        ar$Block[b].appendTo("#PTable");
    }

    //set block positions:
    $("#block-s")
        .css({ "left": 0, "top": 88 * 1 })
    ;
    $("#block-p")
        .css({ "left": 84 * 12, "top": 88 * 1 })
    ;
    $("#block-d")
        .css({ "left": 84 * 2, "top": 88 * 3 })
    ;
    $("#block-f")
        .css({ "left": 84 * 2, "top": 88 * 7 + 16 })
    ;

    //set table width/height:
    $("#PTable")
        .width(84 * 18)
        .height(88 * 10)
    ;


    //loop through legend labels:
    $("#Legend").children()
        .each(function (i) {
            $(this)
                .prepend("<h4>" + $(this).prop("id") + "</h4>") //create a header from the node's id
                .find("p").each(function (j) {
                    $(this).html( $(this).prop("className") );  //similarly, copy the <p>'s id into its innerHTML
                })
            ;
        })
    ;

    /*
    var nStyleIndex = -1;
    var sheet;
    var arsCSS = new Array();

    // use a loop to specifically grab the DOM for "PTable.css":
    for (x = 0; x < document.styleSheets.length; x++) {
        if ( document.styleSheets[x].href.indexOf(sStyle) >= 0 ) {  //does this stylesheet's href contain the string "PTable.css"?
            sheet = document.styleSheets[x];
            //nStyleIndex = x;
            break;
        }
    }
    */

    //$Elem.height("80");
    //$Elem.find(".weight").html($Elem.height());
    $Elem.detach();
    
    //NOTE: getJSON is an async, and has no return values; also, run it last
    $.getJSON("./elements.json")
        .done(GotPData)
        .fail(GotPError)
    ;
    

    //run when JSON request succeeds:

    function GotPData(data, textStatus, jqXHR) {
        //$("#loadJSON").html("Successfully imported JSON.");
        $("#loadJSON").remove();
        
        var PTable = data.Elements;
        var e, E = PTable.length;
        
        for (e = 0; e < E; e++) {
            ar$Elem[e] = $Elem.clone(); //make a duplicate of template "Test Element" DOM node

            //apply the JSON data:
            ar$Elem[e]
                .attr("id", PTable[e].symbol)   //change id to [Element Symbol]
                .addClass( PTable[e].occurrence )  //change border colour based on "Occurrence" property
            ;

            ar$Elem[e].find(".name")
                .html(PTable[e].name)
            ;
            ar$Elem[e].find(".num")
                .html(PTable[e].atomic_number)
                .addClass( whichPhase(PTable[e]) )
            ;
            ar$Elem[e].find(".symbol")
                .html(PTable[e].symbol)
                .addClass(PTable[e].classes)
            ;
            ar$Elem[e].find(".weight")
                .html(PTable[e].atomic_weight)
            ;
            //

            //ar$Elem[e].appendTo("#PTable");
            ar$Elem[e].appendTo("#block-" + PTable[e].block);
        }


        //reposition Helium & Hydrogen:

        //var $He = $("#He").clone();
        //$("#He").first().css("visibility","hidden");

        $("#He")
            .prependTo("#PTable")
            .css({ "left": 84 * 17, "top": 0 })
        ;
        $("#H").prependTo("#PTable");   //positions to {top:0,left:0} due to CSS defs
    }
    
}

/*
function GetPData() {
    return $.getJSON("./elements.json", function (data) { return data; })
        //.done(GotPData)
        //.fail(GotPError)
        //.always(function (jqXHR, textStatus, errorThrown) { $("#loadJSON").html( textStatus ) })
    ;
}
*/

function GotPError(jqXHR, textStatus, errorThrown) {
    var str = "Failure: " + errorThrown;
    $("#loadJSON").html(str);
    //return str;
}


//"whichPhase": calculates the element's matter phase (solid, liquid, gas) @ STP
function whichPhase(JElem) {
    if (JElem["boiling_point K"] == "n/a" || JElem["melting_point K"] == "n/a") {
        return; //if boiling/melting points are unknown, return nothing
    }

    if (JElem["boiling_point K"] < 273) {
        return "Gas";
    }
    else if (JElem["melting_point K"] < 273) {
        return "Liquid";
    }
    else {
        return "Solid";
    }
}

