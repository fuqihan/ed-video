var express = require('express');
var router = express.Router();
var personModel = require('../models/personModel.js');
var upload = require('../config/upload')
var jwt = require('../config/jwt')

router.post('/person', function (req, res, next) {
    req.uploadUrl = 'person'
    next()
}, upload.fsRename, personModel.addPerson, function (req, res, next) {
    res.json({
        ret: true
    })
})

router.get('/persons', personModel.findPersons)

router.put('/person', personModel.updatePersoon)

router.post('/addBuy', personModel.addBuy);

router.post('/findBuy', personModel.findBuy);

router.put('/updateActive', personModel.updateActive)


module.exports = router;
