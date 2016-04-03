var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var lingotwist = require('./index.js')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
 res.redirect('/index')
})

app.get('/index', function(req, res) {
 res.render('index')
})

app.post('/index', function(req,res){
  var userWords = []
  for(word in req.body){
    req.body[word] = '*' + req.body[word] + '*'
    userWords.push(req.body[word])
  }

  lingotwist(userWords, function(modifiedText){
     res.render('showText',modifiedText)
  })
})


module.exports = app