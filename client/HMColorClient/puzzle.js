function Puzzle(canvasId) {
	this.canvas = document.getElementById(canvasId);
}

Puzzle.prototype = {
	canvas : null, // Canvas that everything is drawn to
	srcData : null, // Original data of the source image
	dispData : null, //Image data to be displayed on the canvas

	getContext : function() {
		return this.canvas.getContext('2d');
	},

	getImageData : function() {
		return this.getContext().getImageData(0, 0, this.canvas.width, this.canvas.height);
	},

	setImage : function(url, callback, scope) {
		var image, width, height, self, ctx;
		width = this.canvas.width;
		height = this.canvas.height;
		ctx = this.getContext();

		image = new Image();
		image.width = width;
		image.height = height;

		if (!scope)
			scope = this;
		self = this;

		image.onload = function() {
			loadImageData.call(self);
			callback.call(scope);
		};
		
		image.src = url;
		
		function loadImageData() {
			ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
			this.srcData = ctx.getImageData(0, 0, width, height)
			this.dispData = ctx.createImageData(this.srcData);
		}
	},

	draw : function() {
		var ctx;
		ctx = this.getContext();
		ctx.putImageData(this.dispData, 0, 0);
	},

	addColor : function(color) {
		var s = this.srcData.data;

		for (var i = 0; i < this.srcData.data.length - 4; i += 4) {
			if (s[i] === color.red && s[i + 1] === color.green && s[i + 2] === color.blue) {
				this.dispData.data[i] = this.srcData.data[i];
				this.dispData.data[i+1] = this.srcData.data[i+1];
				this.dispData.data[i+2] = this.srcData.data[i+2];
				this.dispData.data[i+3] = this.srcData.data[i+3];
			}
		}
	}
}
