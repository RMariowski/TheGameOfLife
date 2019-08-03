import { Scene } from 'phaser';
import { Map } from './map';

export class MainScene extends Scene {
  private steps = 0;
  private map: Map = null;
  private info: Phaser.GameObjects.Text = null;

  constructor() {
    super({ key: 'MainScene' });
  }

  public create() {
    this.cameras.main.setBackgroundColor(0xfefefe);

    this.input.on('pointerdown', () => this.onDown(), this);

    this.map = new Map(this);
    this.map.render();

    this.info = this.add.text(2, 2, '', {
      font: 'bold 17px System',
      fill: '#FF0000'
    });
    this.info.setShadow(1, 1, '#000000', 3);

    const timeEvent = this.time.addEvent({
      delay: 850,
      callback: this.stepUpdate,
      loop: true,
      callbackScope: this
    });
    console.log(`Step time: ${timeEvent.delay}`);
  }

  private stepUpdate() {
    this.map.step();

    this.info.text = `Cells: ${this.map.aliveCells}\nSteps: ${++this
      .steps}\nClick or touch to reset`;

    console.log('Cells: ' + this.map.aliveCells + '\nSteps: ' + this.steps);
  }

  private onDown() {
    this.info.text = '';
    this.steps = 0;

    this.map.reset();
    this.map.render();
  }
}
