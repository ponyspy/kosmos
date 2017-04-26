var express = require('express');
var multer = require('multer');

var upload = multer({ dest: __glob_root + '/uploads/' });

var admin = {
	main: require('./main.js'),
	works: require('./works/_works.js'),
	researches: require('./researches/_researches.js'),
	publications: require('./publications/_publications.js'),
	awards: require('./awards/_awards.js'),
	events: require('./events/_events.js'),
	peoples: require('./peoples/_peoples.js'),
	cv: require('./cv.js'),
	users: require('./users/_users.js'),
	options: require('./options.js')
};

var checkAuth = function(req, res, next) {
	req.session.user_id
		? next()
		: res.redirect('/auth');
};

module.exports = (function() {
	var router = express.Router();

	router.route('/').get(checkAuth, admin.main.index);

	router.route('/cv')
		.get(checkAuth, admin.cv.edit)
		.post(checkAuth, admin.cv.edit_form);

	router.use('/works', checkAuth, upload.single('poster'), admin.works);
	router.use('/researches', checkAuth, upload.single('poster'), admin.researches);
	router.use('/publications', checkAuth, upload.single('poster'), admin.publications);
	router.use('/awards', checkAuth, admin.awards);
	router.use('/events', checkAuth, admin.events);
	router.use('/peoples', checkAuth, upload.single('photo'), admin.peoples);
	router.use('/users', checkAuth, admin.users);

	router.post('/preview', checkAuth, upload.single('image'), admin.options.preview);

	return router;
})();