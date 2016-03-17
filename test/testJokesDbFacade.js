/**
 * Created by Bancho on 08-Mar-16.
 */

var expect = require("chai").expect;
var jokes = require("../model/jokesDbFacade");
var dbModule = require("../db/mongo");

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

    it("should find the triple-A joke", function(done){
        var db = dbModule.get();
        db.collection("jokes").find({"joke" : "aaa"}).toArray(function(err, data){
            if(err){
                throw new Error(err);
            }else{
                jokes.findJoke(data[0]._id, function(err, data){
                    expect(data[0].joke).to.be.equal("aaa");
                    done();
                });
            }
        });
    });

    it("should edit the triple-A joke into a triple-D joke", function(done){
        var db = dbModule.get();
        db.collection("jokes").find({"joke" : "aaa"}).toArray(function(err, data){
            if(err){
                throw new Error(err);
            }else{
                jokes.findJoke(data[0]._id, function(err, data){
                    if(err){
                        console.log(err.message);
                        done();
                    }
                    var jokeToEdit = data[0];
                    jokeToEdit.joke = "DDD";
                    jokes.editJoke(jokeToEdit, function(err, data){
                        if(err){
                            console.log(err.message);
                            done();
                        }
                        else{
                            expect(data.result.ok).to.be.equal(1);
                            done();
                        }
                    });
                });
            }
        });
    });

    it("should delete the triple-B joke", function(done){
        var db = dbModule.get();
        db.collection("jokes").find({"joke" : "bbb"}).toArray(function(err, data){
            if(err){
                throw new Error(err);
            }else{
                jokes.deleteJoke(data[0]._id, function(err, data){
                    if(err){
                        console.log(err.message);
                    }else{
                        expect(data.result.ok).to.be.equal(1);
                        done();
                    }
                });
            }
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
