var blogModel = require('../models/blog');
var commentModel = require('../models/comment');
var eventproxy = require('eventproxy');
var dateFormat = require('../time-helper');

exports.showCreate = function(req,res){
    res.render('blog/create');
};

exports.create = function(req,res){
    var blog_title = req.body.blog_title;
    var blog_content = req.body.blog_content;
    var blog_date = new Date();
    var username = req.session.user.username;
    var blog_tag = req.body.blog_tag;
    var view_count = 0;

    var blog = {
        blog_title : blog_title,
        blog_content : blog_content,
        blog_date : blog_date,
        username : username,
        blog_tag : blog_tag,
        view_count : view_count
    }

    blogModel.addBlog(blog,function(err,result){
        if(err){
            console.log(err.stack);
            res.render('blog/create',{error:'发表失败'});
        }
        else{
            res.render('blog/create',{success:'发表成功'});
        }
    })
};

exports.detail = function(req,res){
    var id = req.params.id;
    var ep = eventproxy();
    blogModel.getBlog(id,function(err,blog){
        if(err){
            res.render('error');
        }
       if(blog){
           //当有用户访问时view_count字段加1
           var view_count = blog.view_count+1;

           blogModel.updateBlog({view_count:view_count},blog.blog_id,function(err,result){

           });
           blog.timeStr = dateFormat(blog.blog_date);
           ep.emit('blog_detail_ok',blog);
       }
       else{
           res.render('blog/index');
       }
    });
    commentModel.getComments(id,function(err,comments){
       if(err){
           res.render('error');
       }
       //map函数是同步的，嘻嘻,所以放心的在后面继续写逻辑
       comments.map(function(comment){
           comment.timeStr = dateFormat(comment.comment_date);
           return comment;
       });
       ep.emit('comments_ok',comments);
    });
    ep.all('blog_detail_ok','comments_ok',function(blog,comments){
        res.render('blog/detail',{blog:blog,comments:comments});
    });
};