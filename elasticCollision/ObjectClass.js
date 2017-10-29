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
