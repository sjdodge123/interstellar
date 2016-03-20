"use strict";

var debugActive = false;
var	overLay;
var	printItems = [];
var fontSize = 10;
 
class Overlay {
	constructor (x,y,width,height,color) {
		this.width = width;
		this.height = height;
		this.color = color;
		this.x = x;
		this.y = y;
	}
	draw() {
		ctx.globalAlpha=0.4;
		drawRect(this.x,this.y,this.width,this.height,this.color);
		ctx.globalAlpha=1;
	}
	update() {
		this.draw();
		printDebugText();
	}
}
function toggleOverlay(){
	if(!debugActive){
		var framesPerSecond = 1000/30;
		overLay = new Overlay(100,100,500,400,'white');
		debugActive = true;
		gameObjectList.push(overLay);
		//window.addEventListener("keydown", debugHotkeys, false);
	} else {
		debugActive = false;
		gridOn = false;
		gameObjectList.splice(gameObjectList.indexOf(overLay),1);
		overLay = null;
	}
}

function print(text){
	if(debugActive) {
		printItems = [];
		printItems = String(text).split(',');
	}
}

function printDebugText(){
	if(debugActive) {
		for(var i=0;i<printItems.length;i++){
			if(printItems != null){
				ctx.fillStyle = "white";
				ctx.font = "10px Arial";
				ctx.fillText(printItems[i],overLay.x,overLay.y+fontSize+(i*fontSize));
			}
		}
	}
}

function debugUpdate(){
	if(assTard){
		assTard.translate(camera.toWorldX(mouseX),camera.toWorldY(mouseY));
	}
}

function debugClick(evt){
	//FIND WHICH OBJECT WAS CLICKED AND DISPLAY INFORMATION ABOUT THE OBJECT
	//var result = gameObjectList.checkCollide(mouseX,mouseY);
	//if(result.hit){
	//	display(result.object.stats);
	//};
}