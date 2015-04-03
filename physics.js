var PhysicsEngine = (function() {
	var engine = {};

	engine.Actor = function(x, y, vx, vy, maxVelocity, movementSpeed, controllable, size) {
		this.targetX = 64;
		this.targetY = 64;
		this.facing = Math.atan2(this.targetY, this.targetX);
		this.x = x || 0;
		this.y = y || 0;
		this.dy = 0;
		this.dx = 0;
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.maxVelocity = maxVelocity || 0;
		this.movementSpeed = movementSpeed || 1;
		this.controllable = controllable || false;
		this.size = size || 32;

		this.canIncreaseSpeedX = function() {
			var currentVelocityX = Math.abs(this.vx);

			if (currentVelocityX >= this.maxVelocity) {
				return false;
			}

			return true;
		}.bind(this);

		this.canIncreaseSpeedY = function() {
			var currentVelocityY = Math.abs(this.vy);

			if (currentVelocityY >= this.maxVelocity) {
				return false;
			}

			return true;
		}.bind(this);

		this.moveLeft = function() {
			if (this.canIncreaseSpeedX) {
				this.vx -= this.movementSpeed;
			}
			this.dx = this.x + this.vx;
		}.bind(this);

		this.moveRight = function() {
			if (this.canIncreaseSpeedX) {
				this.vx += this.movementSpeed;
			}
			this.dx = this.x + this.vx;
		}.bind(this);

		this.moveUp = function() {
			if (this.canIncreaseSpeedY) {
				this.vy -= this.movementSpeed;
			}
			this.dy = this.y + this.vy;
		}.bind(this);

		this.moveDown = function() {
			if (this.canIncreaseSpeedY) {
				this.vy += this.movementSpeed;
			}
			this.dy = this.y + this.vy;
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

	function testCollisionX(a, b) {
		return (a.dx < b.x + b.size &&
			a.dx + a.size > b.x);
	}

	function testCollisionY(a, b) {
		return (a.dy < b.y + b.size &&
			a.dy + a.size > b.y);
	}

	engine.calculatePhysics = function() {
		var actors = engine.actors || [];

		for (var i = 0; i < actors.length; i++) {
			var actor = actors[i];

			var canMoveX = true,
				canMoveY = true;

			for (var j = 0; j < engine.blockers.length; j++) {
				var blocker = engine.blockers[j];

				if (testCollisionX(actor, blocker)) {
					canMoveX = false;
				}

				if (testCollisionY(actor, blocker)) {
					canMoveY = false;
				}
			}

			if (canMoveX) {
				actor.x += actor.vx;
			}

			if (canMoveY) {
				actor.y += actor.vy;
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