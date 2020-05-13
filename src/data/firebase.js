import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyB0OFykM3-93fx0KeYfrpYqqgppI8sYcX4",
    authDomain: "todo-list-eb1c9.firebaseapp.com",
    databaseURL: "https://todo-list-eb1c9.firebaseio.com",
    projectId: "todo-list-eb1c9",
    storageBucket: "todo-list-eb1c9.appspot.com",
    messagingSenderId: "770002277132",
    appId: "1:770002277132:web:f3c577462b1687a2daef29"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
