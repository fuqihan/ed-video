var express = require('express');
var router = express.Router();
var upload = require('../config/upload')
var talkModel = require('../models/talkModel');

router.post('/talk', talkModel.addTalk)

router.get('/talks', talkModel.findTalks);

router.get('/findTalkDetail', talkModel.findTalkDetail);


module.exports = router;
