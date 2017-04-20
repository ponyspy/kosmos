var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var People = Model.People;

	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.people_id;

		People.findById(id).exec(function(err, people) {
			if (err) return next(err);

			previewImages(people.images, function(err, images_preview) {
				if (err) return next(err);

				res.render('admin/peoples/edit.jade', { people: people, images_preview: images_preview });
			});
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;
		var id = req.params.people_id;

		People.findById(id).exec(function(err, people) {
			if (err) return next(err);

			people.status = post.status;
			people.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			people.poster_hover = post.poster_hover;

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'name'])
					&& people.setPropertyLocalised('name', post[locale].name, locale);

				checkNested(post, [locale, 'description'])
					&& people.setPropertyLocalised('description', post[locale].description, locale);
			});

			uploadPoster(people, 'peoples', 'photo', file, post.poster_del, function(err, people) {
				if (err) return next(err);

				people.save(function(err, people) {
					if (err) return next(err);

					res.redirect('/admin/peoples');
				});
			});
		});
	};


	return module;
};