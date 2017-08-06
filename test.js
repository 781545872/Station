var blogModel = require('./models/blog');
var blogs = blogModel.getBlogs({},{limit:10,$sort:{view_count:1}},function(err,vc10Blog){
   console.log(vc10Blog);
});