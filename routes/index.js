var express = require('express');
var router = express.Router();
var clarifai;
// var $ = require('jquery');
// var request = require('request');

var baseUrl = 'https://api-alpha.clarifai.com/v1/';
var collectionId = 'default';
var accessToken = 'zRigm7MryebDi9RUlpknO8nCmjNBvW';
var nameSpace = 'default';
var collectionId = 'default';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index2', function(req, res, next) {
  res.render('index2');
});
router.post('/search', function(req, res, next) {
	console.log(req.body);
  getTagging(req);
  res.render('index');
});

module.exports = router;
