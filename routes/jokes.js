/**
 * Created by Bancho on 03-Mar-16.
 */
var express = require('express');
var router = express.Router();

var jokes = require('../model/jokesArrayModule');

router.get("/joke", function(req, res, next){
    res.render('joke', { joke : jokes.getRandomJoke() });
});

router.get("/jokes", function(req, res, next){
    res.render('jokes', { jokes : jokes.allJokes });
});

router.get("/addJoke", function(req, res, next){
    res.render('addJoke');
});

router.post("/storeJoke", function(req, res, next){
    jokes.addJoke(req.body.newJoke);
    res.redirect("/jokes");
});

module.exports = router;