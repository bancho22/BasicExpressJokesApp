/**
 * Created by Bancho on 08-Mar-16.
 */

var connect = require("../db/mongo");

function _allJokes(callback){
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, data);
        }
    });
}

function _findJoke(id, callback){
    var db = connect.get();
    db.collection("jokes").find({"_id" : id}).toArray(function(err, data){
        if(err){
            callback(err);
        }
        else{
            callback(null, data);
        }
    });
}

function _editJoke(jokeToEdit, callback){
    var db = connect.get();
    db.collection("jokes").updateOne({"_id" : jokeToEdit._id},
        {
            $set: {"joke" : jokeToEdit.joke},
            $currentDate: {"lastUpdated" : true}
        }, function(err, data){
            if(err){
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
}

function _deleteJoke(id, callback){
    var db = connect.get();
    db.collection("jokes").deleteOne({"_id" : id}, function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, data);
        }
    });
}

function _randomJoke(callback){
    _allJokes(function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, data[Math.floor(Math.random() * data.length)]);
        }
    });
}


exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke = _randomJoke;
