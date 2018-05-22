var express = require('express');
var router = express.Router();
var upload = require('../config/upload')
var talkModel = require('../models/talkModel');

router.post('/talk', talkModel.addTalk)


module.exports = router;
