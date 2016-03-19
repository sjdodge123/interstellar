"use strict";

class CameraObject {
	constructor (x,y,width,height,center){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
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
		this.offsetX = this.width/2;
		this.offsetY = this.height/2;
	}
	update(x,y)
	{
		this.x = x;
		this.y = y;
		this.updateCameraBounds();
	}
}