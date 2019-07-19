import React, { Component } from 'react'
import PropTypes from 'prop-types';
  


class search extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onChange = ({target}) => {
      this.setState({ [target.name]: target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter something', 'light');
        }else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }
  
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input onChange={this.onChange} type='text' value={this.state.text} name='text' placeholder='Search Users..' />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {this.props.showClear ? 
                <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear Users</button> : ''}
            </div>
        )
    }
}

export default search;
