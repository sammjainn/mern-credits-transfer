import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Transfer extends Component {
  state = {
    username: 'Sent To',
    amount: '',
    users: [],
    error: false,
    redirect: false,
    errorMessage: ''
  };

  componentDidMount() {
    axios
      .get('/users')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => console.log('The error is', error));
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };
  onChangeAmount = (e) => {
    this.setState({
      amount: e.target.value
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const id = this.state.users.filter((user) => {
      return user.username === this.state.username;
    });

    const senderID = window.location.href.split('/');
    const sID = senderID[senderID.length - 1];

    const sender = this.state.users.filter((user) => {
      return user._id === sID;
    });
    if (sender[0].credits >= this.state.amount) {
      const transaction = {
        sentBy: sender[0].username,
        sentTo: this.state.username,
        credits: this.state.amount
      };

      axios
        .post('/transfer/' + sID + '/' + id[0]._id, transaction)
        .then((res) => console.log('success'))
        .catch((err) => console.log('error'));

      axios
        .put('/transfer/' + sID + '/' + id[0]._id, transaction)
        .then((res) => console.log('success'))
        .catch((err) => console.log('error'));

      if (sender[0].username == this.state.username)
        this.setState({ errorMessage: 'Sender and Receiver are same!' });

      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
    } else {
      this.setState({ error: true, errorMessage: 'Not enough credits!' });
    }
  };

  render() {
    if (!this.state.redirect) {
      return (
        <div>
          <h3>Create New Transaction</h3>

          {this.state.error ? (
            <div className='p-2' style={{ background: 'red', color: 'white' }}>
              {this.state.errorMessage}
            </div>
          ) : null}

          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Send To: </label>
              <select
                required
                className='form-control'
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                <option value='' hidden selected>
                  Choose a receiver
                </option>
                {this.state.users.map(function (user) {
                  return (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <label>Amount: </label>
              <input
                type='number'
                min={1}
                required
                className='form-control'
                value={this.state.amount}
                onChange={this.onChangeAmount}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Transfer money'
                className='btn btn-primary'
              />
            </div>
          </form>
        </div>
      );
    } else {
      return <Redirect to='/transactions' />;
    }
  }
}
