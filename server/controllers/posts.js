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
      // var currentPage = $( '.drpager-page' ).varal();
      var posts = $( '.ttl4reg' );
      var self = this;

      posts.filter(function(i, item) {

        var postReplaced = item.attribs.title.replace(/_/g, " ");
        postReplaced = postReplaced.split( '-(' )[ 0 ];

        self.arrPosts.push( postReplaced );

      });

      return self.getYoutubeVideos();

      // return[
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/vVus7bfDv-Ge3-B4ZM04yQ6Frvc\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 1370,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/2rArcNx02cj8Ac_MxBYUQFR4Z7s\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "CFgcKzQaCR0"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-04-29T08:55:18.000Z",
      //             "channelId": "UC8tJW7k6rhRLqX-J1bKw6Rg",
      //             "title": "Pherato - Top Of The World (#SSL059)",
      //             "description": "For more music, subscribe at http://www.scantraxx.com/youtube Release date: 11/05/16 Connect: http://www.scantraxx.com http://www.scantraxx.com/facebook ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/CFgcKzQaCR0/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/CFgcKzQaCR0/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/CFgcKzQaCR0/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Scantraxx Recordz",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/YhCdfzlE4rXbq-ixl3HlEQIkZeM\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 72,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/PIK7AY8s8L0aeftr7ljQ5g2QMwU\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "ZZCTS4p6yGY"
      //           },
      //           "snippet": {
      //             "publishedAt": "2014-07-16T21:24:16.000Z",
      //             "channelId": "UCpY2V3ArypnRum9eDKfYidA",
      //             "title": "Volumes - 91367",
      //             "description": "Volumes \"91367\", from the album 'No Sleep'. In stores & online now iTunes - http://goo.gl/whCipS http://www.facebook.com/volumesband ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/ZZCTS4p6yGY/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/ZZCTS4p6yGY/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/ZZCTS4p6yGY/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Mediaskare Records",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/ZMEkll1EsS1gX-L6xsopE5BLkmg\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 14,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/grV9thFDIZErIobTj7OXyC-5aq8\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "v9pblmQ6Afc"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-04-22T11:45:54.000Z",
      //             "channelId": "UC9fOV9jzOwmycXllvKVHwxg",
      //             "title": "Yellow Claw Ft. Lil Eddie - We Made It (Jump A Delic Edit)",
      //             "description": "Titulo: Yellow Claw Ft. Lil Eddie - We Made It (Jump A Delic Edit) Free Download: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/v9pblmQ6Afc/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/v9pblmQ6Afc/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/v9pblmQ6Afc/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "JumpadelicMusic",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/G7lKOy6d2hqTXuptSdSN6PNAb8k\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 1573,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/a4A3fzmSue9hekuEC5bFxRuyWZY\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "XRPcIW7hO98"
      //           },
      //           "snippet": {
      //             "publishedAt": "2015-12-20T11:13:35.000Z",
      //             "channelId": "UClByMsXFafMi8DRtehn-0Qg",
      //             "title": "Raeven & Qlone - The Haunted House |HD;HQ|",
      //             "description": "Hard RecordZz On Youtube.com ::.:.. http://www.hardrecordzz.cz/ Click Here To Subscribe:: http://bit.ly/SubscribeHRC Twitter: http://bit.ly/FollowHRC Facebook: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/XRPcIW7hO98/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/XRPcIW7hO98/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/XRPcIW7hO98/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Hard Recordzz",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/1-n18BI5LCTHsH_rrUSbMG446WQ\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 1952,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/X5jMXidg4RTWFaP_otKmF8k-jsY\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "i7ZcOfVDlmQ"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-04-26T17:00:03.000Z",
      //             "channelId": "UCt8hUmML7zjM6effdZ3Ip5A",
      //             "title": "Riiho - Execute (Official HQ Preview)",
      //             "description": "DOWNLOAD: https://Any.lnk.to/ExecuteYL ◉ Subscribe to Dirty Workz: http://bit.ly/DWX_Subscribe ▽Subscribe to our Spotify playlist: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/i7ZcOfVDlmQ/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/i7ZcOfVDlmQ/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/i7ZcOfVDlmQ/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Dirty Workz",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/AU3Fyo6BAlQCCpQRlzxNY4rEl1Q\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 289,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/b3TmGNP1dgozb0x2c6h4wLvn0Y4\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "AlwISlNqyrw"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-05-09T13:01:52.000Z",
      //             "channelId": "UC9QmxPabyFhmSSE3VpXTC4A",
      //             "title": "Bass Modulators - Dragonblood (Defqon.1 Anthem 2016)",
      //             "description": "Bass Modulators - Dragonblood (Defqon.1 Anthem 2016) is out now on Q-dance Records: https://qdance.lnk.to/Defqon2016SY • Subscribe: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/AlwISlNqyrw/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/AlwISlNqyrw/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/AlwISlNqyrw/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Speqtrum Music",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/lPqdpA3bYIDV634IskCRI72Hw0Y\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 416,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/n7M9jNukdOLi8TtEpR-EY6aHAgI\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "byi91mLq6TU"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-02-21T18:11:05.000Z",
      //             "channelId": "UC6murUWtqOwnTL68pwjoGjQ",
      //             "title": "Hypnose - Our Vision [Mastered Rip]",
      //             "description": "EuphoricHardStyleZ YouTube Channel. ::.:.. .If you like my uploadz please subscribe to my channels: EuphoricHardStyleZ (The latest & greatest tracks & EPs) ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/byi91mLq6TU/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/byi91mLq6TU/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/byi91mLq6TU/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "EuphoricHardStyleZ",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/nqS96Wu9_-Nxc69iHq8vYDx45dE\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 25,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/H31WiO_lmSbKCfw0Zu7VzBTNW10\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "CobdAfiQ6eI"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-04-26T09:17:04.000Z",
      //             "channelId": "UClh_-8xkbSZxZ2vX1CCkLcA",
      //             "title": "Dr Crank ft. Farisha - Hero (Original Mix)",
      //             "description": "Get it at https://itunes.apple.com/us/album/hero-feat.-farisha-single/id1108927334.",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/CobdAfiQ6eI/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/CobdAfiQ6eI/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/CobdAfiQ6eI/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "SubsonicMuzik",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/P0svZ3MnRIa_KjhBxxP1uOSpJ5A\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 6,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/DFp0FMIN1BEQVWRCGqaeP7Kdmt4\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "uuA8XxCdTHo"
      //           },
      //           "snippet": {
      //             "publishedAt": "2012-01-22T00:48:37.000Z",
      //             "channelId": "UCTHSpZ1QbCh8r41AT8IodBQ",
      //             "title": "Alphaverb - Realization Of A Nightmare (Intractable One Remix)",
      //             "description": "",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/uuA8XxCdTHo/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/uuA8XxCdTHo/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/uuA8XxCdTHo/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "DestructorBass",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/NyRLvb9nXONg7SSWHE2X4RSurcY\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 159,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/9N3XsV5gGShvzU8ZbN9mekdC5W4\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "l09wRHSfhjM"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-03-25T13:21:36.000Z",
      //             "channelId": "UCpOGWfDLXIzdp09SViua2Bg",
      //             "title": "Unresolved - Feelings (HSF 2016 Anthem) (Official Preview)",
      //             "description": "Soundcloud Preview: https://soundcloud.com/unresolvedmedia/unresolved-feelings-hsf-2016-anthem-official-preview Join the event here 16/04/2016 ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/l09wRHSfhjM/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/l09wRHSfhjM/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/l09wRHSfhjM/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Unresolved",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/s_hLMNN0ReHdOG9iMFpc48hio2c\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 1539,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/LslyccFgBw-Hv1aazu2aUB8ETP4\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "Q0XLkxd9K_c"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-05-06T13:05:38.000Z",
      //             "channelId": "UC6murUWtqOwnTL68pwjoGjQ",
      //             "title": "Firelite - Burnin' Up [HQ Preview]",
      //             "description": "EuphoricHardStyleZ YouTube Channel. ::.:.. .If you like my uploadz please subscribe to my channels: EuphoricHardStyleZ (The latest & greatest tracks & EPs) ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/Q0XLkxd9K_c/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/Q0XLkxd9K_c/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/Q0XLkxd9K_c/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "EuphoricHardStyleZ",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/Ky-D9ybOtRJ6ORCjbQ7sCz8g-b8\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 186,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/UsulJBZ7OwP_HksvsnHc9X86GWk\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "stRLTH8Bp5U"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-05-04T18:04:30.000Z",
      //             "channelId": "UC6JIjiujfwdesQm3G-lam3A",
      //             "title": "Tyree - Let The Music Take Control (tyree's house is in control mix) 1990",
      //             "description": "Audio Lineage: 1. Hardware: Vinyl on Technics SL-1210 MK2 w/Stanton 680HP connected to Onkio A-8150 amplifier → PC 2. Recording software: Magix Clean ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/stRLTH8Bp5U/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/stRLTH8Bp5U/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/stRLTH8Bp5U/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "I8B4FLEW",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/B4N6Hjuwg2eQpxBKtZGAQgKmJro\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 9,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/rVfj1djxKgYIxr36X6-EZkG0I4U\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "3Kp5tOqkOw4"
      //           },
      //           "snippet": {
      //             "publishedAt": "2015-01-20T17:33:33.000Z",
      //             "channelId": "UCH-GFr_3jzTgx4Lvm50XD8w",
      //             "title": "Argy & Re Tech - Rotter [GBD092]",
      //             "description": "Release Date 02.02.2015 Gearbox's next release is a meeting of minds of two of the finest talents in the UK in the form of Argy and Re-Tech. The two have had a ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/3Kp5tOqkOw4/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/3Kp5tOqkOw4/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/3Kp5tOqkOw4/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Gearbox Digital",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/0TC3rXxC96IGVLzlHjFZWz-a40o\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 2142,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/7uvtIB3dcOhPi9HdmE2oNB7aVOA\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "oyaQwhDIJ1U"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-05-02T14:54:04.000Z",
      //             "channelId": "UCvGExFnbGi1RKJoiQmU6z6w",
      //             "title": "Requiem & Warface - Ways of the Underground",
      //             "description": "Requiem & Warface Ways of the Underground Label: Fusion (FUSION 256) Releasedate : 09-05-2016 Merchandise: noizevizion.com For bookings: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/oyaQwhDIJ1U/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/oyaQwhDIJ1U/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/oyaQwhDIJ1U/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "WarfaceOfficial",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/ERbplRG-mNlqz9yRAvCvaF64LH8\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 571,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/4MEO4cGbtXKRGebdLfp_9PhyAe8\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "xPU8OAjjS4k"
      //           },
      //           "snippet": {
      //             "publishedAt": "2009-11-21T11:22:55.000Z",
      //             "channelId": "UCRxxOhTdsfA0hdvDG9Tb0HA",
      //             "title": "3 Doors Down - Kryptonite",
      //             "description": "Music video by 3 Doors Down performing Kryptonite. (C) 2000 Universal Records, a Division of UMG Recordings, Inc.",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/xPU8OAjjS4k/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/xPU8OAjjS4k/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/xPU8OAjjS4k/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "3DoorsDownVEVO",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/bptj14HovkfGHyN5Ss2ZgJoDsm4\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 883,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/ylcxpEPtX4vGYHUSTwC9DuKicRk\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "YioZ5U-NXrI"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-04-22T13:14:55.000Z",
      //             "channelId": "UC8tJW7k6rhRLqX-J1bKw6Rg",
      //             "title": "Audiotricz & Devin Wild - Zombies (#SCAN210)",
      //             "description": "For more music, subscribe at http://www.scantraxx.com/youtube Out now! Get it here: https://scan.lnk.to/210YD Representing the next generation of headliners, ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/YioZ5U-NXrI/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/YioZ5U-NXrI/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/YioZ5U-NXrI/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Scantraxx Recordz",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/hINGRJs9CH32XhuDUX21UdBaWBI\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 82,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/Q3_nwL8a8M6JJGE_zxIu1qbTZ9M\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "oM-YhdKddgQ"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-03-24T07:17:15.000Z",
      //             "channelId": "UCU1-ZSomR6dzGGlhVD45Bfw",
      //             "title": "Toneshifterz Ft. DVERSE - Back with a Vengeance (Official Video Clip)",
      //             "description": "Toneshifterz and DVERSE collaborate to bring you a hardstyle track with a new flavour, incorporating hiphop and trap into the mix! Will be released on WE R ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/oM-YhdKddgQ/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/oM-YhdKddgQ/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/oM-YhdKddgQ/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Toneshifterz",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       "kind": "youtube#searchListResponse",
      //       "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/kfAjMnlpV4Lxg-axx1J1b5rXmPE\"",
      //       "nextPageToken": "CAEQAA",
      //       "regionCode": "BR",
      //       "pageInfo": {
      //         "totalResults": 141,
      //         "resultsPerPage": 1
      //       },
      //       "items": [
      //         {
      //           "kind": "youtube#searchResult",
      //           "etag": "\"kiOs9cZLH2FUp6r6KJ8eyq_LIOk/de7CMY2_tL3tRKSF4YwN-F89TP0\"",
      //           "id": {
      //             "kind": "youtube#video",
      //             "videoId": "XRGlS0TsSzk"
      //           },
      //           "snippet": {
      //             "publishedAt": "2016-05-02T09:24:10.000Z",
      //             "channelId": "UCsyhczBBmtcBKwVqCLko8Ig",
      //             "title": "Concept Art - Wrong Crowd [DT15]",
      //             "description": "Buy or stream: http://listento.derailedtraxx.com/WrongCrowdYo ▽ Play it loud Check our spotify playlist The Sound of Hardstyle: ...",
      //             "thumbnails": {
      //               "default": {
      //                 "url": "https://i.ytimg.com/vi/XRGlS0TsSzk/default.jpg",
      //                 "width": 120,
      //                 "height": 90
      //               },
      //               "medium": {
      //                 "url": "https://i.ytimg.com/vi/XRGlS0TsSzk/mqdefault.jpg",
      //                 "width": 320,
      //                 "height": 180
      //               },
      //               "high": {
      //                 "url": "https://i.ytimg.com/vi/XRGlS0TsSzk/hqdefault.jpg",
      //                 "width": 480,
      //                 "height": 360
      //               }
      //             },
      //             "channelTitle": "Derailed Traxx",
      //             "liveBroadcastContent": "none"
      //           }
      //         }
      //       ]
      //     }
      // ];

    },

    posts: function( page ) {

      var paramPage = '';
      var page = page || '';

      if( page != '' ) {
        paramPage = '?' + page;
      }

      var url = 'http://1gabba.net/genre/hardstyle' + paramPage;
      var self = this;

      console.log('url', url);

      var options = {
        uri: url,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      return request(options).then(self.storePosts.bind(this));

      // self.storePosts.bind(this);

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
            'q'              : item
        };

        var promise = youtube.search.list(queryOptions, function(err, data) {
          err ? deferred.reject(result) : deferred.resolve(data);
        });

        promises.push(deferred.promise);

      });

      return Q.all(promises).then(function(data) {
        var dataFiltered = data.filter(function(item) {
          if(item.items.length) return item;
        });

        return dataFiltered;
      });

    }
  };
};
