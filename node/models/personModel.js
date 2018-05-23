'use strict'
var persons = require('../mongo/mongo.js').persons;
module.exports = {
    //添加users  中间件
    addPerson: (req, res, next) => {

        persons.create(req.body, function (err, persons) {
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
    addBuy: (req, res, next) => {
        persons.update({ _id: '59e424d85eac9d02542a4004' }, { $push: { buyCourse: req.body.courseid } }, function (err, data) {
            if (err) {
                res.json({
                    ret: false,
                    msg: err.errmsg
                })
            } else {
                return res.json({
                    ret: true,
                    data: data
                });
            }
        })
    },
    findBuy: (req, res, next) => {
        persons.findOne({ _id: '59e424d85eac9d02542a4004' }).exec().then(data => {
            try {
                if (data.buyCourse) {
                    data.buyCourse.forEach(item => {
                        if (item === req.body.courseid) return res.json(true);

                    });
                    return res.json(false);
                }
            } catch (error) {
                return res.json(false);
            }

        })
    },
    findPerson: (req, res, next) => {
        persons.find({ username: req.query.username, password: req.query.password }).exec().then((data) => {
            console.log(data.length)
            if (data.length === 0) {
                res.json({
                    ret: false,
                    msg: '找不到用户或密码'
                })
            } else {
                req.mymongo = data
            }
            next()
        })
    },
    findPersons: (req, res, next) => {
        let reg = new RegExp(req.query.title)
        let limit
        persons.count({ $or: [{ talk: { $regex: reg } }, { name: { $regex: reg } }] }).then(len => {
            console.log(len)
            len < req.query.limit ? limit = len : limit = Number(req.query.limit)
            persons.find({ $or: [{ intro: { $regex: reg } }, { name: { $regex: reg } }] })
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
    updatePersoon: (req, res, next) => {

        persons.update({ _id: req.body.id }, req.body, function (err, result) {
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
        persons.update({ _id: req.body.id }, { active: req.body.active }, function (err, result) {
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
