// $(':button').click(function(){
//     var formData = new FormData($('form')[0]);
//     $.ajax({
//         url: '/search',  //Server script to process data
//         type: 'POST',
//         xhr: function() {  // Custom XMLHttpRequest
//             var myXhr = $.ajaxSettings.xhr();
//             if(myXhr.upload){ // Check if upload property exists
//                 myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
//             }
//             return myXhr;
//         },
//         //Ajax events
//         // beforeSend: beforeSendHandler,
//         success: completeHandler,
//         // error: errorHandler,
//         // Form data
//         data: formData,
//         //Options to tell jQuery not to process data or worry about content-type.
//         cache: false,
//         contentType: false,
//         processData: false
//     });
// });

// function progressHandlingFunction(e){
//     if(e.lengthComputable){
//         $('progress').attr({value:e.loaded,max:e.total});
//     }
// }

// function completeHandler() {

// }
document.addEventListener('DOMContentLoaded', function() {
  var clarifai;
  var imgElem = document.getElementById('img');
  $('#urlText').keyup(function(){
     $('#img').attr('src',$('#urlText').val());
  });
      
  // function init(){
  //     clarifai = new Clarifai(
  //         {
  //             'clientId': 'HM0gxfG9Cu4UyMS_c2HrieEUasbfF-VMr0WajYt-',
  //             'clientSecret': 'bzF3jssSAxDodvkEWK0VH3JMVE-q-Z59XCBzsyOM'
  //         }
  //     );
  // }

  function getBase64Image(imgElem) {
  // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
      var canvas = document.createElement("canvas");
      canvas.width = imgElem.clientWidth;
      canvas.height = imgElem.clientHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imgElem, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }



      function readURL(input, urlSuffix) {
        console.log(input);
          if (input[0].files && input[0].files[0]) {
              var reader = new FileReader();
             
            reader.onload = function (e) {
            	var data = { 'encoded_data': e.target.result.substring(22) };
      		    $.ajax(
      		        {
    		            'type': 'POST',
    		            'contentType': 'application/json; charset=utf-8',
    		            'processData': false,
    		            'data': JSON.stringify(data),
    		            'url': 'https://api.clarifai.com/v1/tag/',
    		            'headers': {
    		                'Authorization': 'Bearer ' + 'osEcIaBYtBBzDjz6Vg4xW2oIsTDt0r'
    		            }
                  }).done(function(res) {
      		        	console.log(res);
      		        	var toSend = [];
                    for (var i = 0; i < 5 && i < res.results[0].result.tag.classes.length; i++) {
                      urlSuffix += "res"+i+"="+res.results[0].result.tag.classes[i] + "&";
                    }
      		        	console.log(urlSuffix);
      		        	res.results[0].result.tag.classes
                    window.open('results'+urlSuffix,'_self',false);
      		        });

  			    }
            reader.readAsDataURL(input[0].files[0]);
            console.log(urlSuffix);
            return urlSuffix;
          }      
    }
    
    document.getElementById('submitButton').addEventListener('click', function() {
      var textInput = $('#urlText').val();
      var urlSuffix = '?';
      if (textInput == '') {
        readURL($('#uploadButton'), urlSuffix);
      } else {
        readURLfromText(textInput, urlSuffix);
      }
      // window.open('results'+urlSuffix,'_self',false);
    });

    $('#urlText').keypress(function (e) {
     var key = e.which;
     if (key == 13) 
      {
        $('#submitButton').click();
        return false;  
      }
    });

    function readURLfromText(input, urlSuffix) {
      $.ajax(
          {
              'type': 'GET',
              'url': 'https://api.clarifai.com/v1/tag/?url=' + input,
              'headers': { 'Authorization': 'Bearer ' + 'osEcIaBYtBBzDjz6Vg4xW2oIsTDt0r' }
          }).done(function(res) {
            console.log(res);
            var toSend = [];
            var urlSuffix = "?";
            for (var i = 0; i < 5 && i < res.results[0].result.tag.classes.length; i++) {
              urlSuffix += "res"+i+"="+res.results[0].result.tag.classes[i] + "&";
            }
            console.log(urlSuffix);
            res.results[0].result.tag.classes;
            window.open('results'+urlSuffix,'_self',false);
          });
      return urlSuffix;
  }

  function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
});