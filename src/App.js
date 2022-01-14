import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import About from './pages/About';
import StopAndSearch from './pages/StopAndSearch';
import Neighbourhoods from './pages/Neighbourhoods';
import StreetCrimes from './pages/StreetCrimes';
import CrimeOutcomes from './pages/CrimeOutcomes';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <HomePage {...props} />} />
          <Route exact path='/about' render={(props) => <About {...props} />} />
          <Route exact path='/street-crimes' render={(props) => <StreetCrimes {...props} />} />
          <Route exact path='/stop-and-search' render={(props) => <StopAndSearch {...props} />} />
          <Route exact path='/neighbourhoods' render={(props) => <Neighbourhoods {...props} />} />
          <Route exact path='/crime-outcomes' render={(props) => <CrimeOutcomes {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;