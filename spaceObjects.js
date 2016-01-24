"use strict";
class GameObject {
	constructor (x,y,width,height,angle,color) {
		this.width = width;
		this.height = height;
		this.angle = 0;
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
	constructor(x,y,width,height,angle,color){
		super(x,y,width,height,angle,color);
		this.drawCords = null;
		this.vertices = 6 + Math.floor(Math.random() * 6);
		this.inner = 4 + Math.floor(Math.random() * 30);
		this.outer = this.inner + Math.floor(Math.random() * this.inner);
		this.rotateSpeed = -.05 + Math.random() * .1;
		this.draw();
	}
	update() {
		this.drawCords = updatePoly(this.drawCords);
	}
	draw() {
		this.drawCords = drawPoly(this.vertices,this.outer,this.inner,this.x,this.y,"cyan");
		this.drawCords.rotateSpeed = this.rotateSpeed;
	}
}

class Cannon extends GameObject{
	constructor(x,y,width,height,angle,color){
		super(x,y,width,height,angle,color);
	}
	update() {
		this.angle = (180/Math.PI)*Math.atan2(mouseY-ship.y,mouseX-ship.x)-90;
		this.draw();
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
