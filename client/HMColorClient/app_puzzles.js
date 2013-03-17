var puzzleList = document.getElementById('puzzle_list');

var getPuzzles = new AJAX('puzzle.py/');
getPuzzles.onSuccess = loadList;
getPuzzles.onFail = function() {
	loadList('FAIL');
}
getPuzzles.send('POST', 'list_puzzles');

function loadList(puzzleString) {
	var puzzleURLs, listItem, link;
	puzzleURLs = puzzleString.split('\n');

	for (var i = 0; i < puzzleURLs.length - 1; i++) {
		listItem = document.createElement('li');
		puzzleList.appendChild(listItem);

		link = document.createElement('a');
		link.setAttribute('href', puzzleURLs[i]);
		link.innerHTML = 'Puzzle ' + (i + 1);
		
		listItem.appendChild(link);		
	}
}
