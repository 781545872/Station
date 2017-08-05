var userModel = require('../models/user');
var eventproxy = require('eventproxy');
//显示登录页面
exports.showSignin = function(req,res){
    res.render('sign/signin');
};
//处理登录信息
exports.signin = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var user = {username:username,password:password};
    //如果已经登录的话就跳回首页
    if(req.session.user){
        //redirect后要return，不然会继续执行下面的代码
        return res.redirect('/');
    }
    userModel.queryUser(user,function(err,user){
        if(err){
            res.render('sign/signin',{error:'获取用户信息失败'});
        }
        if(user){
            //将登录成功的用户信息保存在session中
            req.session.user = user;
            res.redirect('/');
        }
        else{
            res.render('sign/signin',{error:'登录失败'});
        }
    })
};
//显示注册信息
exports.showSignup = function(req,res){
    res.render('sign/signup');
};
//处理注册信息
exports.signup = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var ep = new eventproxy();
    //注册事件
    ep.on('error',function(msg){
        res.render('sign/signup',{error:msg});
    });
    userModel.queryUserBySignupInfo(username,function(err,user){
        if(err){
            ep.emit('error','获取用户信息失败');
        }
        if(user){
            ep.emit('error','该用户名已被使用');
        }
        else{
            userModel.addUser({username:username,password:password},function(err,result){
                if(err){
                    console.log(err.toString());
                    ep.emit('error','注册失败');
                }
                else{
                    res.render('sign/signup',{success:'恭喜注册成功'});
                }
            })
        }
    });
};

exports.signout = function(req,res){
    req.session.destroy();
    res.redirect('/');
};