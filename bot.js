// Our Twitter library
var Twit = require('twit');

var T = new Twit(require('./config.js'));

//Function to grab tweets containing "I'm"
var dadTweetSearch = {q: "I'm", count: 10, result_type: "recent", lang: 'en'};

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
            
        }
    })
}

//Timing
setInterval(findTweet, 1000 * 30 * 30);



//OLD CODE JUST IN CASE

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
//var mediaArtsSearch = {q: "#mediaarts", count: 10, result_type: "recent"}; 


// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.


//function retweetLatest() {
//	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // log out any errors and responses
//	  console.log(error, data);
	  // If our search request to the server had no errors...
//	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
//		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
//		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
//			if (response) {
//				console.log('Success! Check your bot, it should have retweeted something.')
//			}
			// If there was an error with our Twitter call, we print it out here.
//			if (error) {
//				console.log('There was an error with Twitter:', error);
//			}
//		})
//	  }
	  // However, if our original search request had an error, we want to print it out here.
//	  else {
//	  	console.log('There was an error with your hashtag search:', error);
//	  }
//	});
//}

// Try to retweet something as soon as we run the program...
//retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(retweetLatest, 1000 * 60 * 60);
