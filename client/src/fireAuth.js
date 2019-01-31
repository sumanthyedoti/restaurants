import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDbSm9vUhnjWxv2BDE1IY47LlbKtM8wMOU",
  authDomain: "restaurants-1b185.firebaseapp.com",
  databaseURL: "https://restaurants-1b185.firebaseio.com",
  projectId: "restaurants-1b185",
  storageBucket: "restaurants-1b185.appspot.com",
  messagingSenderId: "94240217804"
};
const fire = firebase.initializeApp(config);
export default fire; 