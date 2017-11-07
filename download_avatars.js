var secrets = require('./secret'); // Requiring secret module containing key
var request = require('request'); // Request module
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, callback){
  var options = {
    url: "https://api.github.com/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  }

  request(options, function(err, response, body){
    if(err){
      throw err;
    }
    var userData = callback(JSON.parse(body));
    userData.forEach(function(element){
      downloadImageByUrl(element.avatar_url, folderPath + element.login + '.jpg');
    })

  });

}

function downloadImageByURL(url, filePath) {
   request(url)
     .pipe(fs.createWriteStream(filePath));
 }




getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
});


