window.onload = function() {
	var game = new Phaser.Game(480, 480, Phaser.AUTO, '', { create: create });
	var steps = 0;
	var map = null;
	var info = null;

	function create() {
		game.stage.backgroundColor = '#ffffff';
		game.input.onDown.add(onDown, this);

		map = new Map(game);
		map.render();
		
		info = game.add.text(2, 2, '', { font: 'bold 16px System', fill: '#FF0000' });
	
		var timer = this.game.time.create(false);
		timer.loop(750, update, this);
		timer.start();
		
		console.log('Step time: 750');
	}
	
	function update() {
		map.step();
		
		info.text = 'Cells: ' + map.aliveCells + '\nSteps: ' + 
					(++steps) + '\nClick or touch to reset';
						
		console.log('Cells: ' + map.aliveCells + '\nSteps: ' + steps);
	}
	
	function onDown(pointer) {
		info.text = '';
		steps = 0;
		
		map.reset();
		map.render();
	}
};