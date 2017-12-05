var request = require('request');
var secrets = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: "token " + secrets.GITHUB_TOKEN,
    },
    json : true
  };

  request(options, function(err, res, body) {
    cb(err, body)
      body.forEach(function(item){
        console.log(item.avatar_url)
      });
    });
  };

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

