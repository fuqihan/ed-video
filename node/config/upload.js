'use strict';

var _config = require('./config');

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

var formidable = require('formidable');
var fs = require('fs');
var COS = require('cos-nodejs-sdk-v5');

var cos = new COS({
    AppId: config.AppId,
    SecretId: config.SecretId,
    SecretKey: config.SecretKey
});
// 七牛
var qiniu = require('qiniu')
var mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
var qiniuConfig = new qiniu.conf.Config();
qiniuConfig.zone = qiniu.zone.Zone_z2;
var options = {
    scope: config.bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
var putExtra = new qiniu.form_up.PutExtra();


module.exports = {

    myUpload: function myUpload(req, res, next) {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./public/uploads";
        form.maxFieldsSize = 20 * 1024 * 1024; //上传文件大小限制为最大1M  
        form.keepExtensions = true; //使用文件的原扩展名
        form.parse(req, function (err, fields, files) {
            req.uploadUrl = files.file.path;
            next();
        });
    },
    fsRename: function fsRename(req, res, next) {

        var ldot = req.body.imageUrl.lastIndexOf(".");
        var type = req.body.imageUrl.substring(ldot + 1);
        var filename = req.body.imageUrl.substring(16, ldot - 1);
        var new_path = "images/" + req.uploadUrl + "/" + filename + '.' + type;
        console.log(config.AppId)
        // 七牛上传
        try {
            formUploader.putFile(uploadToken, new_path, 'public' + req.body.imageUrl, putExtra, function (respErr,
                                                                                                          respBody, respInfo) {
                if (!respErr) {
                    // 上传成功， 处理返回值
                    fs.unlink('public' + req.body.imageUrl, function () {
                        console.log('up1')
                        // 反馈上传信息
                        req.body.imageUrl = config.qiniuUrl + new_path;
                        next();
                    });
                } else {
                    // 上传失败， 处理返回代码
                    console.log(respErr);
                    res.json({
                        ret: false,
                        msg: respErr
                    })
                }
            });
        } catch (err) {
            console.log(err)
            res.json({
                ret: false,
                msg: err
            })
        }


    },
    fsEditor: (req, res, next) => {
        let s = req.body.editorContent.match(/<img.*?(?:>|\/>)/gi)
        if (s === null) {
            return next();
        } else {
            s.map((item, index) => {
                let reg = item.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]
                let img = reg.replace(reg.match(/(\S*)\/uploads/)[1], '')

                var ldot = img.lastIndexOf(".");
                var type = img.substring(ldot + 1);
                var filename = img.substring(16, ldot);
                var new_path = "images/" + 'editor' + "/" + filename + '.' + type;
                formUploader.putFile(uploadToken, new_path, 'public' + img, putExtra, function (err,
                                                                                                respBody, respInfo) {
                    if (err) {
                        console.log(err);
                        res.json({
                            ret: false,
                            msg: err.errmsg
                        })
                    } else {
                        fs.unlink('public' + img, function () {
                            console.log('up2')
                            // 反馈上传信息
                            req.body.editorContent = req.body.editorContent.replace(/(http\S*)\/uploads\/upload_/g, config.qiniuUrl + 'images/editor/')
                            index === (s.length - 1) ? next() : 0
                        });
                    }
                });
            })
        }
    }
};
// cos.sliceUploadFile({
//     Bucket: 'edvideo', /* 必须 */
//     Region: 'ap-beijing', /* 必须 */
//     Key: new_path, /* 必须 */
//     FilePath: 'public' + req.body.imageUrl /* 必须 */
// }, function (err, data) {
//     if (err) {
//         res.json({
//             ret: false,
//             msg: err
//           })
//     } else {
//         console.log(data);
//         fs.unlink('public' + req.body.imageUrl, function () {
//             console.log('up1')
//             // 反馈上传信息
//             req.body.imageUrl = config.cosUrl + new_path;
//             next();
//         });
//     }
// });