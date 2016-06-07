var express = require('express');
var router = express.Router();
var cors   = require('cors');

router.get('/posts', cors(), function (req, res) {

  var postController = require('../server/controllers/posts')();

  postController.posts().then(function(data) {
    res.json({ posts: data });
  });

});

router.get('/posts/:page', cors(), function (req, res) {

  var postController = require('../server/controllers/posts')();

  postController.posts(req.params.version).then(function(data) {
    res.json({ posts: data });
  });

});

module.exports = router;
