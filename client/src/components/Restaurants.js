import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
class Restaurants extends Component {
  render(){
    const { restaurants } = this.props
    let RestaurantsList = restaurants.map( (restaurant) => {
      return (
        <RestaurantCard 
          key= {restaurant.id} 
          restaurant = {restaurant}
        />
      );
    }); 
    return (
      <div className="restaurants container restaurants-conatiner row">
        { RestaurantsList }
      </div>
    );
  }
}
export default Restaurants;
