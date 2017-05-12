//search('Ford');

function sortNumber(a,b) {
    return a - b;
}

function displayData(data){
	var count = data.length < 20 ? data.length : 20;
	var average_price = 0;
	var mean_price = 0;
	var min_price = 0;
	var max_price = 0;
	if(count > 0){
		
		var i = 0;
		min_price = 99999999;
		max_price = -9999999;
		var prices = [];
		for(i = 0; i < count; i++){
			prices[i] = parseInt(data[i]._source.price);
			average_price += data[i]._source.price;
		}

		prices.sort(sortNumber);

		min_price = prices[0];
		max_price = prices[count-1];
		if(count % 2 == 0) {
			mean_price = prices[count/2-1];	
			mean_price += prices[count/2];	
			mean_price /= 2;
		} else {
			mean_price = prices[Math.round(count/2)-1];
		}
		
		average_price /= count;

		console.log(prices);

	}
	console.log(min_price);
	console.log(max_price);
	console.log(average_price);
	console.log(data);
	console.log(data[0]);
	console.log(data[0]._source.price);

	var para_0 = document.createElement("p");
	var text_0 = document.createTextNode("Average price: " + average_price + " kr.");
	para_0.appendChild(text_0);

	var para = document.createElement("p");
	var text = document.createTextNode("Median price: " + mean_price + " kr.");
	para.appendChild(text);


	var para_1 = document.createElement("p");
	var text_1 = document.createTextNode("Min price: " + min_price + " kr.");
	para_1.appendChild(text_1);

	var para_2 = document.createElement("p");
	var text_2 = document.createTextNode("Max price: " + max_price + " kr.");
	para_2.appendChild(text_2);

	var div = document.getElementById("priceStatsContent");
	while(div.firstChild)
		div.removeChild(div.firstChild);

	div.appendChild(para_0);
	div.appendChild(para);
	div.appendChild(para_1);
	div.appendChild(para_2);
}