var express = require('express');
var router = express.Router();
var classificationsModel = require('../models/classificationsModel');
var myUtil = require('../config/myUtil')
var jwt = require('../config/jwt')

router.get('/findClassifications', classificationsModel.findClassifications, function (req, res, next) {
    res.json({
        ret: true,
        data: req.mymongo
    })
})

router.post('/classification', classificationsModel.addClassifications)

module.exports = router;
