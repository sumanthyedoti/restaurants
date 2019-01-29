import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

const styles = {
  paper: {
    position: 'absolute',
    width: '60%',
    backgroundColor: 'white',
    boxShadow: '4px 4px 4px 0 grey',
    padding: '20px',
    outline: 'none',
    top: '8%',
    left: '20%',
    borderRadius: '2px',
  },
};
const BookTable = (props) => {
  const {restaurant} = props;
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={styles.paper} id='book-table-modal row'>
        <div className='card horizontal col s10 valign-wrapper' id='modal-image-container'>
          <div className='card-image' id='restaurant-modal-img'>
            <img src={restaurant.thumb} alt='' className='responsive-img'/>
          </div>
          <div className='card-stacked col s10'>
            <div className='card-content' id='booking-card-content'>
            <h5 className='card-title'>{restaurant.name}</h5>
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
                <span className='restaurant-info '>{restaurant.location.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='divider'></div>
        <h5>Please select your booking details</h5>
        <form id='restuarant-modal-form' >
          <div className=" ">
          <label htmlFor="table-date">First Name</label>
            <input className='datepicker' id='table-date' name="table-date" type='date' min="2019-01-28" max="2019-02-27" required/>
          </div>
          <div className="">
          <label htmlFor="num-of-guests">Number of guests</label>
            <input className='validate' type="number" id='num-of-guests' name="num-of-guests" min="1" max="20" className='validate' required/>
          </div>
          <div className="">
            <label htmlFor="table-time">Select Time</label>
            <input type="time" className='validate' id='table-time' name="table-time" min="9:00" max="22:00" required/>
          </div>
        </form>
        <div className='card-action right '>
          <input 
            className='btn red lighten-1 right' 
            onClick={props.bookTableHandler}
            type='submit' 
            id='restaurant-form-button' 
            value='Book Table'
          />
        </div>
      </div>
    </Modal>
  );
}

BookTable.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  restaurant: PropTypes.object,
};


export default BookTable;