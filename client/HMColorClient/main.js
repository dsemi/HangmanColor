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
	puzzle.setImage('images/blackbear.jpg', function() {
		puzzle.draw();
	});
}

puzzleRequest.send('GET', 'puzzle_gen');

colorPanel = new ColorPanel('color_panel', function(evt) {
	var index, color;
	index = evt.target.getAttribute('index');
	color = colorPanel.colors[index];

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


document.getElementById('guess_submit').addEventListener('click', submitForm);
document.getElementById('guess_input').addEventListener('keypress', function(e) {
	if(e.keyCode == 13) {
		submitForm();
	}
});

