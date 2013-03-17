function ColorPanel(panelId, clickListener) {
	this.panel = document.getElementById(panelId);
	this.colors = this.createColors(4);
	this.clickListener = clickListener;
	this.createSwatches();
}

ColorPanel.prototype = {
	panel : null,
	swatches : [],
	colors: [],
	clickListener: null,
	
	createColors: function(numValues) {
		var colors = [];

		for (var r = 0; r < numValues; r++) {
			for (var g = 0; g < numValues; g++) {
				for (var b = 0; b < numValues; b++) {
					colors.push({
						red : r * 64 + 128 / numValues,
						green : g * 64 + 128 / numValues,
						blue : b * 64 + 128 / numValues
					});
				}
			}
		}

		var sortedColors = [];
		for (var i = 0; i < colors.length / 4; i += 1) {
			sortedColors.push(colors[i]);
			sortedColors.push(colors[i + colors.length / 4]);
			sortedColors.push(colors[i + colors.length / 4 * 2]);
			sortedColors.push(colors[i + colors.length / 4 * 3]);
		}
		
		return sortedColors;
	},

	createSwatches : function() {
		for (var i = 0; i < this.colors.length; i += 1) {
			var swatch = document.createElement('div');
			swatch.setAttribute('style', 'background-color: rgb(' + this.colors[i].red + ',' + this.colors[i].green + ',' + this.colors[i].blue + ');');
			swatch.setAttribute('index', i);
			swatch.className = 'color_swatch';
			swatch.addEventListener('click', this.clickListener);

			this.swatches.push(swatch);
			this.panel.appendChild(swatch);
		}
	}
}
