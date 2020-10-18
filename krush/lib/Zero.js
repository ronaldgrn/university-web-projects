"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zero = (function (_Player) {
		_inherits(Zero, _Player);

		function Zero() {
				_classCallCheck(this, Zero);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(Zero).apply(this, arguments));
		}

		_createClass(Zero, [{
				key: "constructorHack",
				value: function constructorHack() {
						this.setImage("sprites/sprite1.png");
						this.width = 50;
						this.height = 60;

						this.animation.animDelay = 100;

						this.locations.idle = [[103, 7], [139, 7], [175, 7], [211, 7], [247, 7], [283, 7], [319, 7], [355, 7], [391, 7, -2]];
						this.locations.walk = [
						//  [427, 12, -5],
						[459, 12, -4], [492, 11, 2], [531, 13, 5], [572, 13, -2], [606, 14, -13], [632, 14, -8], [662, 12], [698, 12], [734, 13, 6], [774, 13]];

						this.locations.idle_reverse = [[1697, 7, -2], [1661, 7, -2], [1625, 7, -2], [1589, 7, -2], [1553, 7, -2], [1517, 7, -2], [1481, 7, -2], [1445, 7, -2], [1409, 7, -2]];
						this.locations.walk_reverse = [
						//  [1377, 12, -7],
						[1344, 12, -6], [1305, 11, 2], [1264, 13, 2], [1230, 13, -6], [1204, 14, -15], [1174, 14, -10], [1138, 12, -3], [1102, 12, -2], [1062, 13, 3], [1026, 13, -2]];
				}
		}, {
				key: "draw",
				value: function draw() {
						this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

						// this.ctx.fillStyle = "rgba(0, 0, 200, 1)";
						// this.ctx.fillRect (this.x, this.y, this.width, this.height);

						this.sprite.x = this.locations.active[this.animation.animFrame][0];
						this.sprite.y = this.locations.active[this.animation.animFrame][1];
						this.sprite.dx = this.locations.active[this.animation.animFrame][2] === undefined ? 0 : this.locations.active[this.animation.animFrame][2];

						// following line needs to be moved to somehwwere where it changes once per new new frame
						this.width = 50 + this.sprite.dx;

						if (this.ImageReady) {
								this.ctx.drawImage(this.PlayerImage, this.sprite.x, this.sprite.y, this.width * 0.75, this.height * 0.75, this.x, this.y, this.width, this.height);
						}
						// console.log(this.animation);
				}
		}]);

		return Zero;
})(Player);