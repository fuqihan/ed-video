'use strict'
var talks = require('../mongo/mongo.js').talks;
var courseTalks = require('../mongo/mongo.js').courseTalks;
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

    findTalks: (req, res, next) => {
        let obj = {};
        if (req.query.id) obj.classification = req.query.id;
        console.log(obj)
        talks.find(obj).populate({ path: 'person', select: 'name imageUrl' }).exec().then(data => {
            console.log(data)
            return res.json({
                ret: true,
                data: data
            })
        })
    },
    findTalkDetail: (req, res, next) => {
        talks.findOne({ _id: req.query.id }).populate({ path: 'person', select: 'name imageUrl' }).exec().then(data => {
            courseTalks.find({ talk: req.query.id }).populate({path: 'person', select: 'name imageUrl'}).exec().then(item => {
                return res.json({
                    ret: true,
                    data: data,
                    courseTalks: item
                })
            })
        })
    }

}
