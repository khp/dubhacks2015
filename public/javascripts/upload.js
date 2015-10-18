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
var clarifai;
var imgElem = document.getElementById('img');
$('#urlText').keyup(function(){
   $('#img').attr('src',$('#urlText').val());
});
   
$(':button').click(function(){
var formData = new FormData($('form')[0]);
console.log(formData);
var imgData = JSON.stringify(getBase64Image(imgElem));
var reader = new FileReader();

init();
clarifai.getTaggings(formData);
  // $.ajax({
  // url: '/search',
  // dataType: 'json',
  // data: imgData,
  // type: 'POST',
  // success: function(data) {
  //   console.log(data);
  //   }
  // });
});

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

function init(){
    clarifai = new Clarifai(
        {
            'clientId': 'HM0gxfG9Cu4UyMS_c2HrieEUasbfF-VMr0WajYt-',
            'clientSecret': 'bzF3jssSAxDodvkEWK0VH3JMVE-q-Z59XCBzsyOM'
        }
    );
}
