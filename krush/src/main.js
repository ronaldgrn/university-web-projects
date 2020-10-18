var debug = false;

if (debug === true){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = '#bgCanvas {opacity: 0 !important;}';
	document.body.appendChild(css);

	// Autoreload for the most tedious parts
	// setTimeout(function(){
	//  window.location.reload(1);
	// }, 5000);
}

// Static dimensions for all canvai
var canvasWidth = 600;
var canvasHeight = 500
var dead = 0; // controls when the game ends

// Backgroud for easy testing
var canvasBG = document.createElement("canvas");
canvasBG.id = "bgCanvas";
canvasBG.width = canvasWidth;
canvasBG.height = canvasHeight;
document.getElementById('target').appendChild(canvasBG);

// Create P1 Canvas
var canvasP1 = document.createElement("canvas");
canvasP1.width = canvasWidth;
canvasP1.height = canvasHeight;
document.getElementById('target').appendChild(canvasP1);

// Create P2 Canvas
var canvasP2 = document.createElement("canvas");
canvasP2.width = canvasWidth;
canvasP2.height = canvasHeight;
document.getElementById('target').appendChild(canvasP2);

// Create Projectile Canvas
var canvasProjectile = document.createElement("canvas");
canvasProjectile.width = canvasWidth;
canvasProjectile.height = canvasHeight;
document.getElementById('target').appendChild(canvasProjectile);

// // Create Debris Canvas
// var canvasDebris1 = document.createElement("canvas");
// canvasDebris1.width = canvasWidth;
// canvasDebris1.height = canvasHeight;
// document.getElementById('target').appendChild(canvasDebris1);

// // Create Debris Canvas
// var canvasDebris2 = document.createElement("canvas");
// canvasDebris2.width = canvasWidth;
// canvasDebris2.height = canvasHeight;
// document.getElementById('target').appendChild(canvasDebris2);

// // Create Debris Canvas
// var canvasDebris3 = document.createElement("canvas");
// canvasDebris3.width = canvasWidth;
// canvasDebris3.height = canvasHeight;
// document.getElementById('target').appendChild(canvasDebris3);

// Create Timer Canvas
var canvasTimer = document.createElement("canvas");
canvasTimer.width = canvasWidth;
canvasTimer.height = canvasHeight;
document.getElementById('target').appendChild(canvasTimer);

var LAZORS = []; // will be populated by Player class

// Create Timer
var GameTimer = new Timer(canvasTimer);

// Create Players
var P1 = new Zero(canvasP1, "Zero", 1000, 10, 10, 2, LAZORS);
var P2 = new GreenZero(canvasP2, "Green Zero", 1000, (canvasWidth - 100), (canvasHeight - 100), 2, LAZORS);

//var Rock1 = new Debris(canvasDebris1, 7);
//var Rock2 = new Debris(canvasDebris2, 50);
//var Rock3 = new Debris(canvasDebris3, 75);


// objects are stored here as references XD
var PLAYERS = [P1, P2];
var DEBRIS = []; //= [Rock1, Rock2, Rock3];
var DEBRIS_CANVAS = [];
createDebris(3);
var DebrisCollision = new CollisionCalculator(PLAYERS, DEBRIS);
var LazorCollision = new CollisionCalculator(PLAYERS, LAZORS);

function createDebris(count) {
  DEBRIS = [];
  DEBRIS_CANVAS = [];
  
  for (var i = 0; i < count; i++) {
    var speed = Math.random() * 150;
    DEBRIS_CANVAS[i] = document.createElement("canvas");
    DEBRIS_CANVAS[i].width = canvasWidth;
    DEBRIS_CANVAS[i].height = canvasHeight;
    document.getElementById('target').appendChild(DEBRIS_CANVAS[i]);
    
    DEBRIS[i] = new Debris(DEBRIS_CANVAS[i], speed);
  }
}

var keysDown = {};
addEventListener("keydown", function (e) {
	// ignore press and repeat effect
	if (!keysDown[e.keyCode]){
		keysDown[e.keyCode] = true;
		console.log(e.keyCode);
		
		// reset counter to prevent sticking
  	for (var i = 0, len = PLAYERS.length; i < len; i++) {
  	  PLAYERS[i].resetAnimation();
  	}
	}
	
	
  // kill default action for arrow keys and spacebar
  switch(e.keyCode){
      case 37: case 39: case 38:  case 40: // Arrow keys
      case 32: e.preventDefault(); break; // Space
      default: break; // do not block other keys
  }

}, false);

