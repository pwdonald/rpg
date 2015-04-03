var PhysicsEngine = (function() {
	var engine = {};

	engine.Actor = function(x, y, vx, vy, maxVelocity, movementSpeed, controllable, size) {
		this.tileX = 0;
		this.tileY = 0;
		this.x = x || 0;
		this.y = y || 0;
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.maxVelocity = maxVelocity || 0;
		this.movementSpeed = movementSpeed || 1;
		this.controllable = controllable || false;
		this.size = size || 32;

		this.moveLeft = function() {
			this.tileX = Math.round(this.x / this.size) - 1;
			this.tileY = Math.round(this.y / this.size);
			if (this.vx >= this.maxVelocity * -1) {
				this.vx -= this.movementSpeed;
			}
		}.bind(this);

		this.moveRight = function() {
			this.tileX = Math.round(this.x / this.size) + 1;
			this.tileY = Math.round(this.y / this.size);
			if (this.vx <= this.maxVelocity) {
				this.vx += this.movementSpeed;
			}
		}.bind(this);

		this.moveUp = function() {
			this.tileX = this.x + this.size / this.size;
			this.tileY = this.y + this.size / this.size - 1;
			if (this.vy >= this.maxVelocity * -1) {
				this.vy -= this.movementSpeed;
			}
		}.bind(this);

		this.moveDown = function() {
			this.tileX = Math.round(this.x / this.size);
			this.tileY = Math.round(this.y / this.size) + 1;
			if (this.vy <= this.maxVelocity) {
				this.vy += this.movementSpeed;
			}
		}.bind(this);

		engine.actors.push(this);
		return this;
	};

	engine.addBlocker = function(x, y, size) {
		engine.blockers.push({
			x: x,
			y: y,
			size: size || 32
		});
	};

	engine.actors = [];
	engine.blockers = [];
	engine.FRICTION = 1;

	function testCollision(a, b) {
		return a.x < b.x + b.size &&
			a.x + a.size > b.x &&
			a.y < b.y + b.size &&
			a.y + a.size > b.y;
	}

	engine.calculatePhysics = function() {
		var actors = engine.actors || [];

		for (var i = 0; i < actors.length; i++) {
			var actor = actors[i];
			
			actor.y += actor.vy;
			actor.x += actor.vx;
			
			if (Math.round(actor.y / actor.size) === actor.tileY) {
				actor.vy = 0;
			}
			
			if(Math.round(actor.x / actor.size) === actor.tileX) {
				actor.vx = 0;
			}

			if (actor.vx !== 0) {
				if (actor.vx > 0) {
					actor.vx -= engine.FRICTION;
				} else {
					actor.vx += engine.FRICTION;
				}

				if (Math.abs(actor.vx) <= engine.FRICTION) {
					actor.vx = 0;
				}
			}

			if (actor.vy !== 0) {
				if (actor.vy > 0) {
					actor.vy -= engine.FRICTION;
				} else {
					actor.vy += engine.FRICTION;
				}

				if (Math.abs(actor.vy) <= engine.FRICTION) {
					actor.vy = 0;
				}
			}
		}
	};

	return engine;
}());