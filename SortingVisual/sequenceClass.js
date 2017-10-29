function sequenceClass(randomNumberSequence,randomColorSequence, name,sector){
	this.rCS = randomColorSequence;
	this.rNS = randomNumberSequence;
	this.name = name;
	this.counter = 0;
	this.sector = sector;
	this.valuesCompleted = 0;
	this.smallestValue = new Array(1)
	this.smallestValue[0] = 9
	this.iterations = 0
	this.swapped = false;
}
sequenceClass.prototype.bubbleSort = function(){
	if (this.ordered() == false){
			this.iterations +=1;
		if (this.rNS[this.counter] > this.rNS[this.counter + 1]){
			//swapping
			var tempValue = this.rNS[this.counter];
			this.rNS[this.counter] =this.rNS[this.counter + 1]
			this.rNS[this.counter + 1] = tempValue
			var tempValueCS = this.rCS[this.counter];
			this.rCS[this.counter] =this.rCS[this.counter + 1]
			this.rCS[this.counter + 1] = tempValueCS
		}
	}
}
sequenceClass.prototype.selectSort = function (){
	if (this.ordered() == false){
		this.iterations +=1;
		this.findSmallest(this.valuesCompleted, this.counter);
	}
}
sequenceClass.prototype.cocktailSort = function (){
	if (this.ordered() == false){
		this.iterations +=1;
		if (this.swapped == false){
			if (this.rNS[this.counter] > this.rNS[this.counter + 1] ){
				this.swapValues(this.counter, this.counter + 1);		
			}
		}
		if (this.swapped == true){
			if (this.rNS[this.counter]  < this.rNS[this.counter - 1] ){
				this.swapValues(this.counter - 1 , this.counter );	
			}
		}
	}
}
sequenceClass.prototype.ordered = function (){
	var ordered = true;
	for (var x =0; x < 9; x++){
		if (this.rNS[x] != (x+1)){
			ordered = false;
		}
	}
	return ordered;
}
sequenceClass.prototype.findSmallest = function (){
	
	if (this.rNS[this.counter] < this.smallestValue[0]){
		
		this.smallestValue[0] = this.rNS[ this.counter];
		this.smallestValue[1] = this.counter;
	}
	if (this.counter == 8){
		this.swapValues(this.valuesCompleted, this.smallestValue[1]);
		this.valuesCompleted += 1 ;
		this.smallestValue[0] = 9;
	}	
}
sequenceClass.prototype.swapValues = function (index1, index2){
		var tempValue = this.rNS[index1];
		this.rNS[index1] =this.rNS[index2]
		this.rNS[index2] = tempValue
		var tempValueCS = this.rCS[index1];
		this.rCS[index1] =this.rCS[index2]
		this.rCS[index2] = tempValueCS
}
function drawIterations(){
	ctx.textAlign="center"; 
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(sequences[0].iterations,  (c.width / 6) + (c.width / 12), 25);
    ctx.fillText(sequences[1].iterations,  c.width / 3 + (c.width / 6) + (c.width / 12) , 25);
    ctx.fillText(sequences[2].iterations, 2 * c.width / 3 +  (c.width / 6) + (c.width / 12), 25);
}
sequenceClass.prototype.draw =function(){
	var pointSize = 25;
    var differenceWidth = c.width / 30;

    this.drawSector = this.sector * (c.width /3)
    var differenceHeight = c.height / 10;
    for (var x = 0; x < 9; x++){  
        var xPosition = (this.drawSector  + x * differenceWidth) + (differenceWidth / 2)
        var yPosition =  this.rNS[x] * (differenceHeight )
        drawPoint(xPosition ,yPosition  ,  pointSize , this.rCS, x);
    }  
	drawIterations();
  
}
function drawPoint(x,y, pointSize,colorSequence,x1){
    ctx.fillStyle = colorSequence[x1];
    ctx.fillRect(x, y,pointSize,pointSize); 
}