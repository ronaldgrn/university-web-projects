"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Projectile = (function () {
    function Projectile(canvas, x, y, direction) {
        _classCallCheck(this, Projectile);

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

    _createClass(Projectile, [{
        key: "draw",
        value: function draw() {
            this.clear();
            this.pctx.fillStyle = "red";
            this.pctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }, {
        key: "clear",
        value: function clear() {
            // clear ONLY last area of this instance
            this.pctx.clearRect(this.x - this.width * this.staticx, this.y, this.width, this.height);

            // debug erasure
            // pctx.fillStyle = "blue";
            // pctx.fillRect(this.x - this.width, this.y, this.width, this.height);
        }
    }, {
        key: "go",
        value: function go() {
            this.x = this.x + this.speed;
            // console.log(this.x);
            this.draw();

            // destroy projectile when offscreen
            if (this.x > this.canvas.width) {
                clearInterval(this.firingID);
                this.done = 1;
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            // custom clear for end of life of lazor
            this.pctx.clearRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);

            // out of screen. some other code should clean it up
            this.x = this.canvas.width + 50;
        }
    }]);

    return Projectile;
})();