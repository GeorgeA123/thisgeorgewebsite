var c  =document.getElementById("canvas");
var ctx= c.getContext("2d");
var gridEntity = [];
var mouse = {
x: 0,
y: 0
}
var keys = [];
var mouseDownBoolean = false;
var pause = false;
var leftMouse = false;
var speed= 500;
var clear = false;
function initialization(){

    c.width =  $(window).width() * 0.7; // so it does not mess up;
    c.height = $(window).height() * 0.5; //takes from heading;
	gridEntity[1] = new grid(c.width, c.height);
	gridEntity[0] = new grid(c.width, c.height);
	gridEntity[0].assignRandomBoolean();
	gridEntity[0].cells[1][1] = true;
	gridEntity[0].cells[1][2]= true;
	gridEntity[0].cells[1][3]= true;

	setInterval(function(){timer();}, 500/1);
	setInterval(function(){mouseTimer();}, 50/1);
}
function timer(){
	ctx.clearRect(0,0,c.width, c.height);

	gridEntity[0].drawGrid();
	gridEntity[0].drawBoolean();

	console.log(clear)	
	if (pause == false){
			gridEntity[0].applyRules();
			if (clear == true){
				gridEntity[1] = $.extend( {}, gridEntity[2])
				clear=false;
				ctx.clearRect(0,0,c.width, c.height);	
				gridEntity[0].drawGrid();
				pause = true;
			}
		gridEntity[0] = $.extend( {}, gridEntity[1])
		gridEntity[1] = new grid(c.width, c.height)	
	}
	
}
function mouseTimer(){
	if (mouseDownBoolean == true){
		
		var cellNumberX = Math.floor(mouse.x /gridEntity[0].cellWidth )
	 	var cellNumberY = Math.floor(mouse.y / gridEntity[0].cellHeight);
	
		if (leftMouse == true){
			gridEntity[0].cells[cellNumberX][cellNumberY] = true;}
		else{
			gridEntity[0].cells[cellNumberX][cellNumberY] = false;}
		gridEntity[0].drawBoolean();
		
	}
}
function point(x,y){
	this.x = x;
	this.y = y;
}
function neighbours(x,y){
	var neighbours= 0;
	if (gridEntity[0].cells[x-1][y+1] == true && gridEntity[0].cells[x-1][y+1] ===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x][y+1] == true && gridEntity[0].cells[x][y+1]  ===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x+1][y+1] == true && gridEntity[0].cells[x+1][y+1]  ===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x-1][y] == true && gridEntity[0].cells[x-1][y] ===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x+1][y] == true && gridEntity[0].cells[x+1][y] ===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x-1][y-1] == true && gridEntity[0].cells[x-1][y-1]===! undefined ) neighbours ++;
	if (gridEntity[0].cells[x][y-1] == true && gridEntity[0].cells[x][y-1] ===! undefined  ) neighbours ++;
	if (gridEntity[0].cells[x+1][y-1] == true && gridEntity[0].cells[x+1][y-1]  ===! undefined ) neighbours ++;	
	rules(x,y,neighbours);
}
function rules(x,y,neighbours){
	if (neighbours < 2){
		gridEntity[1].cells[x][y]	= false;
	}	
	if (gridEntity[0].cells[x][y]	== true){
		if (neighbours == 3 || neighbours == 2 ){
			
			gridEntity[1].cells[x][y]	= true;
		}
	}
	if (neighbours > 3){
		gridEntity[1].cells[x][y]	= false;
	}
	if (neighbours == 3){
	
		gridEntity[1].cells[x][y]	= true;
	}
}
function clearAllCells(){
	
	clear= true;	
	gridEntity[2] = new grid(c.width, c.height)	
	for (var y = -1; y < this.numberOfCells + 1; y++){
		for (var x = -1; x < this.numberOfCells + 1; x++){
			gridEntity[2].cells[x][y] = false; 
		}
	}	
}
function mousedown(e) {
	
	if (event.which == 1){
		leftMouse = true;	
	}else{
		leftMouse = false;
	}
	mouseDownBoolean = true;

}
function mouseup(e) {
	mouseDownBoolean = false;
}
function mousemove(e) {
	mouse.x = e.x - c.offsetLeft - c.scrollLeft;
	mouse.y = e.y - c.offsetTop - c.scrollTop;
	if (mouse.x < 0) mouseDownBoolean = false;
	if (mouse.y < 0)mouseDownBoolean = false;
	if (mouse.x > c.width)mouseDownBoolean = false;
	if (mouse.y > c.height)mouseDownBoolean = false;
	
}
function keydown(e){
	keys[e.keyCode] = true;
	if (keys[32]){
		pause = ! pause;
	}
	if (keys[67]){
		
		clearAllCells();
	}
}
function keyup(e){
	keys[e.keyCode] = false;
	
}

c.addEventListener("mousemove", mousemove);
c.addEventListener("mousedown", mousedown);
c.addEventListener("mouseup", mouseup);
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
initialization();
