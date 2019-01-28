import React from 'react';
import Header from './Header';

const HeaderMain = (props) => {
  const { searchHandler } = props;
  return (
    <>
    <Header mainHeader= {true}/>
    <div className='main-header-bg'> </div>
    <div className='logo-container'>
      <img className='center logo' src='images/logo.svg' alt='logo'/>
      <h4 className='white-text text-darken-4'>Find the best restaurants, cafés, and bars</h4>
      <div className='container'>
        <form className='row header-form' id='search-form'>
          <div className='col s11 m7 push-m2 input-filed'>
            <input 
              className='white search-ip' 
              id="search-ip" type='text' 
              placeholder='search for reastaurants or cuisines or location...'
              onKeyUp = {searchHandler}/>
          </div>
          <div className='col s11 m2 push-m2 input-field'>
            <input type='submit' className='btn red darken-2' onClick = {searchHandler} />
          </div>
        </form>
      </div>
    </div> 
    </>
  );
}


export default HeaderMain;
