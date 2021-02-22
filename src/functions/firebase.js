const firebase = require('firebase')

const firebaseConnect = () => {

let firebaseConfig = {
    apiKey: "AIzaSyD5t1_GtRFzdgQYWnwSndr8ZbO2ZjOHF-g",
    authDomain: "leighton-9d7b0.firebaseapp.com",
    databaseURL: "https://leighton-9d7b0-default-rtdb.firebaseio.com/",
    projectId: "leighton-9d7b0",
    storageBucket: "leighton-9d7b0.appspot.com",
    messagingSenderId: "683558569847",
    appId: "1:683558569847:web:41a589e0dd8d504e72c372",
    measurementId: "G-NGTC21V2CE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

}
module.exports = firebaseConnect