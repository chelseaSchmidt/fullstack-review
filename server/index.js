const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const mongo = require('../database/index.js');

let app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/:user', function (req, res) {
  github.getReposByUsername(req.params.user, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
    } else {
      const repos = [];
      data.forEach(repo => {
        const condensed = {};
        condensed.GHid = repo.id;
        condensed.name = repo.name;
        condensed.url = repo.html_url;
        condensed.forks = repo.forks;
        condensed.ownerId = repo.owner.id;
        condensed.ownerName = repo.owner.login;
        condensed.ownerUrl = repo.owner.html_url;
        repos.push(condensed);
      });
      mongo.save(repos, (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(503);
        } else {
          console.log('success');
          res.sendStatus(201);
        }
      });
    }
  });

});

app.get('/repos', function (req, res) {
  mongo.retrieve25((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

