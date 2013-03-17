var puzzle, colorPanel, imgpath;

puzzle = new Puzzle('puzzle_canvas');

var getPuzzle = new AJAX('puzzle.py/');
getPuzzle.onSuccess = function(response) {
	imgpath = response;
	puzzle.setImage(imgpath, function() {
		puzzle.draw();
	});
}

getPuzzle.onFail = function() {
	imgpath = 'images/duck.jpg';
	puzzle.setImage(imgpath, function() {
		puzzle.draw();
	});
}

getPuzzle.send('GET', 'puzzle_gen', getQueryParams(window.location));

colorPanel = new ColorPanel('color_panel', function(evt) {
	var swatch, color, scoreValue;
	scoreValue = document.getElementById('score_value');
	scoreValue.innerHTML = colorPanel.score;

	swatch = evt.target;
	swatch.className += ' selected_swatch';

	color = colorPanel.colors[swatch.getAttribute('index')];
	puzzle.addColor(color);
	puzzle.draw();
});

function submitGuess() {
	var guess, submit;
	guess = document.getElementById('guess_input').value;
	submit = new AJAX('puzzle.py/');

	submit.onSuccess = function(response) {
		alert(response);
		puzzle.showImage();
	};

	submit.send('GET', 'soln', {
		guess : guess,	
		filepath : imgpath
	});
	
	// Clears the input text area
	document.getElementById('guess_input').value = '';
}

// Button listener to bring to puzzle list page.
document.getElementById('puzzles_button').addEventListener('click', function() {
	window.location.href = 'puzzles.html';
});

// Button listener to show upload page.
document.getElementById('upload_button').addEventListener('click', function() {
	window.open('upload.html', '_blank', 'width=400, height=200');
});


