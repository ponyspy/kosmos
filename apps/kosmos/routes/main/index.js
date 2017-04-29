var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Work = Model.Work;

	module.index = function(req, res) {
		Work.find({ 'poster_main': { '$eq': true } }).distinct('poster').exec(function(err, posters) {
			res.render('main/index.jade', { posters: posters });
		});
	};

	return module;
};