//mongoose schema
var mongoose = require('mongoose');


var schema = mongoose.Schema;

var blogSchema = new schema({
	title        : {type:String, default:'', required:true},
	subTitle     : {type:String, default:''},
	blogBody     : {type:String, default:''},
	tags         : [],
	created      : {type:Date},
	lastModified : {type:Date},
	authorInfo   : {}
});

mongoose.model('Blog', blogSchema);