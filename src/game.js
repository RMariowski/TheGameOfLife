const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scene: {
    create: create
  }
};
let game = new Phaser.Game(config);

let steps = 0;
let map = null;
let info = null;

function create() { 
  this.cameras.main.setBackgroundColor(0xffffff)
  this.input.on('pointerdown', (pointer) => onDown(pointer), this);
  
  map = new Map(this);
  map.render();
  
  info = this.add.text(2, 2, '', {
    font: 'bold 17px System',
    fill: '#FF0000'
  });
  info.setShadow(1, 1, '#000000', 3);

  this.timedEvent = this.time.addEvent({ delay: 750, callback: update, callbackScope: this, loop: true });
  console.log('Step time: 750');
}

function update() {
  map.step();
  info.text = `Cells: ${map.aliveCells}\nSteps: ${++steps}\nClick or touch to reset`;
  console.log('Cells: ' + map.aliveCells + '\nSteps: ' + steps);
}

function onDown(pointer) {
  info.text = '';
  steps = 0;

  map.reset();
  map.render();
}
