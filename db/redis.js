/**
 * Created by Bancho on 17-Mar-16.
 */

var redis = require("redis");
var client;

function connect(done){
    if(client){
        return done();
    }
    client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});
    client.auth("omega1234", function (err) {
        if (err) {
            return done(err);
        }
        console.log("Connection to Redis successful");
        return done();
    });
}

function get(){
    return client;
}

function close(done){
    if(client){
        client.quit();
        done();
    }
    done();
}

module.exports.connect = connect;
module.exports.getClinet = get;
module.exports.close = close;