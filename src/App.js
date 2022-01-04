import './App.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './pages/HomePage';

import HomePage from './pages/HomePage';
import About from './pages/About';
import Interaction from './pages/Interaction';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={(props) => <HomePage {...props} />} />
            <Route exact path='/about' render={(props) => <About {...props} />} />
            <Route exact path='/interaction' render={(props) => <Interaction {...props} />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;