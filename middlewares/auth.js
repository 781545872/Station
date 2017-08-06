//进行用户登录验证，如果用户未登录则转发到登录页面，如果已经登录则继续执行下一个事件
module.exports = function(req,res,next){
    if(req.session.user){
        return next();
    }
    else{
        res.redirect('/signin');
    }
}