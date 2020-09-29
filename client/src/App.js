import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar';
import UsersList from './components/users-list';
import TransactionsList from './components/transactions-list';
import Transfer from './components/create-transfer';
import HomePage from './components/homepage';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className='container'>
        <Route exact path='/' component={HomePage} />
        <Route path='/users-list' component={UsersList} />
        <Route path='/transactions-log' component={TransactionsList} />
        <Route path='/transfer' component={Transfer} />
      </div>
    </Router>
  );
}

export default App;
