import React from 'react';
import { NavLink } from 'react-router-dom';

const RestaurantCard = (props) => {
  const { restaurant } = props;
  return (
    <NavLink to={'/restaurant/'+restaurant.id} >
      <div className="card col s12 m6 l4">
        <div className='card-image'>
          <img className='' src={restaurant.featured_image} alt='restaurant featured'/>
        </div>
        <div className='card-content black-text' id='card-info'>
          <span className="badge white-text" id='card-rating' style={{'backgroundColor': '#'+restaurant.user_rating.rating_color, 'marginTop':'10px'}}>{ restaurant.user_rating.aggregate_rating}</span>
          <h4 id='restaurant-card-name' className='card-title red-text text-darken-4'>{restaurant.name}</h4>
            <span>{restaurant.location.locality_verbose}</span>
            <p className='divider'></p>
            <span>{restaurant.cuisines}</span>
        </div>
      </div>
    </NavLink>
  );
}
export default RestaurantCard;
