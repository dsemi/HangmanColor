function AJAX(url) {
	this.url = url;
	this.request = new XMLHttpRequest();
}

AJAX.prototype = {
	url : null,
	request : null,

	onSuccess : function() {
		console.log('Connection SUCCESS');
	},

	onFail : function() {
		console.log('Connection FAIL')
	},

	send : function(method, name, params) {
		var url, self;
		url = this.url.concat(name);
		self = this;

		this.request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.onSuccess(this.responseText);
				} else {
					self.onFail(this.responseText);
				}
			}
		};
		
		this.request.open(method, url.concat('?', this._formatParams(params)));
		this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.request.send();
	},

	_formatParams : function(params) {
		var result = '';
		for (var param in params) {
			result = result.concat(param, '=', encodeURI(params[param]), '&');
		}
		
		return result;
	}
}
