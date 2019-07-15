import React from 'react';
import Navbar from '../components/Navbar';
import Users from '../components/Users';
import axios from 'axios';
import './App.css';

class App extends React.Component {

    state = {
        users: [],
        loading: false
    }
    
    async componentDidMount() {
    this.setState({ loading: true })

    const res = await axios.get('https://api.github.com/users');

    this.setState({ users: res.data, loading: false })
    }
    
    render() {
      return (
          <div className='app'>
              <Navbar 
                title="GitHub Finder"
              />
              <div className="container">
                <Users
                loading = {this.state.loading}
                users = {this.state.users}
                />
              </div>
          </div>
      )
    }
}

export default App;