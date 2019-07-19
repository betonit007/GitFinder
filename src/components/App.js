import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Users from '../components/Users';
import Search from './Search';
import Alert from '../components/Alert';
import About from '../components/pages/About';
import User from '../components/User';
import axios from 'axios';
import './App.css';

class App extends React.Component {

    state = {
        users: [],
        loading: false,
        alert: null,
        user: {},
        repos: []
    }
    
    async componentDidMount() {
      this.setState({ loading: true })
      
      const res = await axios.get(`https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID} & 
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      this.setState({ users: res.data, loading: false })
    }
   
    //Search GitHub users
    searchUsers = async text => {
      this.setState({ loading: true })
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
         &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: res.data.items, loading: false})
    }

    //Get single user
    getUser = async (username) => {

      this.setState({ loading: true })
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
         &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ user: res.data, loading: false})
      
    }
    getUserRepos = async (username) => {

      this.setState({ loading: true })
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
         &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ repos: res.data, loading: false})
      
    }

    clearUsers = () => {
      this.setState({ users: [], loading: false });
    }

    setAlert = (msg, type) => {
      this.setState({ alert: { msg, type } })

      setTimeout(() => this.setState({ alert: null }), 5000)
    };
    
    render() {
        const { loading, user, repos } = this.state;
      return (
        <Router>
            <div className='app'>
                <Navbar 
                  title="GitHub Finder"
                />
                <div className="container">
                  <Alert alert={this.state.alert} />
                  <Switch>
                    <Route exact path='/' render={props => (
                      <>
                    <Search 
                      searchUsers = {this.searchUsers}
                      clearUsers = {this.clearUsers}
                      showClear = {this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                      />
                      <Users
                        loading = {this.state.loading}
                        users = {this.state.users}
                        />
                      </>
                    )} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/user/:login' render={props => (
                      <User 
                        { ...props }
                        getUser={this.getUser}
                        getUserRepos={this.getUserRepos}
                        user = {user}
                        loading = {loading}
                        repos={repos}
                        />
                    )}
                      />
                  </Switch>
                </div>
            </div>
        </Router>
      )
    }
}

export default App;