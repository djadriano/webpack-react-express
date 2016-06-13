var request = require('request-promise');
var cheerio = require('cheerio');
var google = require('googleapis');
var Q = require('q');

var youtube = google.youtube({
  version: 'v3',
  auth   : 'AIzaSyDwKeuaiYTFhgDQYkQRl8UCCDoK64tzahs'
});

module.exports = function() {
  return {
    arrPosts: [],
    arrPostsVideos: [],
    currentPage: 0,

    storePosts: function( $ ) {
      var posts = $( '.ttl4reg' );
      var self = this;
      var postData;

      posts.filter(function(i, item) {

        var postReplaced = item.attribs.title.replace(/_/g, " ");
        postReplaced = postReplaced.split( '-(' )[ 0 ];

        postData = {
          title: postReplaced,
          download: item.attribs.href
        };

        self.arrPosts.push( postData );

      });

      return self.getYoutubeVideos();

    },

    posts: function( page ) {

      var paramPage = '';
      var page = page || '';

      if( page != '' ) {
        paramPage = '?page=' + page;
      }

      var url = 'http://1gabba.net/genre/hardstyle' + paramPage;
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
            'part'           : 'snippet',
            'maxResults'     : 1,
            'type'           : 'video',
            'videoCategoryId': 10,
            'q'              : item.title
        };

        var promise = youtube.search.list(queryOptions, function(err, data) {
          err ? deferred.reject(result) : deferred.resolve({ download: item.download, data: data });
        });

        promises.push(deferred.promise);

      });

      return Q.all(promises).then(function(data) {
        var dataFiltered = data.filter(function(item) {
          if(item.data.items.length) return item;
        });

        return dataFiltered;
      });

    }
  };
};
