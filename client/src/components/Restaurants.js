import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
class Restaurants extends Component {
  constructor(){
    super();
    this.state = {
      restaurants : [],
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/restaurants/')
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          restaurants: json.restaurants,
        })
      })
  }
  render() {
    const { restaurants } = this.state;
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
