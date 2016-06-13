var express = require('express');
var router = express.Router();
var cors   = require('cors');

router.get('/posts', cors(), function (req, res) {

  var postController = require('../server/controllers/posts')();

  postController.posts().then(function(data) {
    res.json({ posts: data });
  });

});

router.get('/posts/page/:page', cors(), function (req, res) {

  var postController = require('../server/controllers/posts')();

  postController.posts(req.params.page).then(function(data) {
    res.json({ posts: data });
  });

});

module.exports = router;
