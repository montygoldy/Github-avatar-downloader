var secrets = require('./secret'); // Requiring secret module containing key
var request = require('request'); // Request module
var fs = require('fs'); // Create write stream is available to use now

//Command line arguments

var arg = process.argv.slice(2);
var repoOwner = arg[0];
var repoName = arg[1];

// Condition to required arguments

if(!repoOwner || !repoName){
  console.log("Please enter Repo owner and Repo name");
}else{

  function getRepoContributors(repoOwner, repoName, callback){
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + secrets.GITHUB_TOKEN
      }
    }

    request(options, function(err, response, body){
      if(err){
        throw err;
      }

      callback(JSON.parse(body));

    });
  }


  // Function to download the avatars to specified folder


  function downloadImageByURL(url, filePath) {
     request(url)
        .on('error', function(err){
          throw err;
        })

       .pipe(fs.createWriteStream(filePath));
   }


  // This is my callback function


  function my_callback_function (userData) {
    userData.forEach(function(element){
      downloadImageByURL(element.avatar_url, './avatars/' + element.login + '.jpg');
    })
  }

}
getRepoContributors(repoOwner, repoName, my_callback_function);


