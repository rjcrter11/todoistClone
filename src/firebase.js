import * as firebase from 'firebase/firebase'
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCK3u82Y5Dd6nRPN83ao4_18mesWluh2P4",
    authDomain: "todoist-clone-37b8b.firebaseapp.com",
    databaseURL: "https://todoist-clone-37b8b.firebaseio.com",
    projectId: "todoist-clone-37b8b",
    storageBucket: "todoist-clone-37b8b.appspot.com",
    messagingSenderId: "725550446406",
    appId: "1:725550446406:web:21c606b076863cb69ed747"
});

export { firebaseConfig as firebase };