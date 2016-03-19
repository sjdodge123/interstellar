"use strict";

class Timer {
	constructor(){
		this.dt = 1;
		this.previousTime = 0;
		this.newTime = 0;
		this.fps = 0;
		this.reset();
	}

	calcTime() {
		this.newTime=performance.now();
		this.dt =(this.newTime-this.previousTime);
		this.fps = 1/(this.dt/1000);
		print("FPS: " + this.fps);
		this.previousTime=this.newTime;
		return this.dt;
	}

	reset() {
		this.previousTime = performance.now();
	}
}