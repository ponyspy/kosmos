module.exports = function(Model) {
	var module = {};

	var Research = Model.Research;

	module.index = function(req, res) {
		Research.where('status').ne('hidden').sort('-date').exec(function(err, researches) {
			res.render('main/research.jade', { researches: researches });
		});
	};

	return module;
};