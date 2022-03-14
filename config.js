// Import the functions you need from the SDKs you need
import firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG8wdm-uFRglkEQBO84kq_vq6saNXbsC0",
  authDomain: "online-voting-app-b9ba2.firebaseapp.com",
  projectId: "online-voting-app-b9ba2",
  storageBucket: "online-voting-app-b9ba2.appspot.com",
  messagingSenderId: "9506927097",
  appId: "1:9506927097:web:0c8aad102c0645eef60d28"
};

// Initialize Firebase
if(!firebase.apps.length)
 firebase.initializeApp(firebaseConfig);

export default firebase.firestore()