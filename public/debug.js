"use strict";

var debugActive = false;
var	overLay;
var	printItems = [];
var printLines = 0;
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
	} else {
		debugActive = false;
		gridOn = false;
		overLay = null;
	}
}

function print(text){
	if(debugActive) {
		printLines++;
		printItems.push(String(text));
	}
}

function printDebugText(){
	if(debugActive) {
		for(var i=0;i<printItems.length;i++){
			if(printItems != null){
				ctx.fillStyle = "white";
				ctx.font = "10px Arial";
				ctx.fillText(printItems[i],overLay.x,overLay.y+printLines*fontSize+(i*fontSize));
			}
		}
	}
	printLines = 0;
	printItems = [];
}

function debugUpdate(){
	if(debugActive){
		overLay.update();
	}
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