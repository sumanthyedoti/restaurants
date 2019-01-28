import React from 'react';
import { NavLink } from 'react-router-dom';

const RestaurantCard = (props) => {
  const { restaurant } = props;
  return (
    <div className="card col s12 m6 l4">
      <div className='card-image'>
        <img className='' src={restaurant.featured_image} alt='restaurant featured'/>
        <span className="btn-floating halfway-fab waves-effect waves-light white"><i className="material-icons favorite-icon" style={{'color': '#'+restaurant.user_rating.rating_color}}>favorite</i></span>
      </div>
      <div className='card-conten valign-wrapper'>
        <div>
          <NavLink to={'/restaurant/'+restaurant.id} id='restaurant-card-name' className='card-title red-text text-darken-4'>{restaurant.name}</NavLink>
          <p>{restaurant.location.locality_verbose}</p>
          <p>{restaurant.cuisines}</p>
        </div>
	    </div>
    </div>
  );
}
export default RestaurantCard;
