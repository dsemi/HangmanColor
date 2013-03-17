var puzzle, url, img_url;

var a = new AJAX('puzzle.py/');

a.onSuccess = function(response) {
	puzzle = new Puzzle('puzzle');
	puzzle.setImage(response, function() {
		puzzle.draw();
	});
}

a.send('GET', 'puzzle_gen');

document.getElementById('add_button').addEventListener('click', function() {
	puzzle.addColor({
		red : 0,
		blue : 0,
		green : 0
	});
	puzzle.draw();
});

