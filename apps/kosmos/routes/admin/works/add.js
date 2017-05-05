var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Work = Model.Work;

	var uploadImages = Params.upload.images;
	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/works/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;

		var work = new Work();

		work._short_id = shortid.generate();
		work.status = post.status;
		work.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		work.year = post.year;
		work.type = post.type;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& work.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 's_title'])
				&& work.setPropertyLocalised('s_title', post[locale].s_title, locale);

			checkNested(post, [locale, 'area'])
				&& work.setPropertyLocalised('area', post[locale].area, locale);

			checkNested(post, [locale, 'client'])
				&& work.setPropertyLocalised('client', post[locale].client, locale);

			checkNested(post, [locale, 'description'])
				&& work.setPropertyLocalised('description', post[locale].description, locale);

		});

		uploadImages(work, 'works', post.images, function(err, work) {
			if (err) return next(err);

			uploadPoster(work, 'works', 'poster', file, null, function(err, work) {
				if (err) return next(err);

				work.save(function(err, work) {
					if (err) return next(err);

					res.redirect('/admin/works');
				});
			});
		});
	};


	return module;
};