var data;

var oReq = new XMLHttpRequest();
oReq.onload = function(e){
	data = JSON.parse(this.responseText);
	console.log(data);
}
oReq.open("get", "json/results.json", true);
oReq.send();
