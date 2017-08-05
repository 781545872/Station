var mongoose = require('../mongodb-helper');
var userSchema = new mongoose.Schema({
    username:String,
    password:String
});
userSchema.statics.queryUserBySignupInfo = function(username,callback){
    this.findOne({username:username},callback);
};
userSchema.statics.addUser = function(user,callback){
    this.create(user,callback);
};
userSchema.statics.queryUser = function(user,callback){
    this.findOne(user,callback);
}


module.exports = mongoose.model('user',userSchema);