//Our Twitter library
var Twit = require('twit');

var T = new Twit(require('./config.js'));

//Function to grab tweets containing "I'm"
var dadTweetSearch = {q: "I'm", count: 10, result_type: "recent"};
var dadHashSearch = {q: "#dad", count: 10, result_type: "recent"};


//Function that retweets tweets with hashtag "#dad".
function reTweet() {
    T.get('search/tweets', dadHashSearch, function (error, data) {
        //Prints errors to log.
        console.log(error, data);
        //No Errors.
        if(!error) {
            var retweet = data.statuses[0].id_str;
        T.post('statuses/retweet/' + retweet, { }, function (error, response) {
            if (response) {
				console.log('Success!')
			}
			// Twitter error.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
        })
        }
        // Search error
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
    });
}


//Function that finds tweets with "I'm"
function findTweet() {
    T.get('search/tweets', dadTweetSearch, function (error, data) {
        //Prints errors to log.
        console.log(error, data);
        //No errors
        if (!error) {
            //gets the text of the tweet as array of words
            var tweetTextArray = data.statuses[0].text.trim().split(" ");
            
            //gets the index of "I'm"
            var indexIm = 0;
            for (var i=0; i<tweetTextArray.length; i++){
                if (tweetTextArray[i].match("I'm")) {
                    indexIm = i;
                    break;
                }
            }
            
            //gets the word for the joke
            var jokeWord = tweetTextArray[indexIm+1];
            
            //Gets the ID of selected tweet.
            var tweetId = data.statuses[0].id_str;
            
            //Gets the useranme of the selected tweet.
            var username = data.statuses[0].user.screen_name;
            
            //code for the reply itself
            var reply = {
                status: '@' + username + " Hi " + jokeWord + ", I'm dad.",
                in_reply_to_status_id: '' + tweetId
            };
            
            //Posting the reply
            T.post('statuses/update', reply, function(err, data, response) {
      console.log(data);
            })
            
        // If there is an error.
        } else {
	  	    console.log('There was an error with your word search:', error);
	    }
    })
}
findTweet();
reTweet();
//Timing
setInterval(findTweet, 1000 * 30 * 30);
setInterval(reTweet, 1000 * 30 * 30);


