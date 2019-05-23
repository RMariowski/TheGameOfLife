class Map {
  constructor(phaser) {
    this.graphics = phaser.add.graphics({ fillStyle: { color: 0x000000 } });
    this.cells = [];
    this.aliveCells = 0;
    this.reset();
  }

  reset() {
    this.graphics.clear();
    
    const cellsOnWidth = 480 / 8;
    const cellsOnHeight = 480 / 8;
    
    for (let y = 0; y < cellsOnHeight; y++) {
      this.cells[y] = [];
      for (let x = 0; x < cellsOnWidth; x++) {
        this.cells[y][x] = new Cell();
        // 10000 = 100.00%
        const makeItAlive = Math.floor(Math.random() * 10000);
        if (makeItAlive <= 4500 /* 45.00% */) this.cells[y][x].isDead = false;
      }
    }
  }

  step() {
    this.graphics.clear();
    for (let y = 0; y < this.cells.length; ++y) {
      for (let x = 0; x < this.cells[y].length; ++x) {
        this.cells[y][x].neighborsCount = 0;
        // LEFT-TOP
        if (x > 0 && y > 0 && !this.cells[y - 1][x - 1].isDead)
          this.cells[y][x].neighborsCount++;
        // TOP
        if (y > 0 && !this.cells[y - 1][x].isDead)
          this.cells[y][x].neighborsCount++;
        // RIGHT-TOP
        if (
          x < this.cells[y].length - 1 &&
          y > 0 &&
          !this.cells[y - 1][x + 1].isDead
        )
          this.cells[y][x].neighborsCount++;
        // LEFT
        if (x > 0 && !this.cells[y][x - 1].isDead)
          this.cells[y][x].neighborsCount++;
        // RIGHT
        if (x < this.cells[y].length - 1 && !this.cells[y][x + 1].isDead)
          this.cells[y][x].neighborsCount++;
        // LEFT-DOWN
        if (
          x > 0 &&
          y < this.cells.length - 1 &&
          !this.cells[y + 1][x - 1].isDead
        )
          this.cells[y][x].neighborsCount++;
        // DOWN
        if (y < this.cells.length - 1 && !this.cells[y + 1][x].isDead)
          this.cells[y][x].neighborsCount++;
        // RIGHT-DOWN
        if (
          x < this.cells[y].length - 1 &&
          y < this.cells.length - 1 &&
          !this.cells[y + 1][x + 1].isDead
        )
          this.cells[y][x].neighborsCount++;
      }
    }
    this.updateCells();
    this.render();
  }

  updateCells() {
    for (let y = 0; y < this.cells.length; ++y) {
      for (let x = 0; x < this.cells[y].length; ++x) {
        if (this.cells[y][x].isDead && this.cells[y][x].neighborsCount == 3) {
          this.cells[y][x].isDead = false;
        } else if (
          this.cells[y][x].neighborsCount > 3 ||
          this.cells[y][x].neighborsCount < 2
        ) {
          this.cells[y][x].isDead = true;
        }
      }
    }
  }

  render() {
    this.aliveCells = 0;
    for (let y = 0; y < this.cells.length; ++y) {
      for (let x = 0; x < this.cells[y].length; ++x) {
        if (!this.cells[y][x].isDead) {
          let rect = new Phaser.Geom.Rectangle(x * 8, y * 8, 8, 8);
          this.graphics.fillRectShape(rect);
          this.aliveCells++;
        }
      }
    }
  }
}
