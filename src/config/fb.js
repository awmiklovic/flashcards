import firebase from 'firebase';
import 'firebase/firestore';

//Initialize Firebase

const config = {
  apiKey: "AIzaSyBe0pZZv3YvFDMrshb85Z5FH6wLXFnD-08",
  authDomain: "blog-tut-6f80c.firebaseapp.com",
  databaseURL: "https://blog-tut-6f80c.firebaseio.com",
  projectId: "blog-tut-6f80c",
  storageBucket: "blog-tut-6f80c.appspot.com",
  messagingSenderId: "1025942005914"
};

if (!firebase.apps.length) {
   firebase.initializeApp(config);
}

const db = firebase.firestore();

export default firebase;
