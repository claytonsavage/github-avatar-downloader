var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');


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
  var avatarUrl = '';

  request(options, function(err, res, body) {
    cb(err, body)
      body.forEach(function(item){
        avatarUrl = item.avatar_url;

        downloadImageByURL(avatarUrl, 'avatars/' + item.login + '.jpeg');
      });
    });
  };

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
  .on('error', function (err) {
          console.log(err);
          throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log((response.statusMessage), (response.headers['content-type']));
       })
       .pipe(fs.createWriteStream(filePath));
}
