var FPS = 60,
	canvas = document.getElementById('screen'),
	ctx = canvas.getContext('2d'),
	map = new TileMap(),
	physics = PhysicsEngine,
	DEBUG = true;

var viewport = {
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height
};


var Player = function(tileX, tileY, name, type, exp, gold, items, actor) {
	physics.Actor.apply(this);
	this.tileX = tileX || 0;
	this.tileY = tileY || 0;
	this.x = this.tileX * this.size;
	this.y = this.tileY * this.size;
	this.name = name || 'Default Player';
	this.type = type || 'Peasant';
	this.exp = exp || 0;
	this.items = items || [];
	this.controllable = true;
	this.maxVelocity = 1;
	this.movementSpeed = 1;
	this.size = map.tileSize || 32;
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		ctx.rect(this.x, this.y, this.size, this.size);
		ctx.closePath();
		ctx.fill();
	}.bind(this);
};

Player.prototype = physics.Actor;
Player.prototype.constructor = Player;

// var player = new physics.newActor(0, 0, 0, 0, 2, 1, true),
var player = new Player(2, 2),
	actors = physics.actors;

var keysDown = {
	left: false,
	right: false,
	up: false,
	down: false
};

var mouseDown = {
	right: false
};

ctx.translate(0.5, 0.5);

function drawActors() {
	for (var i = 0; i < actors.length; i++) {
		actors[i].draw(ctx);
	}
}

function drawTile(x, y, tileSize, tile) {
	x = x * tileSize;
	y = y * tileSize;

	if (DEBUG) {
		ctx.beginPath();
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 1;
		ctx.closePath();
	}

	ctx.beginPath();
	ctx.fillStyle = tile.type;
	ctx.rect(x, y, x + tileSize, y + tileSize);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function drawVisibleMap() {
	physics.blockers = [];
	for (var x = viewport.x; x < viewport.x + Math.round(canvas.width / map.tileSize); x++) {
		for (var y = viewport.y; y < viewport.y + Math.round(canvas.height / map.tileSize); y++) {
			drawTile(x, y, map.tileSize, map.data[x][y]);
			if (map.data[x][y].collide) {
				physics.addBlocker(x, y, map.tileSize);
			}
		}
	}
}

function drawScreen() {
	setTimeout(function() {
		requestAnimationFrame(drawScreen, canvas);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		drawVisibleMap(map);
		handleKeys();
		drawActors();
		physics.calculatePhysics();
		ctx.restore();
	}, 1000 / FPS)
}

function handleKeys() {
	for (var i = 0; i < actors.length; i++) {
		var actor = actors[i];
		if (actor.controllable) {
			if (keysDown.left) {
				actor.moveLeft();
			}

			if (keysDown.right) {
				actor.moveRight();
			}

			if (keysDown.up) {
				actor.moveUp();
			}

			if (keysDown.down) {
				actor.moveDown();
			}

			if (mouseDown.right) {
				actor.mouseMove();
			}
		}
	}
}

window.addEventListener("keydown", function(e) {
	if (e.keyCode === 37) {
		keysDown.left = true;
	}

	if (e.keyCode === 38) {
		keysDown.up = true;
	}

	if (e.keyCode === 39) {
		keysDown.right = true;
	}

	if (e.keyCode === 40) {
		keysDown.down = true;
	}
});

window.addEventListener("keyup", function(e) {
	if (e.keyCode === 37) {
		keysDown.left = false;
	}

	if (e.keyCode === 38) {
		keysDown.up = false;
	}

	if (e.keyCode === 39) {
		keysDown.right = false;
	}

	if (e.keyCode === 40) {
		keysDown.down = false;
	}
});

/* window.addEventListener('mousedown', function(evt) {
	if (evt.button === 2) {
		mouseDown.right = true;
	}
});

window.addEventListener('mouseup', function(evt) {
	if (evt.button === 2) {
		mouseDown.right = false;
	}
}); */

canvas.oncontextmenu = function(e) {
	return false;
};

/* canvas.addEventListener('mousemove', function(evt) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = evt.offsetX;
	var mouseY = evt.offsetY;
	player.target(mouseX, mouseY);
}); */

drawScreen();