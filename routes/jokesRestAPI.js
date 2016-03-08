var express = require('express');
var router = express.Router();

var jokes = require('../model/jokesArrayModule');

router.get('/joke/random', function(req, res, next) {
  res.json(jokes.getRandomJoke());
});

router.get('/jokes', function(req, res, next) {
  res.json(jokes.allJokes);
});

router.post('/joke', function(req, res, next) {
  var joke = req.body.newJoke;
  jokes.addJoke(joke);
  res.json(joke);
});

module.exports = router;
