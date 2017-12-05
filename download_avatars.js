//define variables and requirements
var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//welcome message
console.log('Welcome to the GitHub Avatar Downloader!');

//check that there is no missing information
if (repoOwner != undefined && repoName != undefined) {
//download the image to the avatars folder
  console.log("Downloading...");

  function downloadImageByURL(url, filePath) {
    request
      .get(url, filePath)
      .on('error', function (err) {
        console.log(err);
        throw err;
      })
      .on('response', function (response) {
        console.log((response.statusMessage), (response.headers['content-type']));
      })
      .pipe(fs.createWriteStream(filePath));
  }

//get the repo contributors api based on the name of the repo and the name of the owner of that repo
  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        Authorization: "token " + secrets.GITHUB_TOKEN
      },
      json: true
    };
//download the image to the avatars folder using the users login for the name
    request(options, function(err, res, body) {
      cb(err, body);
      if (body.message != 'Not Found') {
      body.forEach(function(item){
        avatarUrl = item.avatar_url;
//call downloadImageByURL function
        downloadImageByURL(avatarUrl, 'avatars/' + item.login + '.jpeg');
      });
      } else {
        border();
        console.log('ERROR: Check your repo or owner name');
        border();
      }
    });
  }
var border = function(){
  console.log('------------------------------------')
}

//call the function
  getRepoContributors(repoOwner, repoName, function() {});
// if information missing tell the user to add the repo owner and name
} else {
  console.log('Please define repo owner and name...')
}
