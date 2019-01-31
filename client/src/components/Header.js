import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false
  }
}

const Header = (props) => {
  const {isSignedIn} = props;
  return (
    <header>
      <nav className='nav-wrapper transparent red lighten-1 z-depth-2'>
        <div className='container'> 
          <NavLink to="/" className='brand-logo lighten-1'>Zomato Mini</NavLink>
          <ul className="right col hide-on-small-only" id='header-nav'>
            <li><NavLink to='/home' >Home</NavLink></li>	
            {isSignedIn ? 
            (<li><NavLink to='/Bookings' activeStyle={{'backgroundColor': 'hsl(0,70%, 58%)'}}>Bookings</NavLink></li>)
            :
            null
            }
            {isSignedIn ? 
            (<li><NavLink to='/profile' activeStyle={{'backgroundColor': 'hsl(0,70%, 58%)'}}>Profile</NavLink></li>)
            :
            (<li><StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            /></li>)
            }
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
