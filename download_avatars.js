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
        console.log(avatarUrl);
      });
    });
  };

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request.get("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
  .on('error', function (err) {
          throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log((response.statusMessage), (response.headers['content-type']));
         console.log('Downloading image...');
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream('./future.jpg'));
}

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg');
