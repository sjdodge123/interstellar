"use strict";
var exports;
class GameObject {
	constructor (x,y,width,height,angle,color) {
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.color = color;
		this.x = x;
		this.y = y;
		this.speed = 0;
		this.velX = 0;
		this.velY = 0;
		this.accelX=0;
		this.accelY=0;
	}
	draw() {
		ctx.save();
		ctx.translate(this.x+this.width/2,this.y+this.height/2);
		ctx.rotate(this.angle*Math.PI/180);
		ctx.fillStyle = 'red';
		ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
	}
	update() {
		updatePhysics(this);
		this.draw();
	}
	orbit(x,y) {
		orbitPoint(x,y,this);
	}
}
class ShipObject extends GameObject {
	constructor(x,y,width,height,angle,color,turnSpeed){
		super(x,y,width,height,angle,color);
		this.thrust = 1;
		this.turnSpeed = 20;
		this.dirX=0;
		this.dirY=0;
		this.weapon = null;
		this.ID = null;
		this.beltList = [];
	}
	draw() {
		ctx.save();
		ctx.translate(this.width/2+camera.offsetX,this.height/2+camera.offsetY);
		ctx.rotate(this.angle*Math.PI/180);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
		if(this.weapon !=  null){
			this.weapon.draw(this.width/2+camera.offsetX,this.height/2+camera.offsetY);	
		}

	}
	attachToBelt(object){
		this.beltList.push(object);
	}
	update() {

		this.displacement = updatePhysics(this);
		this.updateBeltObjects();
		if(cameraBound)
		{
			camera.update(this.x,this.y);
			console.log(camera.x,this.x);
		}
		this.draw();
	}

	updateBeltObjects() {
	for(var i=0;i<this.beltList.length;i++){
		this.beltList[i].translate(this.beltList[i].x + this.displacement.x,this.beltList[i].y + this.displacement.y);
		this.beltList[i].orbit(this.x+camera.offsetX,this.y+camera.offsetY);
	}
	
}
}

class Asteroid extends GameObject {
	constructor(x,y,inner,outer,angle,color){
		super(x,y,0,0,angle,color);
		this.drawCords = null;
		this.isHit = false;
		this.vertices = 6 + Math.floor(Math.random() * 6);
		this.inner = inner;
		this.outer = outer;
		this.rotateSpeed = -.05 + Math.random() * .1;
		this.draw();
		this.theta=0;
	}
	update() {
		if(this.isHit){
			this.color = 'red';
		} else {
			this.color = 'white';
		}
		this.drawCords = updatePoly(this.drawCords,this.color);
		this.x = this.drawCords.x;
		this.y = this.drawCords.y;
	}
	draw() {
		this.drawCords = drawPoly(this.vertices,this.outer,this.inner,this.x,this.y,"cyan");
		this.drawCords.rotateSpeed = this.rotateSpeed;
	}
	translate(x,y) {
		this.displacementX = this.x;
		this.displacementY = this.y;
		translatePoly(this.drawCords,x,y);
		this.x = x;
		this.y = y;
		this.displacementX = x - this.displacementX;
		this.displacementY = y - this.displacementY;
	}
}

class Cannon extends GameObject{
	constructor(x,y,width,height,angle,color){
		super(x,y,width,height,angle,color);
		this.bulletList = [];
	}
	update() {
		this.angle = (180/Math.PI)*Math.atan2(mouseY-camera.offsetY,mouseX-camera.offsetX)-90;
		this.draw();
	}
	fire(x,y) {
		var v = findVelocity(); //Stored in physics module, needs to actually return {velx vely}
		var bullet = new Bullet(x,y,3,10,this.angle,"red",v.velX,v.velY);
		gameObjectList.push(bullet);
	}
	draw(x,y) {
		ctx.save();
		ctx.translate(x,y);
		ctx.rotate(this.angle*Math.PI/180);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
	}
}
class Bullet extends GameObject{
	constructor(x,y,width,height,angle,color,velX,velY){
		super(x,y,width,height,angle,color);
		this.velX = velX;
		this.velY = velY;
	}
	draw() {
		ctx.save();
		ctx.translate(this.x+this.width/2,this.y+this.height/2);
		ctx.rotate(this.angle*Math.PI/180);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
	}
}