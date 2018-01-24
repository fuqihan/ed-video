var express = require('express');
var router = express.Router();
var personModel = require('../models/personModel.js');
var myUtil = require('../config/myUtil')
var jwt = require('../config/jwt')

/* GET users listing. */
router.get('/Users', function (req, res, next) {

    res.json('add')
})
/*
          post 
          创建一个用户 
  */
router.post('/user', function (req, res, next) {
        if (!myUtil.isObjUndef(req.body.obj)) {
            res.json({
                data: {},
                msg: '数据有空值',
                ret: false
            })
        }
        next()
    }, personModel.addPerson, function (req, res, next) {
        let token = jwt.jwtCertification(req.mymongo.data[0]._id, 'user', 'www')
        res.json({
            data: {
                token: token,
                id: req.mymongo.data[0]._id,
                name: req.mymongo.data[0]._id,
            },
            msg: '',
            ret: true
        })

    }
)
/*
          get 
          查找一个用户 
  */
router.get('/user', personModel.findPerson, function (req, res, next) {
    console.log('req.mymongo[0]._id====' + req.mymongo[0]._id)
    let token = jwt.jwtCertification(req.mymongo[0]._id, 'user', 'www')
    res.json({
        ret: true,
        data: {
            token: token,
            name: req.mymongo[0].name,
            id: req.mymongo[0]._id,
            img: req.mymongo[0].img,
            talk: req.mymongo[0].talk
        }
    })
})

module.exports = router;
