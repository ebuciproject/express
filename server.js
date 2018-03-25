var express, app, handlebars, fortune;

express = require('express');
app = express();
handlebars = require('express3-handlebars')
  .create({defaultLayout:'main'});
fortune = require('./lib/fortune.js')

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

// Custom 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});