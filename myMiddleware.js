var exports = module.exports = {};

var express = require('express');


var app = express();

var mongoose = require('mongoose');



/*var dbPath = 'mongodb://localhost/myblogDB';

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
  console.log("database connection is open");
});

var Blog = require('./blogModel.js');

var blogModel = mongoose.model('Blog');*/
var connection = require('./dbfile');
var blogModel = connection.getConnection(); 

exports.validateInput = function(req, res, next){
    if(req.body.authorFullName && req.body.authorEmail){
       next();   
    }else{
        
        res.send('Authors Detail Cannot be blank');  
    }
}

exports.checkUser = function(req, res, next){
  
   blogModel.findOne({'_id': req.params.blogId}, function(err, result){
          if(err){

          }else{
          	console.log('Blog Id delete attempted:-'+req.params.blogId);
          	console.log('Attempted By:-'+req.body.authorEmail);
          	console.log('Attempted From:-'+req.ip);
          	var newEmail =  req.body.authorEmail;
            var savedEmail = result.authorInfo.email;
            if(newEmail != savedEmail){
               res.send('Only creator can modify this email');
            }else{
            	console.log('User is Ok');
            	next();
            }
            
          }
    });
}