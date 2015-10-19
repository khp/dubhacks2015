var data;

var oReq = new XMLHttpRequest();
oReq.onload = function(e){
	data = JSON.parse(this.responseText);
	populate(data);
	console.log(data);
}
oReq.open("get", "json/results.json", true);
oReq.send();

function populate(data) {
	var container = document.getElementById('container');
	for (var i = 0; i < data.result.length; i++) {
		if (i % 3 == 0) {
			var row = document.createElement('div');
			row.className = 'row';
			container.appendChild(row);
		}
		var entry = document.createElement('div');
		entry.className = "col-xs-12 col-sm-3 col-md-4";
		var name = document.createElement('strong');
		var company = document.createElement('a');
		var price = document.createElement('p');
		var img = document.createElement('img');
		var br = document.createElement('br');
		var br2 = document.createElement('br');
		img.className = 'icon';
		img.src = data.result[i].imageurl;
		name.textContent = data.result[i].name;
		company.href = data.result[i].url;
		company.textContent = data.result[i].company;
		price.textContent = data.result[i].price;
		entry.appendChild(img);
		entry.appendChild(name);
		entry.appendChild(br2);
		entry.appendChild(company);
		entry.appendChild(br);
		entry.appendChild(price);
		row.appendChild(entry);
	}
}