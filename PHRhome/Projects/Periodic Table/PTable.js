$(document).ready(function ()
{
    AddStyle();
    PTableCalc();
});


// these lines of code add the stylesheet to this page exclusively; I don't have to change anything in the _Layout page:
function AddStyle()
{
    // http://stackoverflow.com/questions/10665268/correct-way-to-include-css-after-head
    
    linkElement = document.createElement("link");   //create a new <link> node
    linkElement.rel = "stylesheet";
    linkElement.href = "./PTable.css";
    
    document.head.appendChild(linkElement);         //append the newly-created <link> to the <head>
}


function PTableCalc()
{
    /*
        IDEA:  Since the elements are grouped into blocks, append them into DOM blocks
    */

    var arcBlock = ["s", "p", "d", "f", "g"];
    var ar$Block = new Array(); //an array to be filled with DOM nodes
    var JPeriod = {
        1: 2,
        2: 8,
        3: 8,
        4: 18,
        5: 18,
        6: 32,
        7: 32,
        8: 50,
        9: 50
    };

    var arnBlock = new Array();
    var arnPeriod = new Array();
    var B = arcBlock.length;  //blocks
    var P = 9;  //periods
    var b, p;
    
    //calculate block widths:
    for (b = 0; b < B; b++) {
        arnBlock[b] = b * 4 + 2;    //2, 6, 10, 14, 18, ...
        ar$Block[b] = $("<div id=\"block-" + arcBlock[b] + "\"></div>");
        $("#PTable").appendTo();
    }
    
    //
}

