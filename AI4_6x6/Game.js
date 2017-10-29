
var c  =document.getElementById("canvas");
var ctx= c.getContext("2d");
var infoDOM = document.getElementById("info");
var Game = function(old){
	CreateGrid();
	this.state = new State();
	this.state.board = ["E","E","E","E","E","E",
       						"E","E","E","E","E","E",
       						"E","E","E","E","E","E",
       						"E","E","E","E","E","E",
       						"E","E","E","E","E","E",
       						"E","E","E","E","E","E"];
    this.state.turn = "X";						

	if(typeof old !== "undefined") {
       // if the state is constructed using a copy of another state
    	this.state = old.state;

    }
	this.mouseup = function(mouse){

		var gridPos = positionToGrid(mouse);
		if (this.isEmpty(gridPos) && !this.state.isEnd()){

            this.drawChar(gridPos);
			this.completeTurn(gridPos);
		}
	}   
	this.isEmpty = function(gridPos){
	 	return (this.state.board[gridPos] == "E");
	}
	this.completeTurn = function(gridPos){
		console.log("-----");

		var newState = clone(this.state);
		newState.board[gridPos] = newState.turn;

		newState.nextTurn();
		newState.incrementMoveCounter();
		newState.isEnd();
		newState.lastMoveFun(gridPos);
		this.state = newState;

		//	var newStateX = clone(this.state);
		//	var AIPlayerX = new AI(newStateX, false);
		//	console.log("X moves to : " + AIPlayerX.value.m + " with value : " + AIPlayerX.value.val);
		//	newStateX.board[AIPlayerX.value.m] = newStateX.turn;
		
			
		//	this.drawChar(AIPlayerX.value.m);

		//	newStateX.nextTurn();
		//	newStateX.isEnd();
		//	this.state = newStateX;
		
			console.log("------------------");

		if (this.state.turn == "O" && !this.state.isEnd()){

			var newState = clone(this.state);
			var AIPlayer = new AI(newState, true);
			console.log("AI moves to : " + AIPlayer.value.m + " with value : " + AIPlayer.value.val);
			newState.board[AIPlayer.value.m] = newState.turn;
		
			
			this.drawChar(AIPlayer.value.m);
			newState.moves.push(AIPlayer.value.m);
			newState.nextTurn();
			newState.incrementMoveCounter();
			newState.isEnd();
            infoDOM.innerHTML ="MiniMax TicTacToe With AlphaBeta Pruning (Turns may take 10 seconds)";
			this.state = newState;
		
		}
		if (this.state.isEnd()){
			this.highlightWinner(this.state.winningFour);
		}

	}
	this.highlightWinner = function (win){
		ctx.font = "40px Arial";
		ctx.fillStyle = "yellow";
		var fontsize =20;
		var turn = "";
		if (this.state.turn === "X"){
			turn = "O";
		}else{
			turn = "X";
		}
		for (var z = 0 ; z < win.length ; z ++){
			var pos = gridToPosition(win[z]);
			ctx.fillText(turn,(c.width / 6) * pos.x + c.width / 12 - fontsize ,(c.height / 6) * pos.y + fontsize + (c.height / 12));
		}
	}
	this.drawChar = function (gridPos){

		ctx.font="40px Arial";
		ctx.fillStyle = "black";
		fontsize = 20;
		
		var pos = gridToPosition(gridPos);
		if (this.state.turn == "X"){
            ctx.fillStyle = 'blue';
		}else{
            ctx.fillStyle = 'red';
		}
		ctx.fillText(this.state.turn ,(c.width / 6) * pos.x + c.width / 12 - fontsize ,(c.height / 6) * pos.y + fontsize + (c.height / 12));
							
	}

}
function gridToPosition(gridPos){

	var pos = { x: 0, y :0};
	pos.x = gridPos % 6;
	pos.y = Math.floor(gridPos / 6);
	
	return pos;

}
function positionToGrid(mouse){
	var pos = {x:0, y:0};
	var cellWidth = c.width / 6;
	var cellHeight = c.height / 6;
	if (mouse.x < cellWidth){
		pos.x =0;
	}else if (mouse.x < 2 * cellWidth){
		pos.x = 1;
	}else if (mouse.x < 3 * cellWidth){
		pos.x = 2;
	}else if (mouse.x < 4 * cellWidth){
		pos.x = 3;
	}else if (mouse.x < 5 * cellWidth){
		pos.x = 4;
	}else{
		pos.x = 5;
	}
	if (mouse.y < cellHeight){
		pos.y =0;
	}else if (mouse.y < 2 * cellHeight){
		pos.y = 1;
	}else if (mouse.y < 3 * cellHeight){
		pos.y = 2;
	}else if (mouse.y < 4 * cellHeight){
		pos.y = 3;
	}else if (mouse.y < 5 * cellHeight){
		pos.y = 4;
	}else {
		pos.y = 5;
	}
	return pos.x + (6 * pos.y);
	
		
}
function CreateGrid(){ //gets canvas and ctx
	ctx.strokeStyle = "999191" //the grey colour for the grid
	
	var rowSpacing = c.height / 6; //the amount of space each row has
	var columnSpacing = c.width / 6; //amount of space each column has
	for (var x = 1; x < 6;x++){ //rows
		ctx.moveTo(0, rowSpacing * x); //moves to the location according to the ratio of spacing
		ctx.lineTo(canvas.width, rowSpacing * x)
		ctx.stroke();				
	}
	for (var x = 1; x < 6 ;x++){ //columns
		ctx.moveTo( columnSpacing * x ,0); //moves to the location according to the ratio of spacing
		ctx.lineTo( columnSpacing * x, canvas.height)
		ctx.stroke();				
	}	
}
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}