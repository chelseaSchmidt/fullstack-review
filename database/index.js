const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//schema drawing:
// [
//   {
//     repo id: number,
//     repo name: string,
//     repo url: string,
//     forks: number,
//     owner id: number,
//     owner name: string,
//     owner url: string
//   }
// ]

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
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //store promise from creating each repo object as a document via Repo model
  const createRecords = Repo.create(repos);
  //then, pass null and non-error result to callback
  createRecords.then(res => {
    callback(null, res);
  });
  //or catch error and pass to callback
  createRecords.catch(err => {
    callback(err);
  });
}

module.exports.save = save;