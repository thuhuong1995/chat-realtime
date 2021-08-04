import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAo10vznXHm3OBONpkm-qEbjw-zGYy34M8",
    authDomain: "chap-app-e83ff.firebaseapp.com",
    projectId: "chap-app-e83ff",
    storageBucket: "chap-app-e83ff.appspot.com",
    messagingSenderId: "868315880482",
    appId: "1:868315880482:web:63074075800dc3eac4be7b",
    measurementId: "G-RNS6JDWR6K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');

if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
};

export { db, auth };

export default firebase;