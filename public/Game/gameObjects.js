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
}
class ShipObject extends GameObject {
	constructor(x,y,width,height,angle,color,turnSpeed){
		super(x,y,width,height,angle,color);
		this.speed = 1;
		this.turnSpeed = 5;
		this.dirX=0;
		this.dirY=0;
		this.weapon = null;
		this.ID = null;
	}
	draw() {
		ctx.save();
		ctx.translate(this.x+this.width/2,this.y+this.height/2);
		ctx.rotate(this.angle*Math.PI/180);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(-this.width/2,-this.height/2 - .2,this.width/4,this.height/4);
		ctx.fillRect(-this.width/2+this.width-2,-this.height/2 - .2,this.width/4,this.height/4);
		ctx.fillRect(-this.width/8-this.width/8,-this.height/2 + this.height-this.height/4,this.width/2,this.height/4);
		ctx.restore();
		if(this.weapon !=  null){
			this.weapon.draw(this.x+this.width/4,this.y+this.height/4);	
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
		translatePoly(this.drawCords,x,y);
	}
}

class Cannon extends GameObject{
	constructor(x,y,width,height,angle,color){
		super(x,y,width,height,angle,color);
		this.bulletList = [];
	}
	update(counter) {
		this.angle = (180/Math.PI)*Math.atan2(mouseY-myShip.y,mouseX-myShip.x)-90;
		this.draw();
	}
	fire(x,y) {
		var v = findVelocity(); //Stored in physics module, needs to actually return {velx vely}
		var bullet = new Bullet(x,y,3,10,this.angle,"red",v.velX,v.velY);
		gameObjectList.push(bullet);
	}
	draw(x,y) {
		ctx.save();
		ctx.translate(x+this.width/2,y+this.height/2);
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