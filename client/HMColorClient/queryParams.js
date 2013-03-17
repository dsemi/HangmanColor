function getQueryParams(location) {
	var paramString, result, params;
	
	paramString = location.search.substring(1, location.length);
	params = paramString.split('&');
	result = {};
	
	var pair;
	for(var i = 0; i < params.length; i ++) {
		pair = params[i].split('=');
		result[pair[0]] = pair[1];
	}
	
	return result;
}
