var express = require('express');

var Model = require(__app_root + '/models/main.js');

var main = {
	index: require('./index.js')(Model),
	works: require('./works.js')(Model),
	research: require('./research.js')(Model),
	about: require('./about.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/about')
		.get(main.about.index);

	router.route('/works')
		.get(main.works.index);

	router.route('/works/:short_id')
		.get(main.works.work);

	router.route('/research')
		.get(main.research.index);

	router.route('/lang/:locale').get(function(req, res) {
		res.cookie('locale', req.params.locale);
		res.redirect('back');
	});

	return router;
})();