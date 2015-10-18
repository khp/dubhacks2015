var express = require('express');
var router = express.Router();
var clarifai;

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
  // clarifai.getTagging(req);
  res.render('index');
});

module.exports = router;

function init(){
    clarifai = new Clarifai(
        {
            'clientId': 'HM0gxfG9Cu4UyMS_c2HrieEUasbfF-VMr0WajYt-',
            'clientSecret': 'bzF3jssSAxDodvkEWK0VH3JMVE-q-Z59XCBzsyOM'
        }
    );
}

getTagging = function(obj) {
    if (obj != null) {
        console.log(obj.body);
        $.ajax(
            {
                'type': 'POST',
                'url': baseUrl + 'v1/tag/',
                'data': obj.body,
                'processData': false,
                'contentType': 'application/json; charset=utf-8',
                'headers': {
                    'Authorization': 'Bearer ' + accessToken
                }
            } 
        ).then(
        function(json){
            if(json.status.status === "OK"){
              console.log(json);
            }
            if(json.status.status === 'ERROR'){
            }
        },
        function(e){
          console.log('error');
        }
    );
    }
}