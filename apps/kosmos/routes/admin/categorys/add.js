var shortid = require('shortid');

module.exports = function(Model, Params) {
	var module = {};

	var Category = Model.Category;

	var checkNested = Params.locale.checkNested;


	module.index = function(req, res) {
		res.render('admin/categorys/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;

		var category = new Category();

		category._short_id = shortid.generate();
		category.status = post.status;

		if (!checkNested(post, ['en', 'title'])) {
			return next(new Error('En field is important!'));
		}

		if (checkNested(post, ['ru', 'title']) && /\s/g.test(post['ru'].title) || checkNested(post, ['en', 'title']) && /\s/g.test(post['en'].title)) {
			return next(new Error('The title should not include spaces!'));
		}

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& category.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& category.setPropertyLocalised('description', post[locale].description, locale);

		});

		category.save(function(err, category) {
			if (err) return next(err);

			res.redirect('/admin/categorys');
		});
	};


	return module;
};