var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');
if (repoOwner != undefined && repoName != undefined) {
function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
    .on('error', function (err) {
      console.log(err);
      throw err;
    })
    .on('response', function (response) {
      console.log((response.statusMessage), (response.headers['content-type']));
    })
    .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: "token " + secrets.GITHUB_TOKEN
    },
    json: true
  };

  request(options, function(err, res, body) {
    cb(err, body);
    body.forEach(function(item){
      avatarUrl = item.avatar_url;
      downloadImageByURL(avatarUrl, 'avatars/' + item.login + '.jpeg');
    });
  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Downloading...");
});
} else {
  console.log('Please define repo owner and name...')
}
