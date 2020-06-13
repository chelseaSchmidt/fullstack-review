import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    $.ajax({
      url: `/repos/${term}`,
      method: 'POST',
      success: data => {
        this.getRepos();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  componentDidMount () {
    this.getRepos();
  }

  getRepos () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: data => {
        this.setState({
          repos: data
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
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));