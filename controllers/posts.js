var request = require('request-promise');
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

  storePosts: function( $ ) {
    var posts = $( '.ttl4reg' );
    var self = this;

    posts.filter(function(i, item) {

      var postReplaced = item.attribs.title.replace(/_/g, " ");
      postReplaced = postReplaced.split( '-(' )[ 0 ];

      self.arrPosts.push( postReplaced );

    });

    return self.getYoutubeVideos();
  },

  posts: function() {

    var url = 'http://1gabba.net/genre/hardstyle';
    var self = this;

    var options = {
        uri: url,
        transform: function (body) {
          return cheerio.load(body);
        }
    };

    return request(options).then(self.storePosts.bind(this));

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
        err ? deferred.reject(result) : deferred.resolve(data);
      });

      promises.push(deferred.promise);

    });

    return Q.all(promises).then(function(data) {
      return data;
    });

  }

};