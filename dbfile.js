//a module to use databse connection
var exports = module.exports = {};

var mongoose = require('mongoose');

var dbPath = 'mongodb://localhost/myblogDB';

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
  console.log("database connection is open");
});

exports.getConnection = function(){
  var Blog = require('./blogModel.js');

   var blogModel = mongoose.model('Blog');

   return blogModel;
}