var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Research = Model.Research;


	module.index = function(req, res, next) {
		Research.find().sort('-date').limit(10).exec(function(err, researches) {
			if (err) return next(err);

			Research.count().exec(function(err, count) {
				if (err) return next(err);

				res.render('admin/researches', {researches: researches, count: Math.ceil(count / 10)});
			});
		});
	};


	module.get_list = function(req, res, next) {
		var post = req.body;

		var Query = (post.context.text && post.context.text !== '')
			? Research.find({ $text : { $search : post.context.text } } )
			: Research.find();

		Query.count(function(err, count) {
			if (err) return next(err);

			Query.find().sort('-date').skip(+post.context.skip).limit(+post.context.limit).exec(function(err, researches) {
				if (err) return next(err);

				if (researches.length > 0) {
					var opts = {
						researches: researches,
						load_list: true,
						count: Math.ceil(count / 10),
						skip: +post.context.skip,
						compileDebug: false, debug: false, cache: true, pretty: false
					};

					res.send(jade.renderFile(__app_root + '/views/admin/researches/_researches.jade', opts));
				} else {
					res.send('end');
				}
			});
		});
	};


	return module;
};