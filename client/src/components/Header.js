import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <nav className='nav-wrapper transparent red lighten-1 z-depth-2'>
        <div className='container'> 
          <NavLink to="/" className='brand-logo lighten-1'>Zomato Mini</NavLink>
          {/* {props.mainHeader ? null :(
            <form id='header-form' className='hide-on-med-and-down'>
              <input id='header-search' className='white' type='search' placeholder='search for reastaurants or cuisines or location...'/>
              <input className='btn red darken-1' type='submit' />
          </form>
          )} */}
          <ul className="right col hide-on-small-only" id='header-nav'>
              <li><NavLink to='/home' >Home</NavLink></li>	
              <li><NavLink to='/bookings' activeStyle={{'backgroundColor': 'hsl(0,70%, 58%)'}}>My Bookings</NavLink></li>	
              <li><NavLink to='/profile' activeStyle={{'backgroundColor': 'hsl(0,70%, 58%)'}}>Profile</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
