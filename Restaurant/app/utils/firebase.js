import firebase from 'firebase/app'


const firebaseConfig = {
   apiKey: "AIzaSyDlNmw7L7lKXTTS0NckFZPBxl5o7RUOeZc",
   authDomain: "prorest-a5df0.firebaseapp.com",
  projectId: "prorest-a5df0",
  storageBucket: "prorest-a5df0.appspot.com",
  messagingSenderId: "580172584503",
  appId: "1:580172584503:web:7985713d3a5d81b9e091b2"
  }

  export const firebaseapp = firebase.initializeApp(firebaseConfig)

