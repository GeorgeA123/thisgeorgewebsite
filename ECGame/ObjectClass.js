function object(pos,vel,mass,radius, color){
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.radius = radius;
    this.lastGoodPosition; 
    this.color = color;
}
object.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
    ctx.fill();
}
object.prototype.update = function(){
    this.lastGoodPosition = this.pos;
    this.pos = this.pos.add(this.vel);
}
object.prototype.updatePlayer = function(c){
    this.pos = this.pos = new vector(mouse.x, mouse.y);
	if (this.pos.x > c.width - this.radius){
		this.pos.x = c.width - this.radius;
	}
	if (this.pos.x - this.radius < 0){
		this.pos.x = this.radius
	}
	if (this.pos.y > c.height - this.radius){
		this.pos.y = c.height - this.radius;
	}
	if (this.pos.y - this.radius < 0 ){
		this.pos.y = this.radius
	}
	
	
}
object.prototype.playerCollision = function(x,player, balls){
    var distanceX = (player.getPosX() - balls[x].getPosX());
	var distanceY = (player.getPosY() - balls[x].getPosY());
    var distanceBetween = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
    var radiusSum = player.getRadius() + balls[x].getRadius();
	if (distanceBetween < radiusSum){
        dead(player);
    }
}
object.prototype.wallCollision = function(c){
    if (this.pos.x + (1/2 * this.radius) >= c.width){ //right
        this.pos.x -= this.vel.x;
        this.vel.x =- this.vel.x;      
    }
    if (this.pos.x - (1/2 * this.radius) <= 0){ //left
        this.pos.x -= this.vel.x;
        this.vel.x =- this.vel.x;
    }
    if (this.pos.y+ (1/2 * this.radius) >= c.height){ //bottom
        this.pos.y -= this.vel.y;
        this.vel.y =- this.vel.y;
    }
    if (this.pos.y - (1/2 * this.radius) <= 0){ //top
        this.pos.y -= this.vel.y;
        this.vel.y =- this.vel.y;
    }
    
}
object.prototype.getMass = function(){
    return this.mass;
}
object.prototype.getVel = function(){
    return this.vel;
}
object.prototype.getPos = function(){
    return this.pos;
}
object.prototype.getPosX = function(){
    return this.pos.x;
}
object.prototype.getPosY = function(){
    return this.pos.y;
}
object.prototype.getRadius = function(){
    return this.radius;
}
object.prototype.changePos = function(pos){
    this.pos = pos;
}
object.prototype.changeVel = function(vel){
    this.vel = vel;
}
