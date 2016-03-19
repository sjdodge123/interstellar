"use strict";

class CameraObject {
	constructor (x,y,width,height,center){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.offsetX = this.width/2;
		this.offsetY = this.height/2;
		if(center){
			this.updateCameraBounds();
		} else {
			this.left = x;
			this.right = width;
			this.top = y;
			this.bottom = height;
		}
	}
	updateCameraBounds()
	{
		this.left = this.x-this.width/2;
		this.right = this.x+this.width/2;
		this.top = this.y-this.height/2;
		this.bottom = this.y+this.height/2;
	}
	update(x,y)
	{
		this.x = x;
		this.y = y;
		this.updateCameraBounds();
	}
}

class WorldObject {
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = 'blue';
	}
	draw(){
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.rect(this.x-camera.x+camera.offsetX,this.y-camera.y+camera.offsetY,this.width,this.height);
		ctx.stroke();
	}
	update(){
		this.draw();
	}
}