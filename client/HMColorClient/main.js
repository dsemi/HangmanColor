var puzzle, colorPanel, imgpath;

puzzle = new Puzzle('puzzle_canvas');

var puzzleRequest = new AJAX('puzzle.py/');
puzzleRequest.onSuccess = function(response) {
	imgpath = response;
	puzzle.setImage(imgpath, function() {
		puzzle.draw();
	});
}

puzzleRequest.onFail = function() {
	puzzle.setImage('images/duck.jpg', function() {
		puzzle.draw();
	});
}

puzzleRequest.send('GET', 'puzzle_gen', getQueryParams(window.location));

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

function submitForm() {
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

guessSubmit.addEventListener('click', submitForm);
guessInput.addEventListener('keypress', function(e) {
	if (e.keyCode == 13) {
		submitForm();
		guessInput.value = '';
	}
});

