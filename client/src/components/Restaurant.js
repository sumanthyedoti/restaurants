import React, { Component } from 'react';
import BookTable from './BookTable';

class RestaurantCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      restaurant : {
        location: {},
        user_rating: {},
      },
      open: false,
    }
  }
  handleOpen = () => {
    if(!this.props.isSignedIn){
      window.Materialize.toast('Please login!', 1000);
      return false;
    }
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount(){
    const { id } = this.props.match.params;
    fetch(`http://localhost:3000/api/restaurants/${id}`)
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          restaurant: json.restaurant,
        })
      })
  }
  componentDidUpdate(){
    if(this.state.open){
      var time = new Date();
      console.log("actual time:", time);
      time.setHours(time.getHours() + 1)
      time = time.getHours()+":"+time.getMinutes();
      var date = new Date().toJSON().slice(0,10);
      console.log(date);
      const bookingForm = document.getElementById('restuarant-modal-form');
      if(bookingForm){
        bookingForm.elements['table-date'].value = date;
        bookingForm.elements['num-of-guests'].value = 1;
        bookingForm.elements['table-time'].value = time;
      }
    }
  }
  bookTableHandler=(e)=>{
    const formData = document.getElementById('restuarant-modal-form');
    const tableDate = formData.elements['table-date'].value;
    const numOfGuests = formData.elements['num-of-guests'].value;
    const tableTime = formData.elements['table-time'].value;
    if(tableDate==='' || tableTime ==='' || numOfGuests===null||numOfGuests===''){
      window.Materialize.toast('Fill all the fileds correctly!', 2000);
      return false;
    } else if (numOfGuests > 20 || numOfGuests <1){
      window.Materialize.toast('Maximum of 20 people!', 2000);
      return false;
    }
    fetch(`http://localhost:3000/api/bookings`, {
      method: 'POST',
      mode: "cors", 
      headers: {
          "Content-Type": "application/json",
          "username": localStorage.getItem('username'),
      },
      body: JSON.stringify({
        "idRestaurant": this.state.restaurant.id,
        "time_and_date": `${tableDate}&${tableTime}`,
        "num_of_people": numOfGuests
      })
    })
      .then((res) =>{
        console.log(res);
        this.setState((state)=>({
          open: !state.open
        }));
        window.Materialize.toast('Booked the table successfully!', 4000);
      })
      .catch((err) => {
        console.err(err);
        window.Materialize.toast('Fill all the fileds correctly!', 4000);
      });
    formData.elements['table-date'].value='';
    formData.elements['num-of-guests'].value='';
    formData.elements['table-time'].value='';
  }
  render(){
    const { restaurant } = this.state;
    return (
      <>
      <div className='container'>
        <div className='card'>
          <div className='card-image' id='restaurant-image'>
            <img src={restaurant.featured_image} alt='' className='responsive-img' />
            <span className="btn-flat white-text" id='restaurant-rating' style={{'backgroundColor': '#'+restaurant.user_rating.rating_color}}>{ restaurant.user_rating.aggregate_rating}</span>
          </div>
          <div className='card-content' id='restaurants-body'>
            <h4 id='restaurant-title'>{restaurant.name}</h4>
            <p className='grey-text card-title text-darken-2'>{restaurant.location.locality_verbose}</p>
            <div className='divider'></div>
            <div className='restaurant-details-div'>
              <div className='restaurant-details'>
                <span className='restaurant-info-title grey-text text-darken-2'>CUISINES:</span>
                <span className='restaurant-info'>{restaurant.cuisines}</span>
              </div>
              <div className='restaurant-details'>
                <span className='restaurant-info-title grey-text text-darken-2'>COST FOR TWO:</span>
                <span className='restaurant-info '>&#8377;{restaurant.average_cost_for_two}</span>
              </div>
              <div className='restaurant-details'>
                <span className='restaurant-info-title grey-text text-darken-2'>ADDRESS:</span>
                <span className='restaurant-info'>{restaurant.location.address}</span>
              </div>
            </div>
            <div className='restaurant-action card-action'>
              <div className='restaurant-action-div'>
                <a href={restaurant.menu_url} target="_blank"><button className='btn red lighten-1'>View Menu</button></a>
                <a href='#book-table'><button onClick={this.handleOpen} className='btn red lighten-1'>Book Table</button></a>
              </div>
              <BookTable 
                restaurant = {restaurant} 
                open = {this.state.open}
                handleClose = {this.handleClose}
                handleOpen = {this.handleOpen}  
                bookTableHandler = {this.bookTableHandler}
              />
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default RestaurantCard;
