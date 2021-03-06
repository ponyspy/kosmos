var async = require('async');

module.exports = function(Model) {
	var module = {};

	var Category = Model.Category;
	var Work = Model.Work;


	module.index = function(req, res, next) {
		var id = req.body.id;

		async.parallel([
			function(callback) {
				Work.update({'categorys': id}, { $pull: { 'categorys': id } }, { 'multi': true }).exec(callback);
			},
			function(callback) {
				Category.findByIdAndRemove(id).exec(callback);
			}
		], function(err) {
			if (err) return next(err);

			res.send('ok');
		});
	};


	return module;
};