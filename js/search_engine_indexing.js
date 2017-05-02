// Establish a connection to the elasticserch service
var client = new elasticsearch.Client({
	host: 'http://localhost:9200',
	log: 'trace'
});

//Ping the elasticsearch client
client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

//Index a single ad with title and price into index 'ad-index', in type 'ad'
function index(title, price) {
	//console.log(title + '\nPrice: ' + price);

	client.index({
		index: 'ad-index',
		type: 'ad',
		body: {
			title: title,
			price: price,
		}
	}, function (error, response) {
		if (error) {
			console.log('There was an error...');
		}else{
			console.log('Successfull indexed:"' + title + '" with price: ' + price);
		}
	});
    return;
}

//Index several ads form the list 'ads', ads should be in a list with the format ads[i].title, ads[i].price
//Indexed into index 'ad-index', in type 'ad'
function bulkIndex(ads) {
	tempBody = [];

	//Convert to bulk indexing form
	for (var i = 0; i < ads.length; i++) {
		//Add a ned document to index
		tempBody.push( 
		    // action description
		    { index:  { _index: 'ad-index', _type: 'ad' } }
		);
	    
	    tempBody.push(
	    	// the document to index
	    	{ title: ads[i].title, price: ads[i].price }
	  	);
	};

	//console.log(tempBody);

	//Insert into index
	client.bulk({
		body: tempBody
	}, function (err, resp) {
		if (error) {
			console.log('There was an error...');
		}else{
			console.log('Successfull indexed bulk');
		}
	});
}

//Test bulk indexing
/*ads = [];
ads[0] = {};
ads[0].title = 'Ford';
ads[0].price = 1234;
ads[1] = {};
ads[1].title = 'BMW';
ads[1].price = 12344;
ads[2] = {};
ads[2].title = 'Tesla';
ads[2].price = 123423;
console.log(ads);
bulkIndex(ads);*/

//Search for title and print the result to the console
function search(title) {
	console.log('Searching for "' + title + '"');

	client.search({
		index: 'ad-index',
		type: 'ad',
		body: {
			query: {
				match: {
					title: title
					//title: 'Ford'
				}
			}
		}
	}).then(function (resp) {
		var hits = resp.hits.hits;
	}, function (err) {
		console.trace(err.message);
	});
    return;
}

//Test indexing
/*index("BMW i3", 123456);
index("BMW i5", 1256);
index("Volvo XC90", 1456);
index("Ford Focus", 13456);*/

//Test search
//search('Ford');

//The used relevance scores
// BM-25 relevance scores
// https://www.elastic.co/webinars/getting-started-elasticsearch?baymax=rtp&elektra=products&iesrc=ctr
// 23:18