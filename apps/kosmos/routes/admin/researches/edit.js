var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Research = Model.Research;

	var uploadPoster = Params.upload.image;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.research_id;

		Research.findById(id).exec(function(err, research) {
			if (err) return next(err);

			res.render('admin/researches/edit.jade', { research: research });
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;
		var id = req.params.research_id;

		Research.findById(id).exec(function(err, research) {
			if (err) return next(err);

			research.status = post.status;
			research.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'title'])
					&& research.setPropertyLocalised('title', post[locale].title, locale);
			});

			uploadPoster(research, 'researches', 'poster', file, post.poster_del, function(err, research) {
				if (err) return next(err);

				research.save(function(err, research) {
					if (err) return next(err);

					res.redirect('/admin/researches');
				});
			});
		});
	};


	return module;
};