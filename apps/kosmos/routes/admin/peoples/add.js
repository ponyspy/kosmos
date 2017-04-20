var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var People = Model.People;

	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/peoples/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;

		var people = new People();

		people._short_id = shortid.generate();
		people.status = post.status;
		people.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'name'])
				&& people.setPropertyLocalised('name', post[locale].name, locale);

			checkNested(post, [locale, 'description'])
				&& people.setPropertyLocalised('description', post[locale].description, locale);
		});

		uploadPoster(people, 'peoples', 'photo', file, null, function(err, people) {
			if (err) return next(err);

			people.save(function(err, people) {
				if (err) return next(err);

				res.redirect('/admin/peoples');
			});
		});
	};


	return module;
};