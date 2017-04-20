var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Publication = Model.Publication;

	var uploadImages = Params.upload.images;
	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/publications/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;

		var publication = new Publication();

		publication._short_id = shortid.generate();
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

		uploadPoster(publication, 'publications', 'poster', file, null, function(err, publication) {
			if (err) return next(err);

			publication.save(function(err, publication) {
				if (err) return next(err);

				res.redirect('/admin/publications');
			});
		});
	};


	return module;
};