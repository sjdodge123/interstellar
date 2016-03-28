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
		this.bottom = this.y+this.offsetY-this.padding;
	}

	update(x,y)
	{
		this.x = x;
		this.y = y;
		this.updateCameraBounds();
		this.draw();
	}

	toWorldX(x){
		x = x + camera.x-camera.offsetX;
		return x;
	}
	toWorldY(y){
		y = y + camera.y-camera.offsetY;
		return y;
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

class GameUpdateList {
	constructor(){
		this.permObjectList = [];
		this.currentUpdateList = [];
		this.built = false;
		this.i = 0;
		this.curIndex = 0;
	}
	addPermArray(newItems){
		this.permObjectList = this.permObjectList.concat(newItems);
	}
	addUpdateArray(newItems){
		//This must be called at least once to *build* the perm array list
		for(this.i=0;this.i<newItems.length;this.i++) {
			smartArrayAdd(newItems[this.i],this.currentUpdateList);
		}
		if(!this.built){
			this.build();
		}
	}
	build(){
		//This adds all perm objects to the currentupdate list if they don't already exist
		for(this.i=0;this.i<this.permObjectList.length;this.i++){
			smartArrayAdd(this.permObjectList[this.i],this.currentUpdateList);
		}
		this.built = true;
	}
	clean(){
		for(this.i=0;this.i<this.currentUpdateList.length;this.i++){
			this.curIndex = this.permObjectList.indexOf(this.currentUpdateList[this.i]);
			if(this.curIndex != -1){
				this.currentUpdateList.splice(this.curIndex,1);
			}
		}
		this.built = false;
		print("Current Objects being updated: " + this.currentUpdateList.length);
	}
}