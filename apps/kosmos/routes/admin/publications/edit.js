var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Publication = Model.Publication;

	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.publication_id;

		Publication.findById(id).exec(function(err, publication) {
			if (err) return next(err);

			res.render('admin/publications/edit.jade', { publication: publication });
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;
		var id = req.params.publication_id;

		Publication.findById(id).exec(function(err, publication) {
			if (err) return next(err);

			publication.status = post.status;
			publication.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			publication.year = post.year;

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'title'])
					&& publication.setPropertyLocalised('title', post[locale].title, locale);

				checkNested(post, [locale, 's_title'])
					&& publication.setPropertyLocalised('s_title', post[locale].s_title, locale);
			});

			uploadPoster(publication, 'publications', 'poster', file, post.poster_del, function(err, publication) {
				if (err) return next(err);

				publication.save(function(err, publication) {
					if (err) return next(err);

					res.redirect('/admin/publications');
				});
			});
		});
	};


	return module;
};