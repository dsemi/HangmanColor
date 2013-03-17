function AJAX(url) {
	this.url = url;
	this.request = new XMLHttpRequest();
}


AJAX.prototype = {
	url: null,
	request: null,
	
	get: function(name, params, callback) {
		var url = this.url.concat(name);
		
		this.request.onreadystatechange = function() {
			if(this.readyState === 4) {
				if (this.status === 200) {
					callback(this.responseText);
				}
			}
		};
		
		this.request.open('GET', url);
		this.request.send(params);
	},
	
	post: function(name, params, callback) {
		var url = this.url.concat(name);
		
		this.request.onreadystatechange = function() {
			if(this.request.readyState === 4) {
				if (this.request.status === 200) {
					callback(this.request.responseText);
				}
			}
		};
		
		this.request.open('POST', url);
		this.request.send(params);
	}
}
