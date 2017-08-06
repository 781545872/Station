var blogModel = require('../models/blog');
var eventproxy = require('eventproxy');
var dateFormat = require('../time-helper');

exports.index = function(req,res){
    //每页显示的条数
    var count = 1;
    //当前需要显示第几页,默认显示第一页
    var page = req.query.page ? req.query.page : 1;
    var option = {
        skip:(page-1)*count,
        limit:count
    }
    //因为需要两次查询数据库，所以需要用到eventproxy
    var ep = eventproxy();
    blogModel.getBlogs({},option,function(err,blogs){
        if(err){
            res.render('error');
        }
        blogs.map(function(blog){
            //新增加一个字符串为编写日期，便于显示
            blog.timeStr = dateFormat(blog.blog_date);
            return blog;
        });
        ep.emit('blog_data_ok',blogs);
    });
    blogModel.count({},function(err,pageCount){
        if(err){
            res.render('error');
        }
        else{
            pageCount = Math.ceil(pageCount/count);
            //判断请求的页数是否大于我们的最大页数
            if(page > pageCount){
                res.render('error');
            }
            ep.emit('blog_count_ok',pageCount);
        }
    });
    //当两次获取数据完成之后调用事件
    ep.all('blog_data_ok','blog_count_ok',function(blogs,pageCount){
        res.render('blog/index',{blogs:blogs,pageCount:pageCount,page:page});
    })
};

