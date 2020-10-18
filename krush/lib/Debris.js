"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debris = (function () {
  function Debris(canvas, speed) {
    _classCallCheck(this, Debris);

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 20;
    this.height = 20;
    this.speed = speed;
    this.delay = 2;
    this.x = (this.canvas.width - this.width) * Math.random();
    this.y = 0 - this.height * this.delay;

    this.DebrisReady = false;
    this.DebrisImage = new Image();
    this.setImage("sprites/sprite1.png");

    this.sprite = {
      x: 514,
      y: 2439
    };

    // Animation settings
    this.animation = {
      animFrame: 0,
      animNumFrames: 4,
      animDelay: 100,
      animTimer: 0
    };

    this.locations = {};
    this.locations.spin = [[514, 2439], [530, 2439], [546, 2439], [563, 2439]];

    this.draw();
  }

  // call this to load sprite url and begin call

  _createClass(Debris, [{
    key: "setImage",
    value: function setImage(source) {
      this.imgSrc = source;

      // need _this for callback to work (took freggin hours to figure out)
      var _this = this;
      this.DebrisImage.onload = function () {
        _this.ImageReady = true;
      };
      this.DebrisImage.src = source;
    }
  }, {
    key: "update",
    value: function update(elapsed) {
      // Update animation
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

      // rock down
      if (this.y < this.canvas.height) {
        // this.y += 2;

        var move = this.speed * (elapsed / 1000);
        this.y += move;
      } else {
        // clearInterval(this.falling);
        this.reset();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      // this.ctx.fillRect (this.x, this.y, 30, 30);

      var frame = this.locations.spin[this.animation.animFrame];
      this.ctx.drawImage(this.DebrisImage, frame[0], frame[1], this.width * 0.75, this.height * 0.75, this.x, this.y, this.width, this.height);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.x = (this.canvas.width - this.width) * Math.random();
      this.y = 0 - this.height * this.delay;
    }
  }, {
    key: "ping",
    value: function ping(elapsed) {
      this.update(elapsed);
      this.draw();
    }
  }]);

  return Debris;
})();