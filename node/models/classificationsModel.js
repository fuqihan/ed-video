'use strict'
var classifications = require('../mongo/mongo.js').classifications;
module.exports = {
    addClassifications: (req, res, next) => {

        classifications.create({
            name: req.body.name
        }, function (err, data) {
            if (err) {
                res.json({
                    ret: false,
                    msg: err.errmsg
                })
            } else {
                res.json({
                    ret: true,
                    data: data
                })
            }
            next()
        })
    },
    findClassifications: (req, res, next) => {
        classifications.find({}).exec().then((data) => {
            req.mymongo = data
            next()
        })
    }
}