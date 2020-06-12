import React from 'react';

const RepoListEntry = (props) => (
    <div className="repo-entry">
      <span className="repo-forks">{props.data.forks}</span>
      <span className="repo-name">{props.data.name}</span>
      <span className="repo-owner">{props.data.ownerName}</span>
    </div>
);

export default RepoListEntry;