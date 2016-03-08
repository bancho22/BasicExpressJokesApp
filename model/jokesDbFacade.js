/**
 * Created by Bancho on 08-Mar-16.
 */

var connect = require("../db/db");

function _allJokes(done){
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function(err, data){
        if(err){
            done(err);
        }else{
            done(null, data);
        }
    });
}

exports.allJokes = _allJokes;
