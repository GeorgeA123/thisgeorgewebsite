var count =0;
var AI = function(state, max){

	var newState = clone(state);
	
	this.value = minimax(newState,5, -99999, 99999, max);
	console.log(this.value.val+ " with pruning " +  count);
	

}
function minimax(newState, depth, alpha, beta, maximisingPlayer){
	var nState = new State(newState);
	count ++;
	
	if (nState.moveCounter > 6){	
		
		if (depth == 0 || nState.isEnd() ){

			if (nState.result === "O won"){
				
				return {val:100 ,m:-1};
			}else if (nState.result === "X won"){
			
				return {val:-100 ,m:-1};
			}else if (nState.result == "draw"){
				return {val:0,m:-1};
			}else{
				nState.heuristic();
				return {val: nState.heuristicScore, m:-1};
			}
		}
	}else if(depth == 0){
		nState.heuristic();
		return {val: nState.heuristicScore, m:-1};
			
	}
	 if (maximisingPlayer){ //max
		
		var empties = nState.returnEmpties();
		
		var v = -99999;
		var m = -1;
		for (var x = 0; x < empties.length; x ++){
			
			nState.board[empties[x]] = nState.turn;
			nState.nextTurn();
			nState.incrementMoveCounter();
			nState.moves.push(empties[x]);
			var miniAns = minimax(nState, depth -1, alpha, beta, false);
			nState.decrementMoveCounter();
			nState.moves.pop();
			nState.nextTurn();
			nState.board[empties[x]] = "E";
			
		
			
			if (miniAns != undefined && miniAns.val > v){
				v = miniAns.val;
				m = empties[x];
			
			}
			//v = myMax(v, miniAns.val);

			alpha = myMax(alpha, v);
			if (beta <= alpha){
				
				break;
			}
		
			

			
		}
		return {val: v, m: m};
		
	}else{
		
	
		var empties = nState.returnEmpties();
		var v = 99999;
		for (var x = 0; x < empties.length; x ++){
				nState.board[empties[x]] = nState.turn;
			nState.nextTurn();
			nState.incrementMoveCounter();
			var miniAns = minimax(nState, depth -1, alpha, beta, true);
			nState.decrementMoveCounter();
			nState.nextTurn();
			nState.board[empties[x]] = "E";
		
			if (miniAns != undefined && miniAns.val < v){
				v = miniAns.val;
				m = empties[x];
			
			}
			
			beta = myMin(beta, v);
			if (beta <= alpha){
				
				break;
			}
			

			

		}
		return {val: v, m: m};
	}


}
function myMax(a,b){
	
	if (a == undefined && b != undefined){
		return b;
	}else if (a != undefined && b == undefined){
		return a;
	}else {
		return Math.max(a,b);
	}

}
function myMin(a,b){
	if (a == undefined && b != undefined){
		return b;
	}else if (a != undefined && b == undefined){
		return a;
	}else {
		return Math.min(a,b);
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
