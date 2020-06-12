const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  let options = {
    url: `https://api.github.com`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(`https://api.github.com/users/${user}/repos`, options)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });

}

module.exports.getReposByUsername = getReposByUsername;