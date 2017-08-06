var mongoose = require('../mongodb-helper');

var commentSchema = new mongoose.Schema({
    blog_id:String,
    username:String,
    comment_content:String,
    comment_date:Date
});

commentSchema.statics.addComment = function(comment,callback){
    this.create(comment,callback);
};

commentSchema.statics.getComments = function(blog_id,callback){
    this.find({blog_id:blog_id},callback);
}


module.exports = mongoose.model('comment',commentSchema);