var request = require('request');
var cheerio = require('cheerio');
var google = require('googleapis');
var Q = require('q');

var youtube = google.youtube({
  version: 'v3',
  auth   : 'AIzaSyDwKeuaiYTFhgDQYkQRl8UCCDoK64tzahs'
});

module.exports = {

  arrPosts: [],
  arrPostsVideos: [],

  posts: function() {

    var url = 'http://1gabba.net/genre/hardstyle';
    var self = this;

    request(url, function(error, response, html){

      if(!error){

        var $ = cheerio.load( html );

        var posts = $( '.ttl4reg' );

        posts.filter(function(i, item) {

          var postReplaced = item.attribs.title.replace(/_/g, " ");
          postReplaced = postReplaced.split( '-(' )[ 0 ];

          self.arrPosts.push( postReplaced );

        });

        self.getYoutubeVideos().then(function(data) {
          console.log('acaboooou', data);
        });

      }

    });

  },

  getYoutubeVideos: function() {

    var self = this;

    var promises = [];

    self.arrPosts.forEach(function(item, index){

      var deferred = Q.defer();

      var queryOptions = {
          'part'      : 'snippet',
          'maxResults': 1,
          'q'         : item
      };

      var promise = youtube.search.list(queryOptions, function(err, data) {
        if(err) {
          deferred.reject(result);
        }
        deferred.resolve(data);
      });

      promises.push(deferred.promise);

    });

    return Q.all(promises).then(function(data) {
      return data;
    });

  }

};