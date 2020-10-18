"use strict"
// Takes in an array of 2D objects that can have their coordinates
// retreived by object.getLocation and damaged by object.hit()
;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollisionCalculator = (function () {
  function CollisionCalculator(players, debris) {
    _classCallCheck(this, CollisionCalculator);

    this.players = players;
    this.debris = debris;
  }

  _createClass(CollisionCalculator, [{
    key: "calculate",
    value: function calculate() {
      // this.distance();
      for (var i = 0; i < this.players.length; i++) {
        for (var j = 0; j < this.debris.length; j++) {
          var detected = this.detectCollision(this.players[i], this.debris[j]);
          if (detected) return detected; // only return if detected to allow scans of other players
        }
      }
      return detected;
    }
  }, {
    key: "distance",
    value: function distance() {
      var distance;
      for (var i = 0; i < this.players.length; i++) {
        for (var j = 0; j < this.debris.length; j++) {
          distance = this.pythagoras(this.players[i].x, this.players[i].y, this.debris[j].x, this.debris[j].y);
          console.log(this.players.length);
          if (i == 1) {
            console.log(distance);
          }
        }
      }
    }
  }, {
    key: "pythagoras",
    value: function pythagoras(x1, y1, x2, y2) {
      var result;
      result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return result;
    }
  }, {
    key: "detectCollision",
    value: function detectCollision(player, debris) {
      if (player.x < debris.x + debris.width && player.x + player.width > debris.x && player.y < debris.y + debris.height && player.height + player.y > debris.y) {
        // collision detected!
        console.log("BAMMM!!");
        player.hit("medium");
        player.status();
        debris.reset();
        return true;
      }
      console.log;
      return false;
    }
  }]);

  return CollisionCalculator;
})();