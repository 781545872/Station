var commentModel = require('../models/comment');

exports.reply = function(req,res){
    var username = req.session.user.username;
    var blog_id = req.body.blog_id;
    var comment_date = new Date();
    var comment_content = req.body.comment_content;
    var blog_title = req.body.blog_title;

    var comment = {
        username :username,
        blog_id:blog_id,
        comment_date:comment_date,
        comment_content:comment_content,
        blog_title : blog_title
    }
    commentModel.addComment(comment,function(err,result){
        if(err){
            res.render('error');
        }
        else{
            res.redirect('/detail/'+comment.blog_id);
        }
    });
};