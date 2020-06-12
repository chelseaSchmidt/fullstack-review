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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;