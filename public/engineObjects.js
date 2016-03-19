"use strict";

class CameraObject {
	constructor (x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.offsetX = this.width/2;
		this.offsetY = this.height/2;
		this.color = 'yellow';
		this.padding = 150;
		this.updateCameraBounds();
	}

	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.rect(this.padding,this.padding,this.width-this.padding*2,this.height-this.padding*2);
		ctx.stroke();
	}

	updateCameraBounds()
	{
		this.left = this.x-this.offsetX+this.padding;
		this.right = this.x+this.offsetX-this.padding;
		this.top = this.y-this.offsetY+this.padding;
		this.bottom = this.y+this.offsetX-this.padding;
	}

	update(x,y)
	{
		this.x = x;
		this.y = y;
		this.updateCameraBounds();
		this.draw();
	}
}

class WorldObject {
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = 'blue';
		this.center = {x:width/2,y:height/2};
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