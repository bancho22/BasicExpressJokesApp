/**
 * Created by Bancho on 03-Mar-16.
 */

var jokes = ["A Fernet a day keeps the doctor away.",
    "Q: Why did the chicken cross the road? A: To get to the other beer.",
    "Chelsea is the best team in the Premier League."];

module.exports = {
    allJokes : jokes,
    getRandomJoke : function(){
        var i = Math.floor(Math.random() * jokes.length);
        if(i === jokes.length){
            i-=1;
        }
        return jokes[i];
    },
    addJoke : function(joke){
        jokes.push(joke);
    }
}
