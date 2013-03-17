function Puzzle(canvasId) {
	this.canvas = document.getElementById(canvasId);
}

Puzzle.prototype = {
	canvas : null, // Canvas that everything is drawn to
	srcData : null, // Original data of the source image
	dispData : null, //Image data to be displayed on the canvas
	numColorBins : 4,

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

		if (!scope)
			scope = this;
		self = this;

		image.onload = function() {
		        loadImageData.call(self);
			callback.call(scope);
		};

		image.src = url;

		function loadImageData() {
		    var ratio, width, height;
		    ratio = image.width/image.height; 
		    if (image.width > image.height) {
			width = this.canvas.width;
			height = width/ratio;
		    }
		    else {
			height = this.canvas.height;
			width = height * ratio;
		    }
	
			ctx.drawImage(image, 0, 0, width, height);
			this.srcData = ctx.getImageData(0, 0, width, height)
			this.dispData = ctx.createImageData(this.srcData);
		}

	},

	draw : function() {
		var ctx;
		ctx = this.getContext();
		// ctx.putImageData(this.dispData, 0, 0);
	},

	addColor : function(color) {
		var self = this;
		
		// FUNCTION
		function nearestColor(colorValue) {
			return Math.floor(colorValue * self.numColorBins / 256)*64+32;
		}
		
		var s = this.srcData.data;

		for (var i = 0; i < this.srcData.data.length - 4; i += 4) {
			if (nearestColor(s[i]) === color.red && nearestColor(s[i + 1]) === color.green && nearestColor(s[i + 2]) === color.blue) {
				this.dispData.data[i] = this.srcData.data[i];
				this.dispData.data[i + 1] = this.srcData.data[i + 1];
				this.dispData.data[i + 2] = this.srcData.data[i + 2];
				this.dispData.data[i + 3] = this.srcData.data[i + 3];
			}
		}
	}
}
