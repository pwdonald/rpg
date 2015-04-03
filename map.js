var TileMap = (function() {
	var tileTypes = {
		grass: 'green',
		water: 'blue',
		rock: 'grey'
	};
	
	var Tile = function(type, collide) {
		this.type = type || tileTypes.grass;
		this.collide = collide || false;
	};
	
	var Map = function(width, height, tileSize) {
		this.data = [];
		this.width = width || 100;
		this.height = height || 100;
		this.tileSize = tileSize || 32;
		this.generate();
	};
	
	Map.prototype.generate = function () {
		for (var x = 0; x < this.width; x++) {
			if (!this.data[x]) {
				this.data[x] = [];
			}
			
			for (var y = 0; y < this.height; y++) {
				var newTile = new Tile();
				this.data[x].push(newTile);
			}
		}
	};
	
	return Map;
}());