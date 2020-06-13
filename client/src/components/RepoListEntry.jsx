import React from 'react';

const RepoListEntry = (props) => (
    <div className="repo">
      <span className="repo-forks">{props.data.forks}</span>
      <span className="repo-name"><a href={props.data.url}>{props.data.name}</a></span>
      <span className="repo-owner">{props.data.ownerName}</span>
    </div>
);

export default RepoListEntry;