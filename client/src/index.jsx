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
        $.ajax({
          url: '/repos',
          method: 'GET',
          success: data => {
            console.log(data);
            this.setState({
              repos: data
            });
          },
          error: err => {
            console.error(err);
          }
        });
      },
      error: err => {
        console.error(err);
      }
    });
  }

  componentDidMount () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: data => {
        console.log(data);
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
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));