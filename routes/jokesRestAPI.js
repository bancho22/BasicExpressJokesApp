var express = require('express');
var router = express.Router();

var jokes = require('../model/jokesDbFacade');

router.get('/joke/random', function (req, res, next) {
    jokes.randomJoke(function(err, data){
        if(err){
            res.json(err);
            return;
        }else{
            res.json(data);
        }
    });
});

router.get('/jokes', function (req, res, next) {
    console.log("and what about this one?");
    jokes.allJokes(function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.get("/joke/:_id", function(res, req, next){
    var _id = req.params._id;
    jokes.findJoke(_id, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

//below function needs to be fixed up with a callback
router.post('/joke', function (req, res, next) {
    var joke = req.body.newJoke;
    jokes.addJoke(joke);
    res.json(joke);
});

router.put("/joke", function (req, res, next) {
    var joke = req.body.editedJoke;
    jokes.editJoke(joke, function (err, data) {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.delete("/joke/:_id", function(req, res, next){
    var _id = req.params._id;
    jokes.deleteJoke(_id, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

module.exports = router;
