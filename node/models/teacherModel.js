'use strict'
var teachers = require('../mongo/mongo.js').teachers;
var cryptoMd5 = require("crypto-js/md5");
var courses = require('../mongo/mongo.js').courses;
module.exports = {
    addTeacher: (req, res, next) => {
        req.body.password = cryptoMd5(req.body.password)

        teachers.create(req.body, function (err, persons) {
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

    findTeacherId: (req, res, next) => {
        console.log(req.query.id)

        teachers.find({ _id: req.query.id }).exec().then(data => {
            courses.find({ author: req.query.id }).exec().then(item => {
                if (data.length === 0) {
                    res.json({
                        ret: false,
                        msg: '搜索失败'
                    })
                } else {
                    res.json({
                        ret: true,
                        data: {
                            data: data
                        },
                        item: item
                    })
                }
            })
        })
    },
    findTeachers: (req, res, next) => {
        let reg = new RegExp(req.query.title)
        let limit
        teachers.count({ $or: [{ intro: { $regex: reg } }, { name: { $regex: reg } }] }).then(len => {
            console.log(len)
            len < req.query.limit ? limit = len : limit = Number(req.query.limit)
            teachers.find({ $or: [{ talk: { $regex: reg } }, { name: { $regex: reg } }] })
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
    updateTeacher: (req, res, next) => {

        teachers.update({ _id: req.body.id }, req.body, function (err, result) {
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
    },
    updateActive: (req, res, next) => {
        teachers.update({ _id: req.body.id }, { active: req.body.active }, function (err, result) {
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
    },
    homeFindLikeTeacher: (req, res, next) => {
        teachers.find().limit(3).exec().then(data => {
            if (data.length === 0) {
                res.json({
                    ret: false
                })
            } else {
                res.json({
                    ret: true,
                    data: data
                })
            }
        })
    }
}
