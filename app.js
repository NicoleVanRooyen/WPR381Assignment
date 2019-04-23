const readline = require('readline');
var menu;

// Main Menu
function showMain() {
    // Clears the screen
    process.stdout.write('\033c');

    //Menu options
    console.log(
      '1 = Search Twitter' + '\n' +
      '2 = Search Spotify'  + '\n' +
      '3 = Search OMDb'  + '\n' +
      '4 = Run Textfile'  + '\n' +
      '5 = Quit'  + '\n' +
      'Choose a number, then press ENTER:'
      );
      //Menu handling
    if(menu) menu.close();

    //Allows program to readline
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Gives user time to input
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': showSub1(); break;
            case '2': showSub2(); break;
            case '3': showSub3(); break;
            case '4': showSub4(); break;
            default: showMain() 
        }
    });
}

function showSub1(twitterName) {
  // Clears the screen
  process.stdout.write('\033c');

  //Allows user input
  console.log("Enter a twitter name to search?");

  //Menu handling
  if(menu) menu.close();

  //Reads line
  menu = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  //Allows user to enter a twitter username for search
  menu.question('Twitter name: ', function(input) {
      switch(input) {
          default:  
// calls the twitter api
           getTweets(input);
          break;
          }     
      })
    }

//OMDB option
function showSub3() {
    // Clears screen
    process.stdout.write('\033c');

    //Allows user input
    console.log("Enter a movie name to search?");

    //Menu handling
    if(menu) menu.close();

    //Reads line
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Allows user to enter movie name to search
    menu.question('Movie name: ', function(input) {
        switch(input) {
            default:
             
//connects to API and returns a JSON object                  
             getMovie(input);
            break;
            }     
        })
      }

      function showSub2(artist) {
        //Clears the screen
        process.stdout.write('\033c');
    
        //Allows user input
        console.log("Enter an artists name to search?");
    
        //Menu handling
        if(menu) menu.close();
    
        //reads line
        menu = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
//Prompts user for input

        menu.question('Artist/Song name: ', function(input) {
            switch(input) {
                default:
                getMusic(input);
                break;
                }     
            })
          }
            
function showSub4() {
  // Clears the screen
  process.stdout.write('\033c');

  //Menu handling
  if(menu) menu.close();

  var fs = require("fs");
    fs.readFile("Random.txt", function(err,data){
      var result = data.toString().split("/");
      var twitterName = result[0];
      var artist = result[1];
      var movie = result[2];

      getTweets(twitterName);
      getMusic(artist);
      getMovie(movie);
    });
}     
       
//Function that calls Twitter API
function getTweets(input){
      var latestTweets = require('latest-tweets') 
      latestTweets(input, function (err, tweets) {
      console.log(tweets)
  });
}


//Function that calls movie API
function getMovie(input){
          var request = require('request');
          request('http://www.omdbapi.com/?r=json&i=tt3896198&apikey=90bdbeeb&t=' + input, function (error, response, body) {
          var obj = JSON.parse(body);
          console.log("Title: "+obj['Title']);
          console.log("Year: "+obj['Year']);
          console.log("Rating: "+obj['Rated']);
          console.log("Release: "+obj['Released']);
          console.log("Language: "+obj['Language']);
          console.log("Genre: "+obj['Genre']);
          console.log("Runtime: "+obj['Runtime']);
          console.log("Director: "+obj['Director']);
          console.log("IMDB Rating: "+obj['imdbRating']);
          console.log("Country: "+obj['Country']);
    });            
}


//Function that calls Spotify API
function getMusic(input){
  var SpotifyWebApi = require('spotify-web-api-node');
//Call spotify api
                var spotifyApi = new SpotifyWebApi({
                  clientId: '406684abc3ee4cbb8c576e2d5d8be96c',
                  clientSecret: '631cb5d1cc07401180d24884494cd773',
                  redirectUri: 'http://www.example.com/callback'
                });
                
                spotifyApi.clientCredentialsGrant().then(
                    function(data) {
                      spotifyApi.setAccessToken(data.body['access_token']);
                      return spotifyApi.searchTracks(input);
                    })
                    .then(function(data) {
                      var firstPage = data.body.tracks.items;
                      firstPage.forEach(function(track, index) {
                        console.log(index + ': ' + track.name );
                      });
                    })
                    .catch(function(err) {
                      console.log('Something went wrong:', err.message);
                    }); 
        }

        
showMain()

