import React, { Component } from 'react';
import HeaderMain from './HeaderMain';
import Restaurants from './Restaurants';
import {fetchRestaurantsAction, searchRestaurantsAction, nullSearchAction} from '../store/actions/restaurantActions';
import {connect} from 'react-redux';

class Home extends Component {
  searchHandler=(e)=>{
    // e.preventDefault();
    const searchField = document.getElementById('search-form').elements[0];
    if(searchField.value.length===0){
        this.props.nullSearch();
    }
    if(searchField.value.length > 1){
      this.props.searchRestaurants(searchField.value)
      .then((data)=>{
        if(data.restaurants.length===0){
          window.Materialize.toast(`No results for '${searchField.value}'`, 2000);
          return false;
        }
      })
      .catch(err => console.log('error in search'));
    }
  }
  componentDidMount(){
    this.props.fetchRestaurants();
  }
  render() {
    const restaurants = this.props.searchReasult
    return (
      <div className="main">
        <HeaderMain 
          searchHandler = { this.searchHandler }
          isSignedIn = { this.props.isSignedIn}
        />
        <Restaurants restaurants = {restaurants} />
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    restaurants: state.reducedRestaurants.restaurants,
    searchReasult: state.reducedRestaurants.searchReasult,
  }
}
const mapActionsToProps=({
  fetchRestaurants: fetchRestaurantsAction,
  searchRestaurants: searchRestaurantsAction,
  nullSearch: nullSearchAction,
  
})
export default connect(mapStateToProps, mapActionsToProps)(Home);
