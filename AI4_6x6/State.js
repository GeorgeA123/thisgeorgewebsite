

/*
	|0|1|3|
	|3|5|6|
	|6|7|8|
	
	|0 |1 |3 |3 |5 |
	|6 |6 |7 |8 |9 |
	|10|11|13|13|15|
	|16|16|17|18|19|
	|30|31|33|33|35|

	|0 |1 |2 |3 |5 |5 |
	|6 |7 |8 |9 |10|11|
	|12|13|14|15|16|17|
	|18|19|20|21|22|23|
	|24|25|26|27|28|29|
	|30|31|32|33|34|35|

*/
var listOfTopRightDia = [30, 31,32,24,25,26,18,19,20];
var listOfTopLeftDia = [35,34,33,29,28,27,23,22,21];
var listOfTopRightThree = [12,13,14,15,18,19,20,21,24,25,26,27,30,31,32,33];
var listOfTopLeftThree =  [14,15,16,17,21,21,22,23,26,27,28,29,32,33,34,35];
var centerSquares = [14,15,20,21];

var State = function(old){
	this.moves = [];
	this.moveCounter =0;
	this.turn =""; // X or O
	this.board  = [];
	this.result = "";
	this.heuristicScore = 0;
	this.winningFour = [];
	if(typeof old !== "undefined") {
       // if the state is constructed using a copy of another state
       var len = old.board.length;
       this.board = new Array(len);
       for(var itr = 0 ; itr < len ; itr++) {
           this.board[itr] = old.board[itr];
       }
       this.result = old.result;
       this.turn = old.turn;
       this.moveCounter = old.moveCounter;
       this.heuristicScore = old.heuristicScore;
       this.moves = old.moves;
    }


   	this.nextTurn = function(){
   		if (this.turn === "X"){
   			this.turn = "O";
   		}else{
   			this.turn = "X";
   		}

   	}

   	this.isEnd = function(){
   		//check rows
   		var b = this.board;
   			
   		for (var x = 0 ; x < 6; x ++){
   			
   			for (var y = 0; y < 3; y++){
   				var startPos = x * 6 + y;
	   			if (b[startPos] != "E" && (b[startPos] === b[startPos + 1] && b[startPos] === 	
	   					 b[startPos + 2] && b[startPos] === b[startPos + 3])){

	   				this.result = b[startPos] + " won";
	   				this.winningFour.push(startPos, startPos +1, startPos +2, startPos +3);
	   				 
	   				return true;

	   			}
	   		}

   		}
   		//check columns
   		for (var x = 0 ; x < 6; x ++){
   			for (var y = 0; y < 3; y++){
	   			var startPos = x + 6 * y;
	   			if (b[startPos] != "E" && b[startPos] === b[startPos + 6] && b[startPos] ===
	   					 b[startPos + 12] && b[startPos] === b[startPos + 18]){
	   				this.result = b[startPos] + " won";
	   				this.winningFour.push(startPos, startPos +6, startPos +12, startPos +18);
	   				return true;

	   			}
   			}

   		}   
   		//diagonals
   		for (var z = 0; z < listOfTopLeftDia.length; z++){
   		
   			x = listOfTopLeftDia[z];
   			if (this.board[x] != "E" && this.board[x] === this.board[x-7] && this.board[x - 14] === this.board[x] && this.board[x - 21] === this.board[x]){
   				this.result = b[x] + " won";
   				this.winningFour.push(x, x -7, x -14, x-21);
   				return true;
   			}
   		}
   		for (var z = 0; z < listOfTopRightDia.length; z++){
   			x = listOfTopRightDia[z];
   			if (this.board[x] != "E" && this.board[x] === this.board[x-5] && this.board[x - 10] === this.board[x] && this.board[x - 15] === this.board[x]){
   				this.result = b[x] + " won";
   				this.winningFour.push(x, x -5, x -10, x -15);
   				return true;
   			
   			}
   		}
   	
   		if (this.returnEmpties().length == 0){
   			this.result = "draw";
   			return true;
   		}
   		return false;

   	}
   	this.lastMoveFun = function(m){
   		this.moves.push(m);

   	}
   	this.returnEmpties = function(){
   		var indexs = [];
   		for (var x = 0 ; x < this.board.length; x ++){
   			if (this.board[x] === "E"){
   				indexs.push(x);

   			}
   		}
   		return indexs;   	
   	}
   	this.heuristic = function(){
   		var score = this.heuristicScore;
   		score += this.noOfThreeInARow();
   		score += this.noOfCenterSquares();
   		this.heuristicScore = score;
   	}
   	this.noOfCenterSquares = function(){   		
   		var score = 0;
   		for (var z = 0; z < centerSquares.length; z++){

   			if (this.board[centerSquares[z]] === "O"){

   				score +=10;
   			}else if (this.board[centerSquares[z]] === "X"){
   				score -=10;
   			}
   		}

   		return score;
   	}
   	this.efficientThreeA = function(){
   		var score = 0;
   		var lastMove = this.moves[this.moves.length -1];
   		

   		var counterX = 0;
   		var counterO = 0;
   		for (var z = 1; z < 4; z++){
   			if (this.board[lastMove - z * 5] > -1 && this.board[lastMove - z * 5] != "E"){
	   			if (this.board[lastMove - z * 5] == "X"){ 
	   				counterX ++;
	   			}else{
	   				counterO ++;
	   			}
	   		}
   		}
   		for (var z = 1; z < 4; z++){
   			if (this.board[lastMove + z * 5] < 36 && this.board[lastMove + z * 5] != "E"){
	   			if (this.board[lastMove + z * 5] == "X"){ 
	   				counterX ++;
	   			}else{
	   				counterO ++;
	   			}
	   		}
   		}

   		if (counterX > 2 && counterO < 2){

   			score -= 10;
   		}else if (counterO > 2 && counterX < 2){
   			score +=10;
   		}
   		return score
   	}

    this.efficientThreeB = function(){
   		var score = 0;
   		var lastMove = this.moves[this.moves.length -1];
   		var counterX = 0;
   		var counterO = 0;
   		for (var z = 1; z < 4; z++){
   			if (this.board[lastMove - z * 7] > -1 && this.board[lastMove - z * 7] != "E"){
	   			if (this.board[lastMove - z * 7] == "X"){ 
	   				counterX ++;
	   			}else{
	   				counterO ++;
	   			}
	   		}
   		}
   		for (var z = 1; z < 4; z++){
   			if (this.board[lastMove + z * 7] < 36 && this.board[lastMove + z * 7] != "E"){
	   			if (this.board[lastMove + z * 7] == "X"){ 
	   				counterX ++;
	   			}else{
	   				counterO ++;
	   			}
		   	}
   		}
   		
   		if (counterX > 2 && counterO < 2){

   			score -= 10;
   		}else if (counterO > 2 && counterX < 2){
   			score +=10;
   		}
   		return score
   	}
   	this.threeDiagonalA = function (){
   		var c = 0;
   		for (var z = 0; z < listOfTopRightThree.length; z++){
   			x = listOfTopRightThree[z];
  			if (this.board[x] != "E" && this.board[x] === this.board[x-5] && this.board[x - 10] === this.board[x]){
				if (this.board[x] == "O"){
					c++;
				}else{
					c--;
				}
	   		}
   		}
   		return c;
   	}
   	this.threeDiagonalB = function (){
   		var c = 0;
   		for (var z = 0; z < listOfTopLeftThree.length; z++){
   			x = listOfTopRightThree[z];
  			if (this.board[x] != "E" && this.board[x] === this.board[x-7] && this.board[x - 14] === this.board[x]){
				if (this.board[x] == "O"){
					c++;
				}else{
					c--;
				}
	   		}
   		}
   		return c;
   	}
   	this.incrementMoveCounter = function(){
   		this.moveCounter ++;
   	}
   	this.decrementMoveCounter = function(){
   		this.moveCounter --;
   	}
   	this.noOfThreeRow = function(){
   		var c = 0;
   		var b = this.board;
   		for (var x = 0 ; x < 6; x ++){
   			
   			for (var y = 0; y < 3; y++){
   				var startPos = x * 6 + y;
	   			if ( ( b[startPos] != "E" &&	b[startPos] === b[startPos + 1] && b[startPos] === 	
	   					 b[startPos + 3] && b[startPos] === b[startPos + 3])){
	 				if (this.board[x] == "O"){
   						c++;
   					}else{
   						c--;
   					}

	   			}
	   		}

   		}
   		return c;

   	}
   	this.noOfThreeColumn = function(){
   		var c = 0;
   		var b = this.board;
   		for (var x = 0 ; x < 6; x ++){
   			for (var y = 0; y < 3; y++){
	   			var startPos = x + 6 * y;
	   			if (b[startPos] != "E" && b[startPos] === b[startPos + 6] && b[startPos] ===
	   					 b[startPos + 10] ){
	   				if (this.board[x] == "O"){
   						c++;
   					}else{
   						c--;
   					}	

	   			}
   			}

   		}   
   		return c;
   	}
   	this.noOfThreeInARow = function(){
   		var c = 0;
   		//c += this.threeDiagonalA();
   		//c += this.threeDiagonalB();
   		c+= this.efficientThreeA();
		c+= this.efficientThreeB();
		c+= this.noOfThreeColumn();
		c+= this.noOfThreeRow(); 			
   		return c;
   	}
}