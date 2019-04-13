import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDsgJ_-hqQmfUlAZBG9-n4eMQcCiBahkgk",
  authDomain: "book-me-test.firebaseapp.com",
  databaseURL: "https://book-me-test.firebaseio.com",
  projectId: "book-me-test",
  storageBucket: "book-me-test.appspot.com",
  messagingSenderId: "442306730256"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
