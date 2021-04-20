import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CheckOutComponent from './checkout'
import CardSetUpComponent from './card-setup'
import SaveCardCheckOutComponent from './saved-card-checkout'
import SubscriptionComponent from './subscription'
const App = () => {
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={CheckOutComponent} />
          <Route exact path='/set-up' component={CardSetUpComponent} />
          <Route exact path='/saved-card' component={SaveCardCheckOutComponent} />
          <Route exact path='/subscription' component={SubscriptionComponent} />
        </Switch>
      </Router>
    </>
  );
};
export default App