addEventListener("keyup", function (e) {
	// ignore press and repeat effect
	if(keysDown[e.keyCode]){
		delete keysDown[e.keyCode];
		// reset counter to prevent sticking
  	for (var i = 0, len = PLAYERS.length; i < len; i++) {
  	  PLAYERS[i].resetAnimation();
  	}
	}
}, false);


var handleInput = function() {
	// Stop moving all players
	for (var i = 0, len = PLAYERS.length; i < len; i++) {
	  // By commenting out this line we get a completely differnt game
	  PLAYERS[i].moveNone();
	}

	// Player1 Movement
	if (32 in keysDown)
		P1.fire();
		
	if (65 in keysDown)
		P1.moveLeft();

	if (87 in keysDown)
		P1.moveUp();

	if (68 in keysDown)
		P1.moveRight();

	if (83 in keysDown)
		P1.moveDown();

	if (!(65 in keysDown || 87 in keysDown || 68 in keysDown || 83 in keysDown || 32 in keysDown)){
		P1.moveIdle();
	}

	// Player2 Movement
	if (96 in keysDown || 190 in keysDown)
		P2.fire();
		
	if (37 in keysDown)
		P2.moveLeft();

	if (38 in keysDown)
		P2.moveUp();

	if (39 in keysDown)
		P2.moveRight();

	if (40 in keysDown)
		P2.moveDown();

	if (!(37 in keysDown || 38 in keysDown || 39 in keysDown || 40 in keysDown || 96 in keysDown || 190 in keysDown)){
		P2.moveIdle();
	}
}

var updateHealth = function () {
	if(P1.health <= 0){
		P1.health = 0;
		endgame(2);
		// P1.die();
		// P2.pose();
	}
	if(P2.health <= 0){
		P2.health = 0;
		endgame(1);
		// P2.die();
		// P1.pose();
	}

	// need a better function that autogenerates stuff
	document.getElementById("health1").innerHTML = P1.health;
	document.getElementById("health2").innerHTML = P2.health;
}


var update = function (elapsed) {
	// Move
	for (var i = 0, len = PLAYERS.length; i < len; i++) {
	  PLAYERS[i].update(elapsed);
	}
};


var render = function () {
	// Draw all players xD
	for (var i = 0, len = PLAYERS.length; i < len; i++) {
	  PLAYERS[i].draw();
	}

	// P2.draw();
};

// Main game loop
var main = function () {
	if(dead === 0){
		// Update clock
		GameTimer.update();

		// Calculate time since last frame
		var now = Date.now();
		var delta = (now - last);
		last = now;

		// Handle any user input
		handleInput();

		// Update game objects
		update(delta);

		// Render to the screen
		render();
		
		// Ping rock to sync up animations
		for (var i = 0, len = DEBRIS.length; i < len; i++) {
		  DEBRIS[i].ping(delta);
		}
		
		if(DebrisCollision.calculate()){
		  // collison detected run update health routine!!
		  updateHealth();
		}

		// clean up lazors
		for (var j = 0, len = LAZORS.length; j < len; j++) {
		  if(LAZORS[j].done === 1){
		  	LAZORS.splice(j, 1);
		  	break;
		  }
		}

		if(LazorCollision.calculate()){
		  // collison detected run update health routine!!
		  updateHealth();
		}

		// console.log(P2);
		// console.log(keysDown);
		requestAnimationFrame(main);
	}
};


// Create ENd Canvas
var canvasEnd = document.createElement("canvas");
canvasEnd.width = canvasWidth;
canvasEnd.height = canvasHeight;
document.getElementById('target').appendChild(canvasEnd);

var endgame = function(player){
	canvas = canvasEnd;
	ctx = canvasEnd.getContext("2d");

	dead = 1;

	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER, PLAYER " + player + " WON" , canvas.width/2, canvas.height/2); 
    
	setTimeout(function(){
	   window.location.reload(1);
	}, 3000);
}


// One time initializations
updateHealth();

// Start the main game loop!
var last = Date.now();
// setInterval(main, 1);
main();