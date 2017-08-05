var blogController = require('../models/blog');
exports.showCreate = function(req,res){
    res.render('blog/create');
};

exports.create = function(req,res){
    var blog_title = req.body.blog_title;
    var blog_content = req.body.blog_content;
    var blog_date = new Date();
    var username = req.session.user.username;

    var blog = {
        blog_title : blog_title,
        blog_content : blog_content,
        blog_date : blog_date,
        username : username
    }

    blogController.addBlog(blog,function(err,result){
        if(err){
            console.log(err.stack);
            res.render('blog/create',{error:'发表失败'});
        }
        else{
            res.render('blog/create',{success:'发表成功'});
        }
    })
};