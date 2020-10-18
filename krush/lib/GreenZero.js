"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GreenZero = (function (_Player) {
		_inherits(GreenZero, _Player);

		function GreenZero() {
				_classCallCheck(this, GreenZero);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(GreenZero).apply(this, arguments));
		}

		_createClass(GreenZero, [{
				key: "constructorHack",
				value: function constructorHack() {
						this.setImage("sprites/sprite2.png");
						this.width = 50;
						this.height = 60;

						//this.animation.animDelay = 100;

						this.locations.idle = [[159, 11, -2], [197, 11], [235, 11], [273, 11], [235, 11], [197, 11]];

						this.locations.walk = [
						//  [311, 12, -8],
						[345, 12, -11], [376, 11], [414, 13, 1], [456, 13, -3], [491, 14, -10], [522, 14, -8], [556, 12], [594, 12, -2], [630, 13, -5], [665, 13, -3]];

						this.locations.idle_reverse = [[1566, 11, -2], [1528, 11], [1490, 11], [1452, 11], [1490, 11], [1528, 11]];

						this.locations.walk_reverse = [
						//  [1418, 12, -8],
						[1387, 12, -11], [1349, 11], [1307, 13, 1], [1272, 13, -4], [1241, 14, -10], [1207, 14, -8], [1169, 12], [1133, 12, -2], [1098, 13, -5], [1065, 13, -6]];
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

		return GreenZero;
})(Player);