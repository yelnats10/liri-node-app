var arg = process.argv[2];

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var keys = require('./keys.js');
var client = new Twitter(keys);

var sKeys = require('./spotifyKeys');
var spotify = new Spotify(sKeys);
var searchSong = process.argv[3];

var searchMovie = process.argv[3];

var fs = require('fs');

var sParams = {
    type: 'track',
    query: searchSong,
    // limit: 20
};

var tParams = {
    screen_name: '@erictechweb',
    count: 20
};

if (process.argv[3] === undefined) {
    sParams.query = "The Sign ace of base";
    searchMovie = "Mr. Nobody";
}

var queryOMDB = "http://www.omdbapi.com/?t=" + searchMovie + "&apikey=40e9cece";

function getTwitterData(error, tweets, response) {

    for (var i = 0; i < tweets.length; i++) {
        console.log("Tweet " + (i + 1));
        console.log("**********************************");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("**********************************");
        console.log("");
    }
}

function getSpotifyData(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items[0]);
    console.log("");
    console.log("**********************************");
    console.log("Artists: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Link to Preview Song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Name of Album: " + data.tracks.items[0].album.name);
    console.log("**********************************");
    console.log("");
}

function getMovie() {
    request(queryOMDB, function (error, response, body) {
        
                if (!error && response.statusCode === 200) {
                    console.log("");
                    console.log("**************************************");
                    console.log("Title is: " + JSON.parse(body).Title);
                    console.log("Year Released is: " + JSON.parse(body).Year);
                    console.log("IMDB Rating is: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country Produced is: " + JSON.parse(body).Country);
                    console.log("Language of Movie is: " + JSON.parse(body).Language);
                    console.log("The Movie's Plot is: " + JSON.parse(body).Plot);
                    console.log("Actors are: " + JSON.parse(body).Actors);
                    console.log("**************************************");
                    console.log("");
                }
            });
}

if (arg === "my-tweets") {

    client.get('statuses/user_timeline', tParams, getTwitterData);
} else if (arg === "spotify-this-song") {

    spotify.search(sParams, getSpotifyData);
} else if (arg === "movie-this") {

    getMovie();

} else if (arg === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        
        var command = dataArr[0];
        var lookUp = dataArr[1];

        if (command === "my-tweets") {
            client.get('statuses/user_timeline', tParams, getTwitterData);
        } else if (command === "spotify-this-song"){
            sParams.query = lookUp;
            spotify.search(sParams, getSpotifyData);
        }

        
        });

}



