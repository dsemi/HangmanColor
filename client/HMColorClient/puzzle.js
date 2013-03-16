function Puzzle(id) {
	this.canvas = document.getElementById(id);
}

Puzzle.prototype = {
	canvas: null,
	image: null,
	
	setImage: function(url, callback, scope) {
		if (!scope)
			scope = this;
		
		this.image = new Image();
		this.image.width = 100// this.canvas.width;
		this.image.height = 100 //this.canvas.height;
		this.image.onload = function() {
			callback.call(scope);
		};
		this.image.src = url;
	},
	
	drawImage: function() {
		var ctx;
		ctx = this.canvas.getContext('2d');
		ctx.drawImage(this.image, 0, 0);
	}
}
