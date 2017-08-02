var jade = require('jade');

module.exports = function(Model, Type) {
	var module = {};

	var Work = Model.Work;
	var type = Type;

	module.index = function(req, res) {
		res.render('main/works.jade', { type: type });
	};

	module.get_works = function(req, res) {
		var post = req.body;

		var Query = post.context.category == 'all'
			? Work.find({ 'type': type })
			: Work.find({ 'type': type, 'categorys': post.context.category });

		Query.where('status').ne('hidden').sort('-date').skip(+post.context.skip).limit(+post.context.limit).populate('categorys').exec(function(err, works) {
			var opts = {
				locale: req.locale,
				works: works,
				compileDebug: false, debug: false, cache: true, pretty: false
			};

			if (works && works.length > 0) {
				res.send(jade.renderFile(__app_root + '/views/main/_works.jade', opts));
			} else {
				res.send('end');
			}
		});
	};

	module.work = function(req, res) {
		var short_id = req.params.short_id;

		Work.findOne({ _short_id: short_id }).populate('categorys').exec(function(err, work) {
			var images = work.images.reduce(function(prev, curr) {
				if (prev.length && curr.gallery == prev[prev.length - 1][0].gallery) {
					prev[prev.length - 1].push(curr);
				} else {
					prev.push([curr]);
				}

				return prev;
			}, []).reduce(function(prev, curr) {
				if (curr.some(function(item) { return item.gallery == true; }) && curr.length > 1) {
					return prev.concat([curr]);
				} else {
					return prev.concat(curr);
				}
			}, []);

			res.render('main/work.jade', { work: work, type: type, images: images });
		});
	};

	return module;
};