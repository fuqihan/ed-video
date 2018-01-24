var express = require('express');
var router = express.Router();
var personModel = require('../models/personModel.js');
var jwt = require('../config/jwt.js');
var upload = require('../config/upload')
var coursesModel = require('../models/coursesModel');

// 单文件上传
router.post("/uploadImage", upload.myUpload, function (req, res, next) {
    console.log(req.uploadData)
    res.json({
        ret: true,
        data: req.uploadUrl.substring(6)
    })
});

router.get('/msg', jwt.jwtAuthentication(), function (req, res, next) {
    if (req.user) {
        console.log(req.user)
    } else {
        console.log('123')
    }
    res.json('123')
})
module.exports = router;
