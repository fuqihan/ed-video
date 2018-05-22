'use strict'
var talks = require('../mongo/mongo.js').talks;
module.exports = {
    //添加users  中间件
    addTalk: (req, res, next) => {

        talks.create(req.body, function (err, persons) {
            if (err) {
                res.json({
                    ret: false,
                    msg: err.errmsg
                })
            } else {
                return res.json({
                    ret: true,
                    data: persons
                })
            }
        })
    },

}
