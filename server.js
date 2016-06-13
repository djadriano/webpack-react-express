var express = require('express');
var path    = require('path');
var app     = express();
var router  = express.Router();
var cors   = require('cors');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');

app.enable('trust proxy');

app.use( '/', indexRouter );
app.use( '/', postsRouter );

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
