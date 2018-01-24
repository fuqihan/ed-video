var jwt = require('jsonwebtoken');  // 
var express = require('express');
var app = express();
var expressJwt = require('express-jwt');
var compose = require('composable-middleware'); // 组装中间件
var tokenModel = require('../models/tokenModel')

module.exports = {
    // jwt 认证  tokenModel是为了验证异地登陆
    jwtCertification: (id, role, ip) => {
        var iat = Math.floor(Date.now() / 1000);
        var exp = Math.floor(Date.now() / 1000) + (60 * 60);
        tokenModel.addToken(id, iat, exp)
        return jwt.sign({
            _id: id,
            role: role,
            iat: iat,
            exp: exp,
            ip: ip
        }, 'fuqihan')
    },
    // jwt鉴权 普通接口不用判断异地
    jwtAuthentication: (req, res, next) => {
        return compose()
            .use(function (req, res, next) {
                expressJwt({
                    secret: 'fuqihan'
                })(req, res, next)
            }).use(function (req, res, next) {

                next()
            })
    },
    //  重要接口需要判断token是否是最新的
    jwtVipAuthentication: (req, res, next) => {
        return compose()
            .use(function (req, res, next) {
                expressJwt({
                    secret: 'fuqihan'
                })(req, res, next)
            }).use(function (req, res, next) {

                next()
            })

    }
}