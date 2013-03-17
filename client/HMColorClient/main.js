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
	var swatch, color, scorePanel;
	scorePanel = document.getElementById('score_panel');
	scorePanel.innerHTML = colorPanel.score;

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
	};

	submit.send('GET', 'soln', {
		guess : guess,
		filepath : imgpath
	});
}

var guessInput, guessSubmit;
guessInput = document.getElementById('guess_input');
guessSubmit = document.getElementById('guess_submit');

guessSubmit.addEventListener('click', submitGuess);
guessInput.addEventListener('keypress', function(e) {
	if (e.keyCode == 13) {
		submitGuess();
		guessInput.value = '';
	}
});

document.getElementById('puzzles_button').addEventListener('click', function() {
	window.location.href = 'puzzles.html';
});
