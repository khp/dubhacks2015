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
router.get('/results', function(req, res, next) {
  client.itemSearch({ 
  	keywords: 'Hello'
  }).then(function(results){

    console.log(results);
  	res.render('results', {result: results});
    
  }).catch(function(err){
    console.log(err.Error[0].Code);
   console.log(err.Error[0].Message);
  });
    // res.render('results');
});
router.post('/search', function(req, res, next) {
console.log(req.body);
  getTagging(req);
  res.render('index');
});

module.exports = router;

var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: "AKIAJBSNE3CE36TWT6YA",
  awsSecret: "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"
});

function itemSearch(){
client.itemSearch({ 
	keywords: 'yoooo'
}).then(function(results){
  //console.log(results);
}).catch(function(err){
  //console.log(err.Error[0].Code);
 // console.log(err.Error[0].Message);
});
}