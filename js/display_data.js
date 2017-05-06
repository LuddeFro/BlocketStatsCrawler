//search('Ford');

function displayData(data){
	var count = data.length < 20 ? data.length : 20;
	var average_price = 0;
	var min_price = 0;
	var max_price = 0;
	if(count > 0){
		var i = 0;
		min_price = 99999999;
		max_price = -9999999;
		for(i = 0; i < count; i++){
			average_price += data[i]._source.price;
			if(min_price > data[i]._source.price){
				min_price = data[i]._source.price;
			}
			if(max_price < data[i]._source.price){
				max_price = data[i]._source.price;
			}
		}
		average_price /= count;
	}
	console.log(min_price);
	console.log(max_price);
	console.log(average_price);
	console.log(data);
	console.log(data[0]);
	console.log(data[0]._source.price);

	var para = document.createElement("p");
	var text = document.createTextNode("First hit price: " + data[0]._source.price + " kr.");
	para.appendChild(text);

	var para_0 = document.createElement("p");
	var text_0 = document.createTextNode("Average price: " + average_price + " kr.");
	para_0.appendChild(text_0);

	var para_1 = document.createElement("p");
	var text_1 = document.createTextNode("Min price: " + min_price + " kr.");
	para_1.appendChild(text_1);

	var para_2 = document.createElement("p");
	var text_2 = document.createTextNode("Max price: " + max_price + " kr.");
	para_2.appendChild(text_2);

	var div = document.getElementById("priceStats");
	div.appendChild(para);
	div.appendChild(para_0);
	div.appendChild(para_1);
	div.appendChild(para_2);
}