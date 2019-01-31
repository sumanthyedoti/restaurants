import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import Home from './components/Home';
import Bookings from './components/Bookings';
import Profile from './components/Profile';
import Restaurant from './components/Restaurant';
import Header from './components/Header';
import fire from './fireAuth.js';

class App extends Component {
  state = {
    isSignedIn: false,
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      let username = ''; 
      if(!!user){
        username = user.email.substring(0, user.email.indexOf('@'));
        username = username.replace('.','_');
        localStorage.setItem('username', username);
        fetch(`http://localhost:3000/login/${username}`,{
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((res)=> res.json())
          .then((json) => {
            if(json.errorMessage){
              fetch(`http://localhost:3000/register`,{
                method: 'POST',
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "username": username,
                  "name": user.displayName,
                  "email": user.email
                }),
              })
              .then((res)=> res.json())
              .then((json) => {
                console.log(json)
              })
              .catch((err)=>{
                console.log('reg failed')
              });
            }
          })
          .catch((err)=>{
            console.error(err)
          });
      }
      
    })
  }
  render() {
    return (
      <>
      <BrowserRouter>
        <>
        <Header isSignedIn = {this.state.isSignedIn} />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/home' component={Home} exact />
          <Route path='/bookings' 
            render={
              () => {
                return (<Bookings isSignedIn={this.state.isSignedIn} />);
              }
            }
          />
          <Route path='/profile' 
            render={
              () => {
                return (<Profile isSignedIn={this.state.isSignedIn} />);
              }
            }
          />
          <Route path='/restaurant/:id' 
            render={
              (props) => {
                return (<Restaurant {...props} isSignedIn={this.state.isSignedIn} />);
              }
            }
            exact
          />
        </Switch>
        </>
      </BrowserRouter>
      </>
    );
  }
}
export default App;
