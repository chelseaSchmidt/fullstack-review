const axios = require('axios');
const config = require('../config.js');

//note API limits to 30 by default - might want to override
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