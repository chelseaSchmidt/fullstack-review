import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    <div id="list-container">
      <div id="list-header">
        <span className="repo-forks">Forks</span>
        <span className="repo-name">Repo Name</span>
        <span className="repo-owner">Username</span>
      </div>
        {props.repos.map(repo => {
          return <RepoListEntry data={repo} key={repo.GHid}/>;
        })}
    </div>
  </div>
)

export default RepoList;