var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index2', function(req, res, next) {
  res.render('index2');
});
router.post('/search', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
