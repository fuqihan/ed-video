var express = require('express');
var router = express.Router();
var coursesModel = require('../models/coursesModel');
var myUtil = require('../config/myUtil')
var jwt = require('../config/jwt')
var upload = require('../config/upload')

router.post('/courses', function (req, res, next) {
    req.uploadUrl = 'courses'
    next()
}, upload.fsRename, upload.fsEditor, coursesModel.addCourses, function (req, res, next) {
    console.log('123')
    res.json({
        ret: true
    })
})

router.put('/updateActive', coursesModel.updateActive)

router.get('/courses', coursesModel.findCourses)

router.get('/course', coursesModel.findCourse)

router.get('/findCourses', coursesModel.findCoursesClass, function (req, res, next) {
    res.json({
        ret: true,
        data: req.mymongo
    })
})


router.get('/homeFindPopularCourses', coursesModel.findPopularCourses, function (req, res, next) {
    res.json({
        ret: true,
        data: req.mymongo
    })
})

router.post('/addCourseTalk', coursesModel.addCourseTalk);
module.exports = router;
