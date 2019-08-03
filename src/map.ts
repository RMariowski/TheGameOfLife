import { Cell } from './cell';
import { MainScene } from './main-scene';

export class Map {
  public aliveCells = 0;

  private cells = [];
  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: MainScene) {
    this.graphics = scene.add.graphics({ fillStyle: { color: 0x000000 } });

    this.reset();
  }

  public reset() {
    this.graphics.clear();

    const cellsOnWidth = 480 / 8;
    const cellsOnHeight = 480 / 8;

    for (let y = 0; y < cellsOnHeight; y++) {
      this.cells[y] = [];

      for (let x = 0; x < cellsOnWidth; x++) {
        this.cells[y][x] = new Cell();

        // 10000 = 100.00%
        const makeItAlive = Math.floor(Math.random() * 10000);
        if (makeItAlive <= 4500 /* 45.00% */) {
          this.cells[y][x].isDead = false;
        }
      }
    }
  }

  public step() {
    this.graphics.clear();

    for (let y = 0; y < this.cells.length; ++y) {
      for (let x = 0; x < this.cells[y].length; ++x) {
        this.cells[y][x].neighborsCount = 0;

        // LEFT-TOP
        if (x > 0 && y > 0 && !this.cells[y - 1][x - 1].isDead) {
          this.cells[y][x].neighborsCount++;
        }

        // TOP
        if (y > 0 && !this.cells[y - 1][x].isDead) {
          this.cells[y][x].neighborsCount++;
        }

        // RIGHT-TOP
        if (
          x < this.cells[y].length - 1 &&
          y > 0 &&
          !this.cells[y - 1][x + 1].isDead
        ) {
          this.cells[y][x].neighborsCount++;
        }

        // LEFT
        if (x > 0 && !this.cells[y][x - 1].isDead) {
          this.cells[y][x].neighborsCount++;
        }

        // RIGHT
        if (x < this.cells[y].length - 1 && !this.cells[y][x + 1].isDead) {
          this.cells[y][x].neighborsCount++;
        }

        // LEFT-DOWN
        if (
          x > 0 &&
          y < this.cells.length - 1 &&
          !this.cells[y + 1][x - 1].isDead
        ) {
          this.cells[y][x].neighborsCount++;
        }

        // DOWN
        if (y < this.cells.length - 1 && !this.cells[y + 1][x].isDead) {
          this.cells[y][x].neighborsCount++;
        }

        // RIGHT-DOWN
        if (
          x < this.cells[y].length - 1 &&
          y < this.cells.length - 1 &&
          !this.cells[y + 1][x + 1].isDead
        ) {
          this.cells[y][x].neighborsCount++;
        }
      }
    }

    this.updateCells();
    this.render();
  }

  public render() {
    this.aliveCells = 0;

    for (let y = 0; y < this.cells.length; ++y) {
      for (let x = 0; x < this.cells[y].length; ++x) {
        if (!this.cells[y][x].isDead) {
          const rect = new Phaser.Geom.Rectangle(x * 8, y * 8, 8, 8);
          this.graphics.fillRectShape(rect);

          this.aliveCells++;
        }
      }
    }
  }

  private updateCells() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isDead && cell.neighborsCount === 3) {
          cell.isDead = false;
        } else if (cell.neighborsCount > 3 || cell.neighborsCount < 2) {
          cell.isDead = true;
        }
      }
    }
  }
}
