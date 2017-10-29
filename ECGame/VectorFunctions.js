function vector(x,y){
    this.x = x;
    this.y = y;
}
    vector.prototype.add = function(v){return new vector(this.x + v.x, this.y + v.y);};
    vector.prototype.sub = function(v){return new vector(this.x - v.x, this.y - v.y);};
    vector.prototype.mul = function(m){return new vector(this.x * m, this.y * m);};
    vector.prototype.div = function(m){return new vector(this.x / m, this.y / m);};
    vector.prototype.dotProduct = function(v){return (this.x*v.x) + (this.y*v.y);};
    vector.prototype.magnitude = function(){return Math.sqrt(this.dotProduct(this));};
    vector.prototype.normalise = function(){if(this.magnitude() > 0){return this.div(this.magnitude());} return this;};
    vector.prototype.distanceTo = function(v){return new vector(this.x - v.x, this.y - v.y).magnitude();};
    vector.prototype.limit = function(m){if(this.magnitude() > m){return this.normalise().mul(m);}return this;};