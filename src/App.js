import './App.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './pages/HomePage';

import HomePage from './pages/HomePage';
import Rect from './pages/Rect';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={(props) => <HomePage {...props} />} />
            <Route exact path='/rect' render={(props) => <Rect {...props} />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;