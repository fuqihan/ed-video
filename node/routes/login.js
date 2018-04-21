var express = require('express');
var router = express.Router();
var request = require('request');
//  === import * as config from '../config/config'
var _config = require('../config/config');
var config = _interopRequireWildcard(_config);
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
var returnRouter = function(io) {
//  微博获取AccrssToken 微博又jssdk可以直接获取token直接请求就行了
router.get('/getWeiboAccessToken', function (req, res, next) {
    var socketid = req.query.state;
    if(!req.query.code) {
        return res.json('登陆失败')
    }
   var msg = {
    "client_id": config.wb_client_id,
    "client_secret": config.wb_client_secret,
    "grant_type": 'authorization_code',
    "code": req.query.code,
    "redirect_uri": config.wb_redirect_uri
  }

    var tokenUrl = 'https://api.weibo.com/oauth2/access_token?client_id=456805882&client_secret=c524ab88ecfbda91e3a9a9c423a4bbe2&grant_type=authorization_code&redirect_uri=http://www.fuqihan.cn/login/index&code=' + req.query.code
    try {
        request.post({url:tokenUrl, msg}, function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log(JSON.parse(body))
            res.cookie('WeiboAccessToken',JSON.parse(body).access_token)
            res.cookie('WeiboUid',JSON.parse(body).uid)
            io.to(socketid).emit('loginOff', true);
            res.end();
            // res.json('登陆成功！返回上一个窗口继续')
          });
    } catch (error) {
        console.log(error)
        res.json('授权失败')
    }
})
//  微博获取用户信息
router.get('/getWbUserInfo',function(req, res, next){
    var tokenUrl = 'https://api.weibo.com/2/users/show.json?access_token='+req.query.accessToken+'&uid='+req.query.uid
    try {
        request.get(tokenUrl, function optionalCallback(err, httpResponse, body) {
            if (err) {
              res.json({
                  ret: false
              })
            }
            res.json({
                ret: true,
                data: JSON.parse(body)
            })
          });
    } catch (error) {
        console.log(error)
        res.json({
            ret: false
        })
    }
})

router.get('/test', function(req, res, next) {
    console.log(io)
    res.cookie('BaiduAccessToken','123')
    io.local.emit('newa', 'my lovely babies');
    res.redirect('/views/close.html');
    // res.json({a: 1233});
})

//  百度获取AccrssToken 百度没有jssdk需要放在cookie上
router.get('/getBaiduAccessToken', function (req, res, next) {
    var socketid = req.query.state;
    if(!req.query.code) {
        return res.json('登陆失败')
    }
    var tokenUrl = "https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code="+req.query.code+"&client_id=8zEhM2TlYGTD273GDVlFiwd0&client_secret=qd1jPF1kC6DkI68Mr2UWXxcT2YCLaa3N&redirect_uri=http://www.fuqihan.cn:3000/login/getBaiduAccessToken"
    try {
        request.get({url:tokenUrl}, function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log(JSON.parse(body))
            // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.cookie('BaiduAccessToken',JSON.parse(body).access_token)
            // res.setHeader('Set-Cookie', [ 'BaiduAccessToken='+body.access_token])
                        // res.json('登陆成功！返回上一个窗口继续')
            io.to(socketid).emit('loginOff', true);
            res.end();
          });
    } catch (error) {
        console.log(error)
        res.json('授权失败')
    }
})

//  百度获取用户信息
router.get('/getBaiduUserInfo',function(req, res, next){
    var tokenUrl = 'https://api.weibo.com/2/users/show.json?access_token='+req.query.accessToken+'&uid='+req.query.uid
    try {
        request.get(tokenUrl, function optionalCallback(err, httpResponse, body) {
            if (err) {
              res.json({
                  ret: false
              })
            }
            res.json({
                ret: true,
                data: JSON.parse(body)
            })
          });
    } catch (error) {
        console.log(error)
        res.json({
            ret: false
        })
    }
})
return router;
}

module.exports = returnRouter;
