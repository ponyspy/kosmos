var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Work = Model.Work;

	var previewImages = Params.upload.preview;
	var uploadImages = Params.upload.images;
	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			previewImages(work.images, function(err, images_preview) {
				if (err) return next(err);

				res.render('admin/works/edit.jade', { work: work, images_preview: images_preview });
			});
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			work.status = post.status;
			work.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			work.poster_main = post.poster_main;
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

				uploadPoster(work, 'works', 'poster', file, post.poster_del, function(err, work) {
					if (err) return next(err);

					work.save(function(err, work) {
						if (err) return next(err);

						res.redirect('/admin/works');
					});
				});
			});
		});
	};


	return module;
};