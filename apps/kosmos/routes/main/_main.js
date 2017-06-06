var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var main = {
	index: require('./index.js')(Model),
	projects: require('./works.js')(Model, 'project'),
	researches: require('./works.js')(Model, 'research'),
	office: require('./office.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/office')
		.get(main.office.index);

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