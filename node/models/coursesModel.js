'use strict'
var courses = require('../mongo/mongo.js').courses;
var courseTalks = require('../mongo/mongo.js').courseTalks;
module.exports = {
    addCourseTalk: (req, res, next) => {
        courseTalks.create(req.body, function (err, persons) {
            if (err) {
                res.json({
                    ret: false,
                    msg: err
                })
            } else {
                return res.json({
                    ret: true,
                    data: persons
                })
            }
        })
    },
    addCourses: (req, res, next) => {
        courses.create(req.body, function (err, persons) {
            console.log('234')
            if (err) {
                res.json({
                    ret: false,
                    msg: err.errmsg
                })
            } else {
                req.mymongo = {
                    ret: true,
                    data: persons
                }
            }
            next()
        })
    },
    findCourse: (req, res, next) => {
        courses.findOne({ _id: req.query.id }).populate('author').exec().then(data => {
            courseTalks.find({ course: req.query.id }).populate({ path: 'person', select: 'name imageUrl' }).exec().then(item => {
                return res.json({
                    ret: true,
                    data: data,
                    courseTalks: item
                })
            })
        })
    },
    findCourses: (req, res, next) => {
        let reg = new RegExp(req.query.title)
        let limit
        courses.count({ $or: [{ intro: { $regex: reg } }, { active: true }, { name: { $regex: reg } }] }).then(len => {
            console.log(len)
            len < req.query.limit ? limit = len : limit = Number(req.query.limit)
            courses.find({ $or: [{ talk: { $regex: reg } }, { name: { $regex: reg } }] })
                .skip((req.query.page - 1) * req.query.limit)
                .limit(limit).exec().then(data => {

                    if (data.length === 0) {
                        res.json({
                            ret: false,
                            msg: '搜索失败'
                        })
                    } else {
                        res.json({
                            ret: true,
                            data: {
                                data: data,
                                total: len
                            }
                        })
                    }
                })
        })

    },
    /*
   用于主页查找热门课程
   */
    findPopularCourses: (req, res, next) => {
        courses.find({}, null, { limit: 6 }).exec().then((data) => {
            req.mymongo = data
            next()
        })
    },
    /*
    用于分类查找课程
    */
    findCoursesClass: (req, res, next) => {
        console.log(req.query.id)
        courses.find({ classification: req.query.id }).populate('author').exec().then((data) => {
            req.mymongo = data
            next()
        })
    },
    updateActive: (req, res, next) => {
        courses.update({ _id: req.body.id }, { active: req.body.active }, function (err, result) {
            if (err) {
                res.json({
                    ret: false,
                    msg: errmsg
                })
            } else {
                res.json({
                    ret: true
                })
            }
        })
    }
}