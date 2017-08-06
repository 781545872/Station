var blogModel = require('../models/blog');
var commentModel = require('../models/comment');
var eventproxy = require('eventproxy');
var dateFormat = require('../time-helper');

exports.index = function(req,res){
    //每页显示的条数
    var count = 6;
    //当前需要显示第几页,默认显示第一页
    var page = req.query.page ? req.query.page : 1;
    var option = {
        skip:(page-1)*count,
        limit:count
    }
    //因为需要两次查询数据库，所以需要用到eventproxy
    var ep = eventproxy();
    //获取指定页的博文
    blogModel.getBlogs({},option,function(err,blogs){
        if(err){
            //不加return的话会继续往下走并触发ep，从而导致Error: Can't set headers after they are sent.
            return res.render('error');
        }
        blogs.map(function(blog){
            //新增加一个字符串为编写日期，便于显示
            blog.timeStr = dateFormat(blog.blog_date);
            return blog;
        });
        ep.emit('blog_data_ok',blogs);
    });
    //获取博文的总数
    blogModel.count({},function(err,pageCount){
        if(err){
            return res.render('error');
        }
        pageCount = Math.ceil(pageCount/count);
        //判断请求的页数是否大于我们的最大页数或者小于0，如果是的话，将p设置为1
        if(page > pageCount){
            page = 1;
        }
        ep.emit('blog_count_ok',pageCount);
    });
    //获取阅读数量前10的博文
    blogModel.getBlogs({},{limit:10,$sort:{view_count:-1}},function(err,vc10Blog){
        if(err){
            return res.render('error');
        }
        ep.emit('vc10Blog_data_ok',vc10Blog);
    });
    //获取最新评论
    commentModel.getComments({},{limit:10},function(err,comments){
        if(err){
            return res.render('error');
        }
        ep.emit('comments_data_ok',comments);
    });
    //获取最新博文
    blogModel.getBlogs({},{limit:10},function(err,new10Blog){
        if(err){
            return res.render('error');
        }
        ep.emit('new10Blog_data_ok',new10Blog);
    })
    //当全部获取数据完成之后调用事件
    ep.all('blog_data_ok','blog_count_ok','vc10Blog_data_ok','comments_data_ok','new10Blog_data_ok',function(blogs,pageCount,vc10Blog,comments,new10Blog){
        res.render('blog/index',{blogs:blogs,pageCount:pageCount,page:page,title:'欢迎来到博客联盟',vc10Blog:vc10Blog,comments:comments,new10Blog:new10Blog});
    })
};

