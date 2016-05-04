var express = require('express');
var router = express.Router();
// var postController = require('../controllers/posts');

/* GET users listing. */
router.get('/posts', function(req, res, next) {
  // postController.posts();
  res.render('index', { title: 'Posts' });
});

module.exports = router;
