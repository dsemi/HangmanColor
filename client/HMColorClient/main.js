var puzzle, url, img_url;

url = 'http://li244-77.members.linode.com/';

img_url = 'images/blackbear.jpg';

puzzle = new Puzzle('puzzle');
puzzle.setImage(img_url, function() {
	puzzle.draw();
});

document.getElementById('add_button').addEventListener('click', function() {
	puzzle.addColor({
		red : 0,
		blue : 0,
		green : 0
	});
	puzzle.draw();

	var a = new AJAX('http://li244-77.members.linode.com/puzzle.py/');
	a.get('puzzle_gen', null, function(response) {
		alert(response);
	});

});

