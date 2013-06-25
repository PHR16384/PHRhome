var sStyle = "PTable.css";

// Set global Element W/H constants:
var ELEM_H = 88;
var ELEM_W = 84;


$(document).ready(function ()
{
    AddStyle();
    BuildPTable();
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


function BuildPTable()
{
    /*
        IDEA:  Since the elements are grouped into Blocks, append them as <div>s.  Then I can position them wherever I want
    */
    
    var $Elem = $("#testElem");

    var arcBlock = ["S", "P", "D", "F", "G"];
    var ar$Block = new Array(); //an array to be filled with PT blocks
    var ar$Elem = new Array();  //to be filled with the Elements
    
    var arnBlock = new Array();
    var arnPeriod = new Array();
    var B = arcBlock.length;  //blocks
    var P = 7;  //periods
    var b, p, x;
    var str;
    
    //calculate Block widths:
    for (b = 0; b < B; b++) {
        arnBlock[b] = b * 4 + 2;    //2, 6, 10, 14, 18, ...

        ar$Block[b] = $("<div id='Block-" + arcBlock[b] + "'></div>");
        ar$Block[b].width( arnBlock[b] * ELEM_W );
        ar$Block[b].appendTo("#PTable");
    }

    //set Block positions:
    $("#Block-S")
        .css({ "left": ELEM_W * 0, "top": ELEM_H * 1 })
    ;
    $("#Block-P")
        .css({ "left": ELEM_W * 12, "top": ELEM_H * 1 })
    ;
    $("#Block-D")
        .css({ "left": ELEM_W * 2, "top": ELEM_H * 3 })
    ;
    $("#Block-F")
        .css({ "left": ELEM_W * 2, "top": ELEM_H * 7 + 16 })
    ;

    //set table width/height/etc.:
    $("#PTable")
        .width(ELEM_W * 18)
        .height(ELEM_H * 10)
        /*
        // doesn't help for right edge w/ visible h-scrollbar:
        .closest("section")
            .css({ "padding-left": "16px", "padding-right": "16px" })
        */
    ;


    //loop through legend labels:
    $("#Legend").find("div")
        .each(function (i) {
            $(this)
                .prepend("<h4>" + $(this).prop("id") + "</h4>") //create a header from the <div> id
                .find("p").each(function (j) {
                    str = $(this).prop("className");
                    $(this).html(str);    //similarly, copy each <p>'s CSS class into its innerHTML
                    if (str != "Unknown") {
                        //$(this).on("click", { "URL": str }, openWiki);   //open the name of the class in Wikipedia
                    }
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
            ar$Elem[e].appendTo("#Block-" + PTable[e].block);
        }


        //reposition Helium & Hydrogen:

        //var $He = $("#He").clone();
        //$("#He").first().css("visibility","hidden");

        $("#He")
            .prependTo("#PTable")
            .css({ "left": ELEM_W * 17, "top": ELEM_H * 0 })
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
        return "Unknown_Phase"; //if boiling/melting points are unknown, return nothing
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


function openWiki(event) {
    //event.stopPropogation();
    window.open("http://en.wikipedia.org/wiki/" + event.data.URL, "_self");
}

