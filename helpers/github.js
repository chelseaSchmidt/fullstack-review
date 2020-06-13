const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  let options = {
    url: `https://api.github.com`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN || config.TOKEN}` //config var
    }
  };

  axios.get(`https://api.github.com/users/${user}/repos?page=1&per_page=100`, options)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });

}

module.exports.getReposByUsername = getReposByUsername;