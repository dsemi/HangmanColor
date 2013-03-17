var puzzle, colorPanel;

var a = new AJAX('puzzle.py/');
puzzle = new Puzzle('puzzle');

a.onSuccess = function(response) {
	puzzle.setImage(response, function() {
		puzzle.draw();
	});
}

a.onFail = function() {
	puzzle.setImage('images/blackbear.jpg', function() {
		puzzle.draw();
	});
}

a.send('GET', 'puzzle_gen');

colorPanel = new ColorPanel('color_panel', function(evt) {
	var index, color;
	index = evt.target.getAttribute('index');
	color = colorPanel.colors[index];
	
	puzzle.addColor(color);
	puzzle.draw();
});
