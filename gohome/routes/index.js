var express = require('express');
var router = express.Router();

var googleMapsAPI = require('../controller/googleMapsAPI');

/* GET home page. */
router.get('/', googleMapsAPI.hello);

module.exports = router;
