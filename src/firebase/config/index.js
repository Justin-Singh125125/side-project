import firebase from "firebase";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDjBuchQNjkpqSSt-yASqw8SshRphjjquw",
    authDomain: "test-1be6d.firebaseapp.com",
    databaseURL: "https://test-1be6d.firebaseio.com",
    projectId: "test-1be6d",
    storageBucket: "",
    messagingSenderId: "504276206209",
    appId: "1:504276206209:web:f41cae0b5e631e7ae48380"

});

var db = firebase.firestore();




export { db };
export { firebase };