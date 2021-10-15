import './App.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './pages/HomePage';
import './pages/LoginPage';
import './pages/ManageAccount';
import './pages/CreatePatientAccount';
import './pages/EditPatientAccount';
import './pages/DeletePatientAccount';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ManageAccount from './pages/ManageAccount';
import CreatePatientAccount from './pages/CreatePatientAccount';
import DeletePatientAccount from './pages/DeletePatientAccount';
import EditPatientAccount from './pages/EditPatientAccount';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={(props) => <LoginPage {...props} />} />
            <Route exact path='/home' render={(props) => <HomePage {...props} />} />
            <Route exact path='/create-account' render={(props) => <CreatePatientAccount {...props} />} />
            <Route exact path='/edit-account' render={(props) => <EditPatientAccount {...props} />} />
            <Route exact path='/delete-account' render={(props) => <DeletePatientAccount {...props} />} />

            <Route path='/manage-account' render={(props) => <ManageAccount {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;