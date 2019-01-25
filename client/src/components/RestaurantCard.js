import React from 'react';
const RestaurantCard = (props) => {
  const { restaurant } = props;
  return (
    <div className="card col s12 m6 l4">
      <div className='card-image'>
        <img className='responsive-img' src={props.restaurant.featured_image} alt='restaurant featured'/>
        <span className="btn-floating halfway-fab waves-effect waves-light white"><i className="material-icons favorite-icon" style={{'color': '#'+restaurant.user_rating.rating_color}}>favorite</i></span>
      </div>
      <div className='card-content valign-wrapper'>
        <div>
          <span className='card-title flow-text'>{props.restaurant.name}</span>
          <p>{props.restaurant.location.locality_verbose}</p>
          <p>{props.restaurant.cuisines}</p>
        </div>
	    </div>
    </div>
  );
}
export default RestaurantCard;
