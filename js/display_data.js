//search('Ford');

function displayData(data){
	console.log(data[0]);
	console.log(data[0]._source.price);

	var para = document.createElement("p");
	var text = document.createTextNode("First hit price: " + data[0]._source.price + " kr.");
	para.appendChild(text);

	var div = document.getElementById("priceStats");
	div.appendChild(para);
}