var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	module.index = function(req, res) {
		fs.readFile(__app_root + '/static/cv_ru.html', function(err, ru) {
			fs.readFile(__app_root + '/static/cv_en.html', function(err, en) {
				res.render('main/about.jade', { cv: req.locale == 'ru' ? ru : en });
			});
		});
	};

	return module;
};