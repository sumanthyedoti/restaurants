import React, { Component } from 'react';
import HeaderMain from './HeaderMain';
import Restaurants from './Restaurants';
class Home extends Component {
  render() {
    return (
      <div className="main">
        <HeaderMain />
        <Restaurants />
      </div>
    );
  }
}
export default Home;
