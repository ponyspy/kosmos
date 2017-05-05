var express = require('express');

var Model = require(__app_root + '/models/main.js');

var main = {
	index: require('./index.js')(Model),
	projects: require('./works.js')(Model, 'project'),
	researches: require('./works.js')(Model, 'research'),
	bureau: require('./bureau.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/bureau')
		.get(main.bureau.index);

	router.route('/projects')
		.get(main.projects.index);

	router.route('/projects/:short_id')
		.get(main.projects.work);

	router.route('/research')
		.get(main.researches.index);

	router.route('/research/:short_id')
		.get(main.researches.work);

	router.route('/lang/:locale').get(function(req, res) {
		res.cookie('locale', req.params.locale);
		res.redirect('back');
	});

	return router;
})();