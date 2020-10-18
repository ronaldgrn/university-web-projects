"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = (function () {
  function Player(canvas, name, health, x, y, wall_damage, LAZORS) {
    _classCallCheck(this, Player);

    this.name = name;
    this.health = health;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.direction = { x: 0, y: 0 };
    this.last_direction = { x: 1, y: 1 };
    this.lazor = { last: 0, delay: 500 };
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
    };

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

  _createClass(Player, [{
    key: "constructorHack",
    value: function constructorHack() {}
    // overwrite this

    // call this to load sprite url and begin call

  }, {
    key: "setImage",
    value: function setImage(source) {
      this.imgSrc = source;

      // need _this for callback to work (took freggin hours to figure out)
      var _this = this;
      this.PlayerImage.onload = function () {
        _this.ImageReady = true;
      };
      this.PlayerImage.src = source;
    }
  }, {
    key: "hit",
    value: function hit(intensity) {
      switch (intensity) {
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
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.direction.y = -1;
      this.last_direction.y = -1;

      if (this.last_direction.x > 0) this.locations.active = this.locations.walk;else this.locations.active = this.locations.walk_reverse;

      this.animation.animNumFrames = this.locations.active.length;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.direction.y = 1;
      this.last_direction.y = 1;

      if (this.last_direction.x > 0) this.locations.active = this.locations.walk;else this.locations.active = this.locations.walk_reverse;

      this.animation.animNumFrames = this.locations.active.length;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.direction.x = -1;
      this.last_direction.x = -1;

      this.locations.active = this.locations.walk_reverse;
      this.animation.animNumFrames = this.locations.active.length;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.direction.x = 1;
      this.last_direction.x = 1;

      this.locations.active = this.locations.walk;
      this.animation.animNumFrames = this.locations.active.length;
    }
  }, {
    key: "moveNone",
    value: function moveNone() {
      this.direction.x = 0;
      this.direction.y = 0;
    }
  }, {
    key: "moveIdle",
    value: function moveIdle() {
      if (this.last_direction.x > 0) this.locations.active = this.locations.idle;else this.locations.active = this.locations.idle_reverse;

      this.animation.animNumFrames = this.locations.active.length;
    }
  }, {
    key: "resetAnimation",
    value: function resetAnimation() {
      this.animation.animFrame = 0;
    }
  }, {
    key: "fire",
    value: function fire() {
      if (Date.now() - this.lazor.last > this.lazor.delay) {
        this.lazor.last = Date.now();

        if (this.last_direction.x > 0) {
          var c = new Projectile(canvasProjectile, this.x + this.width * 1.25, this.y + this.height / 2, this.last_direction);
        } else {
          var c = new Projectile(canvasProjectile, this.x - 50, this.y + this.height / 2, this.last_direction);
        }
        this.GLOBAL_LAZORS.push(c);
        // console.log(this.GLOBAL_LAZORS);
        // new Projectile(canvasProjectile, (this.x + (this.width * 0.90)), (this.y + (this.height / 2)));
      }
    }
  }, {
    key: "update",
    value: function update(elapsed) {
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

      var move = this.speed * (elapsed / 1000);
      this.x += Math.round(move * this.direction.x);
      this.y += Math.round(move * this.direction.y);

      // possible wall damage: 0 to disable, 1 or more to enable
      // also works with "small", "medium", "large" or "death"
      // ensure that player cannot go out of bounds
      if (this.x < 0) {
        this.x = 2;
        this.hit(this.wall_damage);
      }

      if (this.x + this.width >= this.canvas.width) {
        this.x = this.canvas.width - 2 - this.width;
        this.hit(this.wall_damage);
      }

      if (this.y < 0) {
        this.y = 2;
        this.hit(this.wall_damage);
      }

      if (this.y + this.height >= this.canvas.height) {
        this.y = this.canvas.height - 2 - this.height;
        this.hit(this.wall_damage);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      // this.ctx.fillStyle = "rgb(51, 118, 36)";
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "rgba(0, 0, 200, 1)";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: "status",
    value: function status() {
      console.log(this);
      // console.log(JSON.stringify(this));
    }
  }]);

  return Player;
})();