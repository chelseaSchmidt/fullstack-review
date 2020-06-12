const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
  const createRecords = Repo.create(repos);
  createRecords.then(res => {
    callback(null, res);
  });
  createRecords.catch(err => {
    callback(err);
  });
}

module.exports.save = save;