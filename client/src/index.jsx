import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      newReposImported: null,
      reposUpdated: null,
      wasUpdate: false
    }
  }

  search (term) {
    $.ajax({
      url: `/repos/${term}`,
      method: 'POST',
      success: newImportsOrMessage => {
        if (typeof newImportsOrMessage === 'string') {
          alert(newImportsOrMessage);
          this.getRepos(true, 0);
        } else {
          this.getRepos(true, newImportsOrMessage);
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  componentDidMount () {
    this.getRepos(false);
  }

  getRepos (wasUpdate, newImports = 0) {
    const origRepoIds = this.state.repos.map(repo => {
      return repo.GHid;
    });
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: repos => {
        const newRepoIds = repos.map(repo => {
          return repo.GHid;
        });
        let newUpdates = 0;
        newRepoIds.forEach(newRepoId => {
          if (origRepoIds.indexOf(newRepoId) === -1) {
            return ++newUpdates;
          }
        });
        this.setState({
          repos: repos,
          newReposImported: newImports,
          reposUpdated: newUpdates,
          wasUpdate: wasUpdate
        });
      },
      error: err => {
        console.error(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} newReposImported={this.state.newReposImported} reposUpdated={this.state.reposUpdated} wasUpdate={this.state.wasUpdate}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));