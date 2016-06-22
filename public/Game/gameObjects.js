"use strict";
var exports;
class GameObject {
	constructor (x,y,width,height,angle,color) {
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.angleRad = angle*Math.PI/180;
		this.oldAngleRad = 0;
		this.color = color;
		this.x = x;
		this.y = y;
		this.speed = 0;
		this.velX = 0;
		this.velY = 0;
		this.gravAccelX = 0;
		this.gravAccelY = 0;
		this.accelX=0;
		this.accelY=0;
		this.inBounds = false;
	}
	draw() {
		fillObject(this);
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
		this.turnSpeed = .5;
		this.dirX=0;
		this.dirY=0;
		this.velX = 0;
		this.velY = 0;
		this.weapon = null;
		this.ID = null;
		this.rotateRate = 0;
		this.rotateAccel = 0;
		this.beltList = [];	
		this.drawCords = initShipPoly(this.x,this.y);
	}
	draw() {
		this.angleRad = this.angle*Math.PI/180 - this.oldAngleRad;
		this.drawCords = updatePoly(this);
		this.x = this.drawCords.x;
		this.y = this.drawCords.y;
		
		
		if(this.weapon !=  null){
			this.weapon.draw(this.width/2+camera.offsetX,this.height/2+camera.offsetY);	
		}

	}
	translate(x,y){
		this.displacementX = this.x;
		this.displacementY = this.y;
		translatePoly(this.drawCords,x,y);
		this.x = x;
		this.y = y;
		this.displacementX = x - this.displacementX;
		this.displacementY = y - this.displacementY;
	}
	attachToBelt(object){
		this.beltList.push(object);
	}
	hasObjectInBelt(object){
		if(this.beltList.indexOf(object) == -1){
			return false;
		}
		return true;
	}
	update() {
		if(this.isHit){
			this.color = 'red';
		} else {
			this.color = 'white';
		}
		if(this.weapon){
			this.weapon.update();
		}
		this.displacement = updatePhysics(this);
		updateRotation(this);
		updatePlayerInput(this);
		this.updateBeltObjects();
		if(cameraBound)
		{
			camera.update(this.x,this.y);
		}
		this.translate(this.x,this.y);
		this.draw();
	}

	updateBeltObjects() {

		for(var i=0;i<this.beltList.length;i++){
			this.beltList[i].translate(this.beltList[i].x + this.displacement.x,this.beltList[i].y + this.displacement.y);
			this.beltList[i].orbit(this.x,this.y);
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
		this.angleRad = -.05 + Math.random() * .1;
		this.theta=0;
		this.drawCords = initRoundPoly(this.vertices,this.outer,this.inner,this.x,this.y,"cyan");
		
	}
	draw() {
		if(this.isHit){
			this.color = 'red';
		} else {
			this.color = 'white';
		}
		this.drawCords = updatePoly(this);
		this.x = this.drawCords.x;
		this.y = this.drawCords.y;

	}
	update() {
		this.draw();
		this.displacement = updatePhysics(this);
		this.translate(this.x,this.y);
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
	}
	fire(x,y) {
		var v = findVelocity();
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

class GravityObject {
	constructor(gravityConst,gravityRadius){
		this.gravityConst = gravityConst;
		this.gravityRadius = gravityRadius;
	}
}

class Planet extends GravityObject {
	constructor(x,y,radius) {
		super(500,radius*4);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
	draw(){
		ctx.strokeStyle = 'green';
		ctx.beginPath();
		ctx.arc(this.x-camera.x+camera.offsetX,this.y-camera.y+camera.offsetY,this.radius,0,Math.PI*2,true);
		ctx.stroke();

		ctx.strokeStyle = 'magenta';
		ctx.beginPath();
		ctx.arc(this.x-camera.x+camera.offsetX,this.y-camera.y+camera.offsetY,this.gravityRadius,0,Math.PI*2,true);
		ctx.stroke();
	}
	update(){
		this.draw();
	}
}