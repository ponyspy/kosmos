var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	module.index = function(req, res) {
		var html = fs.readFile(__app_root + '/static/cv.html', function(err, html) {
			res.render('main/cv.jade', { html: html });
		});
	};

	return module;
};