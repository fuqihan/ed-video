'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 腾讯云对象存储过于反人类，放弃了
var AppId = exports.AppId = process.env.APP_ID;
var SecretId = exports.SecretId = process.env.SECRET_ID;
var SecretKey = exports.SecretKey = process.env.TX_SECRET_KEY;
var cosUrl = exports.cosUrl =process.env.COS_URL;
// 七牛云
var accessKey = exports.accessKey = process.env.ACCESS_KEY;
var secretKey = exports.secretKey = process.env.QN_SECRET_KEY;
var bucket = exports.bucket = process.env.BUCKET;
var qiniuUrl = exports.qiniuUrl = process.env.QINIU_URL;
// 服务器地址
var upUrl = exports.upUrl = process.env.UP_URL;
// 微博登录
var wb_client_id = exports.wb_client_id = process.env.WB_CLIENT_ID;
var wb_client_secret = exports.wb_client_secret = process.env.WB_CLIENT_SECRET;
var wb_redirect_uri = exports.wb_redirect_uri = process.env.WB_REDIRECT_URL;