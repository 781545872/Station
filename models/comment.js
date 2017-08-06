var mongoose = require('../mongodb-helper');

var commentSchema = new mongoose.Schema({
    blog_id:String,
    blog_title:String,
    username:String,
    comment_content:String,
    comment_date:Date
});

commentSchema.statics.addComment = function(comment,callback){
    this.create(comment,callback);
};

commentSchema.statics.getComments = function(query,option,callback){
    this.find(query,{},option,callback);
}


module.exports = mongoose.model('comment',commentSchema);