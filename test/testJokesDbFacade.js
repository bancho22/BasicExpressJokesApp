/**
 * Created by Bancho on 08-Mar-16.
 */

var expect = require("chai").expect;
var jokes = require("../model/jokesDbFacade");
var dbModule = require("../db/db");

var testJokes = [
    {
        "joke" : "aaa",
        "type" : ["short", "alcohol", "quote"],
        "reference": { "author" : "Someone", "link" : ""},
        "lastEdited" : new Date()
    },
    {
        "joke" : "bbb",
        "type" : ["short", "joke"],
        "reference": { "author" : "Someone", "link" : ""},
        "lastEdited" : new Date()
    },
    {
        "joke" : "ccc",
        "type" : ["short", "joke"],
        "reference": { "author" : "Someone", "link" : ""},
        "lastEdited" : new Date()
    }
];

describe("the jokes facade", function(){

    before(function(done){
        dbModule.connect("mongodb://localhost:27017/test", function(){
            done(); //so that the tests don't start before the connection to the dbModule has been established
        });
    });

    beforeEach(function(done){
        var db = dbModule.get();
        db.collection("jokes").deleteMany({}, function(err, data){
            if(err){
                throw new Error(err);
            }
            db.collection("jokes").insertMany(testJokes, function(err, data){
                if(err) {
                    throw new Error(err);
                }
                done();
            });
        });
    });

    it("should find three jokes", function(done){
        jokes.allJokes(function(err, data){
            expect(data.length).to.be.equal(3);
            done();
        });
    });

    after(function(){
        var db = dbModule.get();
        db.collection("jokes").deleteMany({}, function(err, data){
            if(err){
                throw new Error(err);
            }
            dbModule.close(function(err){
                if(err){
                    console.log(err.message);
                }
            });
        });
    });
});
