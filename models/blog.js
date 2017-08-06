var mongoose = require('../mongodb-helper');

var blogSchema = new mongoose.Schema({
    blog_title : String,
    blog_content : String,
    blog_date : Date,
    username : String,
    blog_tag : String,
    view_count: Number
});

blogSchema.statics.addBlog = function(blog,callback){
    this.create(blog,callback);
}

blogSchema.statics.getBlogs = function(query,option,callback){
    //find第一个参数是查询限制，第二个是所要查询的字段，第三个是可选字段包括skip,limit,sort等，最后一个是回调函数
    this.find(query,{},option,callback);
}

blogSchema.statics.getBlog = function(id,callback){
    this.findOne({_id:id},callback);
};

blogSchema.statics.updateBlog = function(update,blog_id,callback){
  this.findOneAndUpdate({_id:blog_id},update,callback);
};


module.exports = mongoose.model('blog',blogSchema);