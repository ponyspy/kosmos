var rimraf = require('rimraf');

module.exports = function(Model) {
	var module = {};

	var Research = Model.Research;


	module.index = function(req, res, next) {
		var id = req.body.id;

		Research.findByIdAndRemove(id).exec(function(err) {
			if (err) return next(err);

			rimraf(__app_root + '/public/cdn/images/researches/' + id, { glob: false }, function(err) {
				if (err) return next(err);

				res.send('ok');
			});
		});

	};


	return module;
};