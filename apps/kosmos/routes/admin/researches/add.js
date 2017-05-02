var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Research = Model.Research;

	var uploadImages = Params.upload.images;
	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/researches/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;

		var research = new Research();

		research._short_id = shortid.generate();
		research.status = post.status;
		research.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& research.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 's_title'])
				&& research.setPropertyLocalised('s_title', post[locale].s_title, locale);
		});

		uploadPoster(research, 'researches', 'poster', file, null, function(err, research) {
			if (err) return next(err);

			research.save(function(err, research) {
				if (err) return next(err);

				res.redirect('/admin/researches');
			});
		});
	};


	return module;
};