var express = require('express');
var router = express.Router();
var upload = require('../config/upload')
var teacherModel = require('../models/teacherModel');

router.post('/teacher', function (req, res, next) {
    req.uploadUrl = 'teacher'
    next()
}, upload.fsRename, teacherModel.addTeacher, function (req, res, next) {
    res.json({
        ret: true
    })
})

router.get('/teacher', teacherModel.findTeacherId)

router.get('/teachers', teacherModel.findTeachers)

router.put('/teacher', teacherModel.updateTeacher)

router.get('/homeFindLikeTeacher',teacherModel.homeFindLikeTeacher)

router.put('/updateActive', teacherModel.updateActive)

module.exports = router;
