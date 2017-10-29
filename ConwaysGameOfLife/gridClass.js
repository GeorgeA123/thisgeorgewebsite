
function grid(width, height){
	this.numberOfCells = 50; //the number of cells in y or x direction
	this.cells = new Array();
	for (var x = -1; x < this.numberOfCells+ 1; x++){ // so that grid[-1][-1] does not create error
		this.cells[x] = new Array();
	}
	this.cellWidth = width / this.numberOfCells;
	this.cellHeight = height / this.numberOfCells;
}
grid.prototype.assignRandomBoolean = function(){
	for (var y = 0; y < this.numberOfCells; y++){
		for (var x = 0; x < this.numberOfCells; x++){
			var randomNumber = Math.random();
			if (randomNumber > 0.9)this.cells[y][x] = true;
			else this.cells[y][x] = false;
		}
	}
}
grid.prototype.drawBoolean = function(){
	for (var y = 0; y < this.numberOfCells; y++){
		for (var x = 0; x < this.numberOfCells; x++){
			if (this.cells[x][y] == true){
				ctx.fillStyle = "white";
				ctx.fillRect(x * this.cellWidth,y*this.cellHeight,this.cellWidth ,this.cellHeight );
			}
		}
	}
}
grid.prototype.drawGrid = function(){
	for (var x = 1; x < this.numberOfCells;x++){
		this.drawLine(new point(x * this.cellWidth, 0 ),new point(x * this.cellWidth, c.height));
		this.drawLine(new point( 0,x * this.cellHeight ),new point( c.width,x * this.cellHeight));
	}	
}
grid.prototype.drawLine = function(startPoint, endPoint){
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(startPoint.x,startPoint.y);
	ctx.lineTo(endPoint.x,endPoint.y);
	ctx.stroke();
}
grid.prototype.applyRules = function(){
	for (var y = 0; y < this.numberOfCells; y++){
		for (var x = 0; x < this.numberOfCells; x++){
				neighbours(x,y)
		}
	}
	
}


