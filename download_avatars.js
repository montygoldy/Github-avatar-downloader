var secrets = require('./secret'); // Requiring secret module containing key
var request = require('request'); // Request module
var fs = require('fs');


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


function callback_function (userData) {

  userData.forEach(function(element){

      console.log(element.avatar_url);
  })
}



getRepoContributors("jquery", "jquery", callback_function);


