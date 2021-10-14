import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerManagement from '../pages/CustomerManagement';

import HomePage from '../pages/HomePage';


const Main = (props) => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' />
      {/* <Route exact path='/' component={() => (<HomePage account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/customer-management' component={() => (<CustomerManagement account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/customer-account/:id' component={() => (<CustomerAccount account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/audit-trail' component={() => (<AuditTrail account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/audit-trail/:id' component={() => (<AuditTrailUsers account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/goodwill' component={() => (<Goodwill account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/customer-account/:id/points-management' component={() => (<PointsManagement account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/customer-account/:id/recent-transactions' component={() => (<RecentTransactions account={props.account} onSignOut={props.onSignOut} />)} />
      <Route exact path='/not-found-page' component={() => (<NotFound account={props.account} onSignOut={props.onSignOut} />)} /> */}

    </Switch>
  );
}

export default Main;