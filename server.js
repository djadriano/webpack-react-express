var express = require('express');
var path    = require('path');
var app     = express();
var router  = express.Router();
var cors   = require('cors');

var postController = require('./controllers/posts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.enable('trust proxy');

app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

router.options('/posts', cors());
router.get('/posts', cors(), function (req, res) {
  postController.posts();
});

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});