"use strict";
class Player {
  constructor(canvas, name, health, x, y, wall_damage, LAZORS) {
      this.name = name;
      this.health = health;
      this.canvas = canvas
      this.ctx = canvas.getContext("2d");
      this.x = x;
      this.y = y;
      this.direction = {x: 0, y: 0};
      this.last_direction = {x: 1, y: 1};
      this.lazor = {last: 0, delay: 500};
      this.width = 75;
      this.height = 50;
      this.wall_damage = wall_damage;
      this.speed = 200;
      this.sprite = {
        x: 0,
        y: 0,
        dx: 0 // for width adjustments
      };

      this.GLOBAL_LAZORS = LAZORS;

      // Animation settings
      this.animation = {
        animSet: 4,
        animFrame: 0,
        animNumFrames: 19,
        animDelay: 100,
        animTimer: 0
      }

      // to be overwritten
      this.ImageReady = false;
      this.PlayerImage = new Image();
      this.locations = {
        active: ""
      };

      // there must be a better way to override constructor
      this.constructorHack();

      console.log("Player \"" + name + "\" created");
  }

  constructorHack(){
    // overwrite this
  }

  // call this to load sprite url and begin call
  setImage(source){
    this.imgSrc = source;

    // need _this for callback to work (took freggin hours to figure out)
    var _this = this;
    this.PlayerImage.onload = function () {
      _this.ImageReady = true;
    };
    this.PlayerImage.src = source;
  }

  hit(intensity) {
    switch(intensity){
      case "small":
        this.health += -50;
        break;
      case "medium":
        this.health += -100;
        break;
      case "large":
        this.health += -250;
        break;
      case "death":
        this.health += -1000;
        break;
      default:
        this.health -= intensity;
        break;
    }
  }
  
  moveUp() {
    this.direction.y = -1;
    this.last_direction.y = -1;

    if(this.last_direction.x > 0)
      this.locations.active = this.locations.walk;
    else
      this.locations.active = this.locations.walk_reverse;
    
    this.animation.animNumFrames = this.locations.active.length;
  }

  moveDown() {
    this.direction.y = 1;
    this.last_direction.y = 1;

    if(this.last_direction.x > 0)
      this.locations.active = this.locations.walk;
    else
      this.locations.active = this.locations.walk_reverse;
    
    this.animation.animNumFrames = this.locations.active.length;
  }

  moveLeft() {
    this.direction.x = -1;
    this.last_direction.x = -1;

    this.locations.active = this.locations.walk_reverse;
    this.animation.animNumFrames = this.locations.active.length;
  }

  moveRight() {
    this.direction.x = 1;
    this.last_direction.x = 1;

    this.locations.active = this.locations.walk;
    this.animation.animNumFrames = this.locations.active.length;
  }

  moveNone() {
    this.direction.x = 0;
    this.direction.y = 0;
  }

  moveIdle() {
    if(this.last_direction.x > 0)
      this.locations.active = this.locations.idle;
    else
      this.locations.active = this.locations.idle_reverse;

    this.animation.animNumFrames = this.locations.active.length;
  }

  resetAnimation() {
    this.animation.animFrame = 0;
  }

  fire() {
    if((Date.now() - this.lazor.last) > this.lazor.delay){
      this.lazor.last = Date.now();

      if(this.last_direction.x > 0){
        var c = new Projectile(canvasProjectile, this.x + (this.width * 1.25), (this.y + (this.height / 2)), this.last_direction);
      } else {
        var c = new Projectile(canvasProjectile, this.x - 50, (this.y + (this.height / 2)), this.last_direction);
      }
      this.GLOBAL_LAZORS.push(c);
      // console.log(this.GLOBAL_LAZORS);
      // new Projectile(canvasProjectile, (this.x + (this.width * 0.90)), (this.y + (this.height / 2)));
    }
  }
  
  
  update(elapsed) {
    // Update player animation
    this.animation.animTimer += elapsed;
    if (this.animation.animTimer >= this.animation.animDelay) {
      // Enough time has passed to update the animation frame
      this.animation.animTimer = 0; // Reset the animation timer
      ++this.animation.animFrame;
      if (this.animation.animFrame >= this.animation.animNumFrames) {
        // We've reached the end of the animation frames; rewind
        this.animation.animFrame = 0;
      }
    }
    
    // console.log(this.last_direction);


    var move = (this.speed * (elapsed / 1000));
    this.x += Math.round(move * this.direction.x);
    this.y += Math.round(move * this.direction.y);


    // possible wall damage: 0 to disable, 1 or more to enable
    // also works with "small", "medium", "large" or "death"
    // ensure that player cannot go out of bounds
    if(this.x < 0) {
      this.x = 2;
      this.hit(this.wall_damage);
    }

    if((this.x + this.width) >= this.canvas.width) {
      this.x = (this.canvas.width - 2) - this.width;
      this.hit(this.wall_damage);
    }

    if(this.y < 0) {
      this.y = 2;
      this.hit(this.wall_damage);
    }

    if((this.y + this.height) >= this.canvas.height){
      this.y = (this.canvas.height - 2) - this.height;
      this.hit(this.wall_damage);
    }

  }

  // draw() {
  //   // this.ctx.fillStyle = "rgb(51, 118, 36)";
  //   // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //   this.ctx.fillStyle = "rgba(0, 0, 200, 1)";
  //   this.ctx.fillRect (this.x, this.y, this.width, this.height);
  // }

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

  status() {
    console.log(this);
    // console.log(JSON.stringify(this));
  }
}