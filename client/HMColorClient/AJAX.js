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
					self.onSuccess(this.reponse);
				} else {
					self.onFail(this.reponse);
				}
			}
		};

		this.request.open(method, url);
		this.request.send(params);
	},

	_formatParams : function(params) {
		var result = '';
		for (var param in params) {
			result += param.concat('=', encodeURI(params[param]), '&');
		}
	}
}
