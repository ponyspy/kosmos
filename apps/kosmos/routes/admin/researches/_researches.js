var express = require('express');

var Model = require(__app_root + '/models/main.js');

var Params = {
	locale: require('../_params/locale'),
	upload: require('../_params/upload')
};

var researches = {
	list: require('./list.js')(Model),
	add: require('./add.js')(Model, Params),
	edit: require('./edit.js')(Model, Params),
	remove: require('./remove.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(researches.list.index)
		.post(researches.list.get_list);

	router.route('/add')
		.get(researches.add.index)
		.post(researches.add.form);

	router.route('/edit/:research_id')
		.get(researches.edit.index)
		.post(researches.edit.form);

	router.route('/remove')
		.post(researches.remove.index);

	return router;
})();