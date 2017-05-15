
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse'); 

var elasticsearch = require('elasticsearch'); 

/* Parameters
 * ca 	region,   12 = Södermanland
 * w	1 = Chosen region, 2 = Nearby regions, 3 = Whole of Sweden
 * st	s = For sale, k = To purchase
 * cg	Category 5040 = Ljud & Bild
 */

var url = "https://www.blocket.se"
var ext = "/sodermanland/ljud_bild/foto_Videokameror"
var args = "?ca=12&w=1&st=s&cg=5040"
var t
var p
var $

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
function indexmf(title, price) {
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

request(url.concat(ext).concat(args), handlefetch);

function handlefetch(error, response, body) {
     if(response.statusCode !== 200) {
       return;
     }
     $ = cheerio.load(body);

     $('#item_list').find('article > div').each(function (index, element) {//> h1 > a').each(function (index, element) {
     		//item name
     		t = element.children[1].children[0].attribs.title
     		console.log(t);
     		//price if available
     		if ( typeof element.children[2].children[0] !== 'undefined') {
     			p = element.children[2].children[0].data;
                p = p.replace("kr", "");
                p = p.replace(":-", "");
                p = p.replace(" ", "");
                p = p.replace(" ", "");
                p = p.replace(",", "");
                p = p.replace(",", "");
                p = p.replace(".", "");
                p = p.replace(".", "");
                pi = parseInt(p);
     			console.log(pi);
     			indexmf(t, pi);
     		} else {
     			console.log('no price');
     		}
     		console.log("------------------------------------------------------");
     });

     page_nav_len = $('a.page_nav').length
     var nextargs = $('a.page_nav')[page_nav_len-2].attribs.href;

     if (nextargs !== args) {
     	console.log('moving on');
     	args = nextargs;
     	request(url.concat(ext).concat(args), handlefetch);
     } else {
     	console.log('all pages parsed');
     	return;
     }
  }







