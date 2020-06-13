const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/fetcher'); //config var

let repoSchema = mongoose.Schema({
  GHid: Number,
  name: String,
  url: String,
  forks: Number,
  ownerId: Number,
  ownerName: String,
  ownerUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  const newRepos = [];
  const existPromises = [];
  const newRecordPromises = [];

  repos.forEach(repo => {
    existPromises.push(Repo.findOne({GHid: repo.GHid}));
  });

  Promise.all(existPromises)
    .then(existsArray => {
      existsArray.forEach((exists, i) => {
        if (!exists) {
          newRepos.push(repos[i]);
        }
      });
      Repo.create(newRepos)
        .then(res => {
          callback(null, res);
        })
        .catch(err => {
          console.log(err);
          callback(err);
        });
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
}

const retrieve25 = (callback) => {
  Repo.find({}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      results.sort((repoA, repoB) => {
        if (repoA.forks > repoB.forks) {
          return -1;
        }
        if (repoA.forks < repoB.forks) {
          return 1;
        } else {
          return 0;
        }
      });
      const filtered25 = results.slice(0, 25);
      callback(null, filtered25);
    }
  });
};

module.exports.save = save;
module.exports.retrieve25 = retrieve25;