var c  =document.getElementById("canvas");
var ctx= c.getContext("2d");
var infoDOM = document.getElementById("info");
var game = new Game();




function mouseUp(e){

	var mouse = {x:0, y:0};
	mouse.x = e.x - c.offsetLeft - c.scrollLeft;
	mouse.y = e.y - c.offsetTop - c.scrollTop;
		//console.log(mouse.x);
		//console.log(mouse.y);
    infoDOM.innerHTML ="Calculating...";
	output(function(){game.mouseup(mouse);});



}
function output( callback){
	setTimeout(function (){


        callback();
	}, 1000);
}


c.addEventListener("mouseup", mouseUp);