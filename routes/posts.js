var express = require('express');
var router = express.Router();
var cors   = require('cors');

router.get('/posts', cors(), function (req, res) {

  var postController = require('../controllers/posts')();

  postController.posts().then(function(data) {
    res.json({ posts: data });
  });

});

module.exports = router;
