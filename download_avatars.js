var secrets = require('./secret'); // Requiring secret module containing key
var request = require('request'); // Request module

function getRepoContributors(repoOwner, repoName, callback){
  var options = {
    url: "https://api.github.com/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
  }

  request(options, function(err, response, body){
    callback(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});