import 'phaser';
import { MainScene } from './main-scene';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    scene: MainScene
  };

  // tslint:disable-next-line: no-unused-expression
  new Game(config);
});
