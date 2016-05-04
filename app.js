var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

var postController = require('./controllers/posts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/posts', function (req, res) {
  postController.posts();
});

app.listen(3000);
module.exports = app;