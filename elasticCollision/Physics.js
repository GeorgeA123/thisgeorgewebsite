/* global $ */
function setUp(){
    var width =  $(document).width() - 100 // so it does not mess up;
    var height = $(document).height() - 230 //takes from heading;
    var amountOfBalls = findingAmountOfBalls(width,height)
    var balls= new Array(amountOfBalls);
 	createBalls(balls, amountOfBalls,0 , 100);
	createBalls(balls, amountOfBalls,amountOfBalls , 200);
	
    var c  =document.getElementById("canvas");
    var ctx= c.getContext("2d");
    
    c.width = width;
    c.height = height - 100;
    setInterval(function(){fpsTimer(c, ctx, amountOfBalls, balls);}, 1000/30);
    setInterval(function(){tpsTimer(amountOfBalls, balls,c);}, 1000/100);
}
function createBalls(balls, amountOfBalls,startNo , y){
	for (var x =  startNo; x  < amountOfBalls + startNo; x++){
        var pos = new vector( 100 * ((x-startNo)+1) , y)
        var pos = new vector( 100 * ((x-startNo)+1) , y)
        var radius = Math.floor((Math.random() * 25) + 15);
        var mass = radius;
        var vel = new vector(Math.floor((Math.random() * 5) + 1), Math.floor((Math.random() * 5) + 1))
        if ((Math.random() * 2) == 1){
            vel = - vel
        }
        var color = findColor();
        balls[x] = new object(pos, vel, mass, radius, color)
    }  
}
function findingAmountOfBalls(width, height){
    var amountOfBalls = width / 100;
    amountOfBalls -= 2;
    return parseInt(amountOfBalls);
}
function collision(balls,x,y){
        var distanceX = (balls[y].getPosX() - balls[x].getPosX());
        var distanceY = (balls[y].getPosY() - balls[x].getPosY());
        var distanceBetween = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
        var radiusSum = balls[x].getRadius() + balls[y].getRadius();
    if (distanceBetween < radiusSum){
        reactionOfCollision(balls[x], balls[y]);
    }
}
function findColor(){
	var color = "#";
	var inValue;
	for (var x =1; x <7;x++){
		inValue = Math.floor((Math.random() * 12) + 1);
		if (inValue == 15){
			color += "F"
		}else if(inValue == 14){
			color += "E"
		}else if(inValue == 13){
			color += "D"
		}else if(inValue == 12){
			color += "C"
		}else if(inValue == 11){
			color += "B"
		}else if(inValue == 10){
			color += "A"
		}else{
			color += inValue;
		}
	
	}
	return color;
}

function reactionOfCollision(ball1, ball2){
    var xDistance = (ball2.getPosX() - ball1.getPosX());
    var yDistance = (ball2.getPosY() - ball1.getPosY());

    var normalVector = new vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
    normalVector = normalVector.normalise();

    var tangentVector = new vector((normalVector.y * -1), normalVector.x);

    // create ball scalar normal direction.
    var ball1scalarNormal =  normalVector.dotProduct(ball1.vel);
    var ball2scalarNormal = normalVector.dotProduct(ball2.vel);

    // create scalar velocity in the tagential direction.
    var ball1scalarTangential = tangentVector.dotProduct(ball1.vel); 
    var ball2scalarTangential = tangentVector.dotProduct(ball2.vel); 

    var ball1ScalarNormalAfter = (ball1scalarNormal * (ball1.getMass() - ball2.getMass()) + 2 * ball2.getMass() * ball2scalarNormal) / (ball1.getMass() + ball2.getMass());
    var ball2ScalarNormalAfter = (ball2scalarNormal * (ball2.getMass() - ball1.getMass()) + 2 * ball1.getMass() * ball1scalarNormal) / (ball1.getMass() + ball2.getMass());

    var ball1scalarNormalAfter_vector = normalVector.mul(ball1ScalarNormalAfter); // ball1Scalar normal doesnt have multiply not a vector.
    var ball2scalarNormalAfter_vector = normalVector.mul(ball2ScalarNormalAfter);

    var ball1ScalarNormalVector = (tangentVector.mul(ball1scalarTangential));
    var ball2ScalarNormalVector = (tangentVector.mul(ball2scalarTangential));;

    ball1.vel = ball1ScalarNormalVector.add(ball1scalarNormalAfter_vector);
    ball2.vel = ball2ScalarNormalVector.add(ball2scalarNormalAfter_vector);

    ball1.pos = ball1.lastGoodPosition;
    ball2.pos = ball2.lastGoodPosition;
    
}
function fpsTimer(c,ctx, amountOfBalls, balls){ //drawing  
    ctx.clearRect(0,0,c.width,c.height);
    for (var x = 0; x < balls.length; x++){
        balls[x].draw(ctx);
    }   
}
function tpsTimer(amountOfBalls, balls,c){ //simulation
    for (var x = 0; x < balls.length; x++){
        balls[x].wallCollision(c);
        balls[x].update();
    }
    
    for (var x = 0; x < balls.length; x++){
        for (var y = 0; y < balls.length; y++){
            if (x==y){
            }else{
                collision(balls,x,y); 
            }
        }
    }
   
}

$(document).ready(function(){setUp();});
