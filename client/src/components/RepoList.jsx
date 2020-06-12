import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    {props.repos.map(repo => {
      return <RepoListEntry data={repo} key={repo.GHid}/>;
    })}
  </div>
)

export default RepoList;