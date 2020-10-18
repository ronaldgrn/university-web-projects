"use strict";
class Projectile {
  
  constructor(canvas, x, y, direction){
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 6;
    this.pctx = canvas.getContext("2d");
    this.done = 0;
    this.canvas = canvas;
    this.direction = direction;
    this.speed = 15 * this.direction.x;

    this.staticx = this.direction.x * 1;
    
    this.draw();
    this.firingID = setInterval(this.go.bind(this), 20);
  }

    draw(){
        this.clear();
        this.pctx.fillStyle = "red";
        this.pctx.fillRect(this.x, this.y, this.width, this.height);
    }

    clear(){
        // clear ONLY last area of this instance
        this.pctx.clearRect(this.x - (this.width * this.staticx), this.y, this.width, this.height);

        // debug erasure
        // pctx.fillStyle = "blue";
        // pctx.fillRect(this.x - this.width, this.y, this.width, this.height);
    }


    go() {
        this.x = this.x + this.speed;
        // console.log(this.x);
        this.draw();

        // destroy projectile when offscreen
        if(this.x > this.canvas.width){
            clearInterval(this.firingID);
            this.done = 1;
        }
    }


  reset(){
    // custom clear for end of life of lazor
    this.pctx.clearRect(this.x - 5 , this.y - 5, this.width + 10, this.height + 10);

    // out of screen. some other code should clean it up
    this.x = this.canvas.width + 50;
  }
}