var fs = require('fs');
var async = require('async');

module.exports = function(Model) {
	var module = {};

	var Award = Model.Award;
	var Publication = Model.Publication;
	var Event = Model.Event;
	var People = Model.People;

	module.index = function(req, res, next) {
		async.parallel({
			cv_ru: function(callback) {
				fs.readFile(__app_root + '/static/cv_ru.html', function(err, content) {
					callback(null, content || '');
				});
			},
			cv_en: function(callback) {
				fs.readFile(__app_root + '/static/cv_en.html', function(err, content) {
					callback(null, content || '');
				});
			},
			adress_ru: function(callback) {
				fs.readFile(__app_root + '/static/adress_ru.html', function(err, content) {
					callback(null, content || '');
				});
			},
			adress_en: function(callback) {
				fs.readFile(__app_root + '/static/adress_en.html', function(err, content) {
					callback(null, content || '');
				});
			},
			awards: function(callback) {
				Award.where('status').ne('hidden').sort('-year').exec(callback);
			},
			press: function(callback) {
				Publication.where('status').ne('hidden').sort('-date').exec(callback);
			},
			peoples: function(callback) {
				People.where('status').ne('hidden').sort('date').exec(callback);
			},
			events: function(callback) {
				Event.where('status').ne('hidden').sort('-year').exec(callback);
			}
		}, function(err, results) {
			if (err) return next(err);

			res.render('main/office.jade', results);
		});
	};

	return module;
};