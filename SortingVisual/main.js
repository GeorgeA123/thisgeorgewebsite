 var c  =document.getElementById("canvas");
var ctx= c.getContext("2d");
var sequences = [];
var mouse = {
    x: 0,
    y: 0
}
function setUp(){
	setUpCanvas();
	randomNumberSequence = createRandomSequence();
	randomColorSequence = randomColor();
	sequences[0] = new sequenceClass($.extend( {}, randomNumberSequence ),  $.extend( {}, randomColorSequence), "bubble", 0 );
	sequences[1] = new sequenceClass($.extend( {}, randomNumberSequence),  $.extend( {}, randomColorSequence), "quick", 1);
	sequences[2] = new sequenceClass($.extend( {}, randomNumberSequence),  $.extend( {}, randomColorSequence), "cocktail",2);
	splitCanvas();
	drawSortNames();
	startTimer();	
}
function startTimer(){
	setInterval(function(){timer();}, 250/1);
}
function timer(){
	if (mouse.x < c.width / 3){ //bubble sort
		sequences[0].bubbleSort();
		sequences[0].counter ++;
		if (sequences[0].counter == 9){
			sequences[0].counter = 0;
		}
	}else if(mouse.x < (c.width / 3) *2){ // quick sort
		sequences[1].selectSort();
		sequences[1].counter ++;
		
		if (sequences[1].counter == 9){
			sequences[1].counter = sequences[1].valuesCompleted ;
			
		}
	}else{ //cocktail sort
		sequences[2].cocktailSort();
		if (sequences[2].swapped == false){
			sequences[2].counter +=1;
		}else{
			sequences[2].counter -=1;
		}
		if (sequences[2].counter == 8 || sequences[2].counter == 0){
			sequences[2].swapped = ! sequences[2].swapped;
		}
	}
	drawSequencesAndNames()
}
function drawSequencesAndNames(){
	ctx.clearRect(0,0,c.width,c.height);
	splitCanvas();
	drawSortNames();
	sequences[0].draw();
	sequences[1].draw();
	sequences[2].draw();
}
function drawSortNames(){
    var ctx = c.getContext("2d");
    ctx.textAlign="center"; 
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Bubble Sort",  (c.width / 6), 25);
    ctx.fillText("Selection Sort",  c.width / 3 + (c.width / 6), 25);
    ctx.fillText("Cocktail Sort ", 2 * c.width / 3 +  (c.width / 6), 25);
}
function setUpCanvas(){
	var width =  $(window).width() * 0.9; // so it does not mess up;
    var height = $(window).height() * 0.7; //takes from heading;
	c.width = width;
	c.height = height;
}
function splitCanvas(){
    newWidth = c.width / 3
    ctx.strokeStyle = "white";
    drawSplitCanvas(ctx, newWidth,c)
    drawSplitCanvas(ctx, newWidth * 2,c)
    drawSplitCanvas(ctx, newWidth * 3,c)
}
function drawSplitCanvas(ctx, width,c){
    ctx.beginPath();
    ctx.moveTo(width,0);
    ctx.lineTo(width,c.height);
    ctx.stroke();
}
function createRandomSequence(){
    var seq = new Array();
    var sameValues;
    for (var x = 0; x < 9; x++){
        sameValues = true;
        while (sameValues == true){
            seq[x] = Math.floor((Math.random() * 9) + 1);   
            sameValues = isSameValue(seq);    
        }
    }
    return seq;
}
function isSameValue(seq){
    num1 = seq[seq.length - 1];
    if (seq.length != 1){
        for (var y = 0; y < seq.length - 1; y++){
            if (num1 == seq[y]){
                return true;
            }
        }
    }
    return false;
}
function randomColor(){
    var individualNumber;
	var hexSequence = new Array();
	for (var y = 0; y < 9; y++){
		hexSequence[y] = "#";
		for (var x = 0; x < 6;x++){
			individualNumber = Math.floor((Math.random() * 15) + 1);
			if (individualNumber == 10) individualNumber ="A";
			if (individualNumber == 11) individualNumber ="B";
			if (individualNumber == 12) individualNumber ="C";
			if (individualNumber == 13) individualNumber ="D";
			if (individualNumber == 14) individualNumber ="E";
			if (individualNumber == 15) individualNumber ="F";
			hexSequence[y] += individualNumber;
		}
	}
    return hexSequence;
}
canvas.onmousemove = function (event) { // this  object refers to canvas object  
    mouse = {
        x: event.pageX - this.offsetLeft,
        x: event.pageX - this.offsetLeft,
        y: event.pageY - this.offsetTop
    }
}
setUp();