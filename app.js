var express = require('express');

var middleware = require('./myMiddleware');

var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



app.use(bodyParser.json({limit: '10mb', extended:true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended:true}));

var connection = require('./dbfile');
var blogModel = connection.getConnection(); 
app.get('/blogs', function(req, res){
    blogModel.find(function(err, result){
          if(err){
            console.log('An error occured while retrieving all blogs. Error:-'+err);
            res.send(err);
          }else{

            res.send(result);
          }
    });
});

app.get('/blog/:bolgId', function(req, res){
    blogModel.findOne({'_id': req.params.bolgId}, function(err, result){
          if(err){
             console.log('An error occured while retrieving single blog. Error:-'+err);
            res.send(err);
          }else{

            res.send(result);
          }
    });
});

app.put('/blog/edit/:blogId', function(req, res){
    var update = req.body;

    blogModel.findOneAndUpdate({'_id': req.params.blogId}, update, function(err, result){
          if(err){
            console.log('An error occured while retrieving editing blog.'+req.params.blogId+' Error:-'+err);
            res.send(err);
          }else{

            res.send(result);
          }
    });
});

app.post('/blog/delete/:blogId', middleware.checkUser, function(req, res){
    blogModel.remove({'_id': req.params.blogId}, function(err, result){
          if(err){
            console.log('An error occured while deleting blog.'+req.params.blogId+' Error:-'+err);
            res.send(err);
          }else{

            res.send(result);
          }
    });
});



app.post('/blog/create', middleware.validateInput, function(req, res){
   
    var newBlog = new blogModel({
      title: req.body.title,
      subTitle: req.body.subTitle,
      blog: req.body.blog
    });

    var today = new Date();
    newBlog.created = today;

    var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags:'';
    newBlog.tags = allTags;

    var authorInfo = {fullName: req.body.authorFullName, email: req.body.authorEmail};
    newBlog.authorInfo = authorInfo;

    newBlog.save(function(error){
         if(error){
            console.log(error);
            res.send(error);
          }else{

            res.send(newBlog);
          }
    });
});

app.listen(3000, function(){
  console.log('Listening on Port 3000');
});