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

var getKey = new AJAX('puzzle.py/');
getKey.onSuccess = function(response) {
    window.location.href = 'http://li244-77.members.linode.com/?im_file='+response;
}
console.log(getQueryParams(window.location));
if (getQueryParams(window.location) == null)
    getKey.send('POST', 'key_gen')

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

function changePuzzle(selectedObj) {
    window.location.href = selectedObj.value;
    
}

function submitGuess() {
	var guess, submit;
	guess = document.getElementById('guess_input').value;
	submit = new AJAX('puzzle.py/');

	submit.onSuccess = function(response) {
		var className, message;
		if (response == 'True') {
			className = 'correct';
			message = 'You Won with ' + puzzle.score + ' points!';
		} else {
			className = 'incorrect';
			message = 'Sorry, but you have lost.';
		}

		var confirmation = document.getElementById('confirmation_panel');
		confirmation.className = className;
		confirmation.innerHTML = message;

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
//document.getElementById('puzzles_button').addEventListener('click', function() {
//	window.location.href = 'puzzles.html';
//});
var getPuzzles = new AJAX('puzzle.py/');
getPuzzles.onSuccess = function(response) {
	loadList(response, "puzzles_dropdown")
};

getPuzzles.send('POST', 'list_puzzles');

function loadList(puzzleString, selectId) {
	var puzzleURLs, option, select;
	
	select = document.getElementById(selectId);
	puzzleURLs = puzzleString.split('\n');


	for (var i = 0; i < puzzleURLs.length - 1; i++) {
	    option = document.createElement('option');
	    option.value = puzzleURLs[i];
	    if (puzzleURLs[i] == window.location.href)
		option.selected = true;

	    option.innerHTML = 'Puzzle ' + (i + 1);
	    
	    select.appendChild(option);
	}
}

// Button listener to show upload page.
document.getElementById('upload_button').addEventListener('click', function() {
	window.open('upload.html', '_blank', 'width=400, height=200');
});

