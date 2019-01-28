import React, { Component } from 'react';
import HeaderMain from './HeaderMain';
import Restaurants from './Restaurants';
class Home extends Component {
  constructor(){
    super();
    this.state = {
      restaurants : [],
      searchReasult: [],
    }
  }
  searchHandler=(e)=>{
    e.preventDefault();
    const searchField = document.getElementById('search-form').elements[0];
    if(searchField.value.length===0){
      this.setState({
        searchReasult: this.state.restaurants,
      });
    }else if(e.type==='keyup'){
      return false;
    }
    if(searchField.value.length>1){
      fetch(`http://localhost:3000/api/restaurants/search/${searchField.value}`)
      .then((res)=> res.json())
      .then((json) => {
        console.log(json.restaurants)
        if(json.restaurants.length===0) {
          window.Materialize.toast(`No results for '${searchField.value}'`, 2000);
          return false;
        }
        this.setState({
          searchReasult: json.restaurants,
        });
      })
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/restaurants/')
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          restaurants: json.restaurants,
          searchReasult: json.restaurants,
        })
      })
  }
  render() {
    return (
      <div className="main">
        <HeaderMain 
          searchHandler = { this.searchHandler }
        />
        <Restaurants restaurants = {this.state.searchReasult} />
      </div>
    );
  }
}
export default Home;
