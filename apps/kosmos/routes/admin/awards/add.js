var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Award = Model.Award;

	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/awards/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var file = req.file;

		var award = new Award();

		award._short_id = shortid.generate();
		award.status = post.status;
		award.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		award.year = post.year;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& award.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 's_title'])
				&& award.setPropertyLocalised('s_title', post[locale].s_title, locale);

			checkNested(post, [locale, 'country'])
				&& award.setPropertyLocalised('country', post[locale].country, locale);
		});

		award.save(function(err, award) {
			if (err) return next(err);

			res.redirect('/admin/awards');
		});
	};


	return module;
};