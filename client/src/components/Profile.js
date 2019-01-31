import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';

import dp from '../images/dp.png';
const styles = {
  profileSection:{
    marginTop: '40px',
  }
}
class Profile extends Component {
  constructor(){
    super();
    this.state = {
      profile: {},
    }
  }
  componentDidMount(){
    let username = localStorage.getItem('username');
    fetch(`http://localhost:3000/login/${username}`, {
      headers: {
        "Content-Type": "application/json",
        "username": username,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          profile: json.user,
        })
        const profileForm = document.getElementById('profile-form');
        profileForm.elements['name'].value = json.user.name;
        profileForm.elements['name'].focus();
        profileForm.elements['email'].value = json.user.email;
        profileForm.elements['email'].focus();
        profileForm.elements['email'].disabled = true;
        if(json.user.address){
          profileForm.elements['address'].value = json.user.address;
          profileForm.elements['address'].focus();
        }
        if(json.user.phoneNumber){
          profileForm.elements['phone'].value = json.user.phoneNumber;
          profileForm.elements['phone'].focus();
        }
      })
      .catch((err) => {
        console.error('error');
      })
  }
  submitHandler=(e)=>{
    e.preventDefault();
    const profileForm = document.getElementById('profile-form');
    const email = profileForm.elements['email'].value.trim();
    const phone = profileForm.elements['phone'].value.trim();
    const address = profileForm.elements['address'].value.trim();
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = re.test(email);
    if(!isEmail){
      window.Materialize.toast('Not a valid email!', 4000);
      return false;
    }else if(isNaN(Number(phone))){
      window.Materialize.toast('Invalid Phone Number!', 4000);
      return false;
    } else if(phone!=='' && phone.length !==10){
      window.Materialize.toast('Mobile number should be 10 digits long!', 4000);
      return false;
    } else if(address!=='' && address.length<10){
      window.Materialize.toast('Address should be atleast 10 letters long!', 4000);
      return false;
    }
    const profileObj = {
     name: profileForm.elements['name'].value,
     email: profileForm.elements['email'].value,
     phoneNumber: profileForm.elements['phone'].value,
     address: profileForm.elements['address'].value,
    }
    fetch(`http://localhost:3000/api/user/update`, {
      method: 'PUT',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "username": localStorage.getItem('username'),
      },
      body: JSON.stringify(profileObj),
    })
    .then((res) => {
      let profile = this.state.profile;
      profile.name = profileObj.name;
      console.log(profile)
      this.setState({profile});
      window.Materialize.toast('Updated user data successfully!', 2000);
    })
    .catch((err)=> {
      window.Materialize.toast(`Failed to update user data!`, 2000);
    })
  }
  phoneHandler(e){
    const ph = e.target.value.trim();
    const latLetter = ph.substring(ph.length-1);
    if(isNaN(parseInt(latLetter))){
      e.target.value = ph.substring(0, ph.length-1);
    }
  }
  logoutHandler(){
    firebase.auth().signOut();
    localStorage.removeItem('username');
  }
  render() {
    const {isSignedIn} = this.props; 
    return (
      <div className="main">
        {!isSignedIn ?
        (<Redirect to='/home'/>)
        :
        null
        }
        <div className='container section' style={styles.profileSection}>
          <div className='row'>
            <div className='col s10 m4 profile-picture'>
             <div className='profile-display'>
              <img className='' src={dp} id='dp' alt='profile' />
              <h4 className='center red-text text-lighten-1'>{this.state.profile.name}</h4>
              <button onClick={this.logoutHandler} className='btn red darken-2 logout-btn'>Logout<i class="material-icons right">logout</i></button>
             </div>
            </div>
            <div className='col s12 m8 profile-info'>
              <form id='profile-form'>
                <div className="input-field">
                  <i className="fas fa-signature prefix grey-text text-darken-1"></i>
                  <input type="text" className="validate" id="name" required/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix grey-text text-darken-1">email</i>
                  <input type="email" className="" id="email" required/>
                  <label htmlFor="email" >Email</label>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix grey-text text-darken-1">phone</i>
                  <input type="tel" className="validate" id="phone" onKeyUp={this.phoneHandler}/>
                  <label htmlFor="phone">Mobile Number</label>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix grey-text text-darken-1">place</i>
                  <textarea id="address" className="materialize-textarea"></textarea>
                  <label htmlFor="address">Address</label>
                </div>
                <div className="input-field center">
                  <input 
                    type='submit' 
                    value='SUBMIT' 
                    className='btn red lighten-1' 
                    onClick = {this.submitHandler}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
