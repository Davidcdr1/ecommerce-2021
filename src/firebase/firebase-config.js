import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const  firebaseConfig = {
    apiKey: "AIzaSyBRZqe6jzF-1ZawDcbOjvBIl8QxiofnF04",
    authDomain: "proyecto-ecommerce-2021.firebaseapp.com",
    projectId: "proyecto-ecommerce-2021",
    storageBucket: "proyecto-ecommerce-2021.appspot.com",
    messagingSenderId: "906367854445",
    appId: "1:906367854445:web:164bd159d74a5c5618dc64"
  };


firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()


export {
    db,
    googleAuthProvider,
    firebase,
    storage
}
