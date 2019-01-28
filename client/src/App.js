import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link, Redirect, Prompt } from 'react-router-dom';
import Home from './components/Home';
import Bookings from './components/Bookings';
import Profile from './components/Profile';
import Restaurant from './components/Restaurant';
class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/home' component={Home} exact/>
          <Route path='/bookings' component={Bookings} />
          <Route path='/profile' component={Profile} />
          <Route path='/restaurant/:id' component={Restaurant} exact /> 
        </Switch>
      </BrowserRouter>
      </>
    );
  }
}
export default App;
