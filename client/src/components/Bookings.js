import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
class Bookings extends Component {
  constructor(){
    super();
    this.state = {
      bookings : [],
      restaurants: {},
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/bookings/', {
      headers: {
        "Content-Type": "application/json",
        "username": 'y_sumanth',
      }
    })
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          bookings: json.bookings.table,
        })
        json.bookings.table.forEach(booking => {
          fetch(`http://localhost:3000/api/restaurants/${booking.idRestaurant}`, {
            headers: {
              "Content-Type": "application/json",
              "username": 'y_sumanth',
            }
          })
            .then((res)=> res.json())
            .then((json) => {
              let restaurants = this.state.restaurants;
              restaurants[booking.idRestaurant] = json.restaurant
              this.setState({
                restaurants,
              })
            })
        });
      })
  }
  render() {
    const { bookings, restaurants } = this.state;
    let BookingsList = bookings.map( (booking) => {
      const dateTime = booking.time_and_date.split('&');
      return(
        <div className='' key={booking.idRestaurant}>
          <div className='card horizontal row' id='modal-image-container'>
            <div className='card-image col s10 m6 l12 valign-wrapper' id='restaurant-modal-img'>
              {restaurants[booking.idRestaurant] && <img src={restaurants[booking.idRestaurant].thumb} alt='' className='responsive-img'/>}
            </div>
            <div className='card-stacked col s10 m6 l12'>
              <div className='card-content' id='booking-card-content'>
                <h4 className='card-title'>
                {restaurants[booking.idRestaurant] && <NavLink to={'/restaurant/'+booking.idRestaurant} className='restaurant-name red-text text-darken-4'>{restaurants[booking.idRestaurant].name}</NavLink >}
                </h4>
                <h6 className='booking-info'><span>on</span> {dateTime[0]} <span>at</span> {dateTime[1]} <span>for</span> {booking.num_of_people} {booking.num_of_people===1 ? 'person' : 'people'}</h6>
                <div className='divider'></div>
                <div className='restaurant-details'>
                  <span className='restaurant-info-title grey-text text-darken-2'>CUISINES:</span>
                  {restaurants[booking.idRestaurant] && <span className='restaurant-info'>{restaurants[booking.idRestaurant].cuisines}</span>}
                </div>
                <div className='restaurant-details'>
                  <span className='restaurant-info-title grey-text text-darken-2'>COST FOR TWO:</span>
                  {restaurants[booking.idRestaurant] && <span className='restaurant-info '>&#8377;{restaurants[booking.idRestaurant].average_cost_for_two}</span>}
                </div>
                <div className='restaurant-details'>
                  <span className='restaurant-info-title grey-text text-darken-2'>ADDRESS:</span>
                  {restaurants[booking.idRestaurant] && <span className='restaurant-info '>{restaurants[booking.idRestaurant].location.address}</span> }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }); 
    return (
      <div className="main">
        <Header />
        <div className='container'>
          <h4 className='grey-text text-darken-1'>Tables Booked</h4>
          {bookings.length===0 ?
            (
            <>
            <div className='center section grey-text valign-wrapper' id='no-bookings-div'>
              <h1>There are no tables booked yet!!</h1>
            </div>
            </>
            )
            :
            (
              <div className=''>{BookingsList}</div>
            )
          }
        </div>
      </div>
    );
  }
}
export default Bookings;
