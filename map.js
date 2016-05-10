function Map(game) {
	this.graphics = game.add.graphics(0, 0);
	this.cells = [];
	this.aliveCells = 0;
	
	this.reset();
}

Map.prototype.reset = function() {
	this.graphics.clear();
	
	var cellsOnWidth = 480 / 8;
	var cellsOnHeight = 480 / 8;
	
	for	(y = 0; y < cellsOnHeight; y++) {
		this.cells[y] = [];
		
		for	(x = 0; x < cellsOnWidth; x++) {
			this.cells[y][x] = new Cell();
			
			// 10000 = 100.00%
			var makeItAlive = (Math.floor(Math.random() * 10000));
			if (makeItAlive <= 4500 /* 45.00% */)
				this.cells[y][x].isDead = false;
		}
	}
};

Map.prototype.step = function() {
	this.graphics.clear();
	
	for	(y = 0; y < this.cells.length; ++y) {
		for	(x = 0; x < this.cells[y].length; ++x) {
			this.cells[y][x].neighborsCount = 0;
			
			// LEFT-TOP
			if (x > 0 && y > 0 && !this.cells[y - 1][x - 1].isDead)
				this.cells[y][x].neighborsCount++;
				
			// TOP
			if (y > 0 && !this.cells[y - 1][x].isDead)
				this.cells[y][x].neighborsCount++;
					
			// RIGHT-TOP
			if (x < this.cells[y].length - 1 && y > 0 && !this.cells[y - 1][x + 1].isDead)
				this.cells[y][x].neighborsCount++;
					
			// LEFT
			if (x > 0 && !this.cells[y][x - 1].isDead)
				this.cells[y][x].neighborsCount++;
					
			// RIGHT
			if (x < this.cells[y].length - 1 && !this.cells[y][x + 1].isDead)
				this.cells[y][x].neighborsCount++;
					
			// LEFT-DOWN
			if (x > 0 && y < this.cells.length - 1 && !this.cells[y + 1][x - 1].isDead)
				this.cells[y][x].neighborsCount++;
				
			// DOWN
			if (y < this.cells.length - 1 && !this.cells[y + 1][x].isDead)
				this.cells[y][x].neighborsCount++;
			
			// RIGHT-DOWN
			if (x < this.cells[y].length - 1 && y < this.cells.length - 1 && !this.cells[y + 1][x + 1].isDead)
				this.cells[y][x].neighborsCount++;
		}
	}
	
	this.updateCells();
	this.render();
};

Map.prototype.updateCells = function() {
	for	(y = 0; y < this.cells.length; ++y) {
		for	(x = 0; x < this.cells[y].length; ++x) {
			if (this.cells[y][x].isDead && this.cells[y][x].neighborsCount == 3) {
				this.cells[y][x].isDead = false;
			} else if (this.cells[y][x].neighborsCount > 3 || this.cells[y][x].neighborsCount < 2) {
				this.cells[y][x].isDead = true;
			}
		}
	}
};

Map.prototype.render = function() {
	this.graphics.beginFill(0x000000);
	
	this.aliveCells = 0;
	for	(y = 0; y < this.cells.length; ++y) {
		for	(x = 0; x < this.cells[y].length; ++x) {
			if (!this.cells[y][x].isDead) {
				this.graphics.drawRect(x * 8, y * 8, 8, 8);
				this.aliveCells++;
			}
		}
	}
	
	this.graphics.endFill();
};
