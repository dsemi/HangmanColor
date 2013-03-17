var puzzle, colorPanel, imgpath;

puzzle = new Puzzle('puzzle');

var pRequest = new AJAX('puzzle.py/');
pRequest.onSuccess = function(response) {
	imgpath = response;
	puzzle.setImage(imgpath, function() {
		puzzle.draw();
	});
}

pRequest.onFail = function() {
	puzzle.setImage('images/blackbear.jpg', function() {
		puzzle.draw();
	});
}

pRequest.send('GET', 'puzzle_gen');

colorPanel = new ColorPanel('color_panel', function(evt) {
	var index, color;
	index = evt.target.getAttribute('index');
	color = colorPanel.colors[index];

	puzzle.addColor(color);
	puzzle.draw();
});

document.getElementById('guess_submit').addEventListener('click', function() {
	var guess, submit;
	guess = document.getElementById('guess_input').value;
	submit = new AJAX('puzzle.py/');
	submit.onSuccess = function(response) {
		alert(response);
	};

	submit.onFail = function() {
		alert(guess);
	}

	submit.send('GET', 'soln', {
		guess : guess,
		filepath : imgpath
	});
});

