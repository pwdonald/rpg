var PhysicsEngine = (function() {
	var engine = {};

	engine.Actor = function(x, y, vx, vy, maxVelocity, movementSpeed, controllable) {
		this.x = x || 0;
		this.y = y || 0;
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.maxVelocity = maxVelocity || 0;
		this.movementSpeed = movementSpeed || 1;
		this.controllable = controllable || false;
		this.size = size || 32;

		this.moveLeft = function() {
			if (this.vx >= this.maxVelocity * -1) {
				this.vx -= this.movementSpeed;
			}
		}.bind(this);

		this.moveRight = function() {
			if (this.vx <= this.maxVelocity) {
				this.vx += this.movementSpeed;
			}
		}.bind(this);

		this.moveUp = function() {
			if (this.vy >= this.maxVelocity * -1) {
				this.vy -= this.movementSpeed;
			}
		}.bind(this);

		this.moveDown = function() {
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
	engine.FRICTION = 0.3;
	
	var 

	engine.calculatePhysics = function() {
		var actors = engine.actors || [];

		for (var i = 0; i < actors.length; i++) {
			var actor = actors[i];
			
			for (var j = 0; j < engine.blockers.length; j++) {
				
			}
			
			actor.x += actor.vx;
			actor.y += actor.vy;

			if (actor.vx !== 0) {
				if (actor.vx > 0) {
					actor.vx -= engine.FRICTION;
				} else {
					actor.vx += engine.FRICTION;
				}

				if (Math.abs(actor.vx) < engine.FRICTION) {
					actor.vx = 0;
				}
			}

			if (actor.vy !== 0) {
				if (actor.vy > 0) {
					actor.vy -= engine.FRICTION;
				} else {
					actor.vy += engine.FRICTION;
				}

				if (Math.abs(actor.vy) < engine.FRICTION) {
					actor.vy = 0;
				}
			}
		}
	};

	return engine;
}());