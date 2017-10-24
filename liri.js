var arg = process.argv[2];

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var keys = require('./keys.js');
var client = new Twitter(keys);

var sKeys = require('./spotifyKeys');
var spotify = new Spotify(sKeys);
var searchSong = process.argv[3];


function getTwitterData(error, tweets, response) {
    
    for(var i = 0; i < tweets.length; i++){
        console.log("Tweet " + (i+1));
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
    console.log("");
    console.log("**********************************");
    console.log("Artists: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Link to Preview Song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Name of Album: " + data.tracks.items[0].album.name);
    console.log("**********************************");
    console.log("");    
}

if (arg === "my-tweets"){
    var params = {
        screen_name: '@erictechweb',
        count: 20
    };
    client.get('statuses/user_timeline', params, getTwitterData);
} else if ( arg === "spotify-this-song") {
    var params = {
        type: 'track', 
        query: searchSong,
        limit: 1
    };
    spotify.search(params, getSpotifyData);
}



