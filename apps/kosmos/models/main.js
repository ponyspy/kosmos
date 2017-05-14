var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		mongooseBcrypt = require('mongoose-bcrypt');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

mongoose.Promise = Promise;
mongoose.connect('localhost', __app_name);


// ------------------------
// *** Getters Block ***
// ------------------------


var pathCDN = function(path) {
	return path ? '/cdn/' + __app_name + path : undefined;
};


// ------------------------
// *** Schema Block ***
// ------------------------


var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: String,
	date: {type: Date, default: Date.now},
});

var workSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	year: Number,
	client: { type: String, trim: true, locale: true },
	area: { type: String, trim: true, locale: true },
	poster: { type: String, get: pathCDN },
	poster_main: Boolean,
	status: String,
	type: 'String', // project, research
	images: [{
		size: String,
		gallery: Boolean,
		main: Boolean,
		description: { type: String, trim: true, locale: true },
		original: { type: String, get: pathCDN },
		thumb: { type: String, get: pathCDN },
		preview: { type: String, get: pathCDN }
	}],
	files: [{
		path: { type: String, get: pathCDN },
		description: { type: String, trim: true, locale: true }
	}],
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var publicationSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	link: String,
	year: Number,
	poster: { type: String, get: pathCDN },
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var awardSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	place: { type: String, trim: true, locale: true },
	year: Number,
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var eventSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	place: { type: String, trim: true, locale: true },
	year: Number,
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var peopleSchema = new Schema({
	name: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	attach_cv: { type: String, get: pathCDN },
	photo: { type: String, get: pathCDN },
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

// ------------------------
// *** Index Block ***
// ------------------------


workSchema.index({'date': -1});
workSchema.index({'title.value': 'text', 's_title.value': 'text', 'description.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
publicationSchema.index({'title.value': 'text', 's_title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
awardSchema.index({'title.value': 'text', 's_title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
eventSchema.index({'title.value': 'text', 's_title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
peopleSchema.index({'name.value': 'text', 'description.value': 'text'}, {language_override: 'lg', default_language: 'ru'});


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });

workSchema.plugin(mongooseLocale);
publicationSchema.plugin(mongooseLocale);
awardSchema.plugin(mongooseLocale);
eventSchema.plugin(mongooseLocale);
peopleSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Work = mongoose.model('Work', workSchema);
module.exports.Publication = mongoose.model('Publication', publicationSchema);
module.exports.Award = mongoose.model('Award', awardSchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.People = mongoose.model('People', peopleSchema);