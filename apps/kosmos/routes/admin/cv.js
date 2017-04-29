var fs = require('fs');

exports.edit = function(req, res) {
	fs.readFile(__app_root + '/static/cv_ru.html', function(err, ru) {
		fs.readFile(__app_root + '/static/cv_en.html', function(err, en) {
			res.render('admin/cv.jade', { content: { ru: ru, en: en } });
		});
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;

	fs.writeFile(__app_root + '/static/cv_ru.html', post.content.ru, function(err) {
		fs.writeFile(__app_root + '/static/cv_en.html', post.content.en, function(err) {
			res.redirect('back');
		});
	});
};