var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var google = require('googleapis');
var youtube = google.youtube({version: 'v3', auth: 'AIzaSyDwKeuaiYTFhgDQYkQRl8UCCDoK64tzahs'});

app.get('/scrape', function(req, res){

    var url = 'http://1gabba.net/genre/hardstyle';
    var arrItems = [];

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var items = $('.ttl4reg');

            items.filter(function(i, item) {
              var foo = item.attribs.title.replace(/_/g, " ");
              foo = foo.split('-(')[0];
              arrItems.push(foo);
            });

            console.log(arrItems);

            var queryOptions = {
                'part': 'snippet',
                'maxResults': 1,
                'q': arrItems[4]
            };

            youtube.search.list(queryOptions, function(err, data) {
                if(err) {
                    console.error(err);
                    return;
                }

                console.log(data.items[0].id.videoId);
            });
        }
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;