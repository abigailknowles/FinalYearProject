import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Neighbourhoods from './pages/Neighbourhoods';
import StreetCrimes from './pages/StreetCrimes';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/about' render={(props) => <About {...props} />} />
          <Route exact path='/street-crimes' render={(props) => <StreetCrimes {...props} />} />
          <Route exact path='/neighbourhoods' render={(props) => <Neighbourhoods {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;