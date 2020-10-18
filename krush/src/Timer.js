"use strict";
class Timer {
	constructor(canvas){
		this.starttime = Date.now();
		this.time = this.starttime;
		this.delta = 0;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = "white";

		this.update();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	update() {
		this.time = Date.now();
		this.delta = Math.floor((this.time - this.starttime) / 1000);
		this.clear();
		this.ctx.fillText(this.delta,(this.canvas.width - 50), 40);
	}
}