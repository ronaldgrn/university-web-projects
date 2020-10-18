"use strict";
class GreenZero extends Player {
  constructorHack(){
	this.setImage("sprites/sprite2.png");
	this.width = 50;
	this.height = 60;

	//this.animation.animDelay = 100;

	this.locations.idle = [
	  [159, 11, -2],
	  [197, 11],
	  [235, 11],
	  [273, 11],
	  [235, 11],
	  [197, 11],
	];

	this.locations.walk = [
	//  [311, 12, -8],
	  [345, 12, -11],
	  [376, 11],
	  [414, 13, 1],
	  [456, 13, -3],
	  [491, 14, -10],
	  [522, 14, -8],
	  [556, 12],
	  [594, 12, -2],
	  [630, 13, -5],
	  [665, 13, -3]
  	];

	this.locations.idle_reverse = [
	  [1566, 11, -2],
	  [1528, 11],
	  [1490, 11],
	  [1452, 11],
	  [1490, 11],
	  [1528, 11],
	];

	this.locations.walk_reverse = [
	//  [1418, 12, -8],
	  [1387, 12, -11],
	  [1349, 11],
	  [1307, 13, 1],
	  [1272, 13, -4],
	  [1241, 14, -10],
	  [1207, 14, -8],
	  [1169, 12],
	  [1133, 12, -2],
	  [1098, 13, -5],
	  [1065, 13, -6]
  	];



  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // this.ctx.fillStyle = "rgba(0, 0, 200, 1)";
    // this.ctx.fillRect (this.x, this.y, this.width, this.height);

    this.sprite.x = this.locations.active[this.animation.animFrame][0];
    this.sprite.y = this.locations.active[this.animation.animFrame][1];
    this.sprite.dx = (this.locations.active[this.animation.animFrame][2] === undefined) ? 0 : this.locations.active[this.animation.animFrame][2];

  	// following line needs to be moved to somehwwere where it changes once per new new frame
  	this.width = 50 + this.sprite.dx;

    if(this.ImageReady){
		this.ctx.drawImage(
			this.PlayerImage,
			this.sprite.x, this.sprite.y, (this.width * 0.75), (this.height * 0.75),
			this.x, this.y, this.width, this.height
		);
    }
    // console.log(this.animation);
  }

}
