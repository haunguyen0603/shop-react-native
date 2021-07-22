// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import { config } from "yargs";
var firebaseConfig = {
apiKey: "AIzaSyASv0cycADjl-2eYrhovmR1iXIRGOBi-c8",
authDomain: "myshop-93998.firebaseapp.com",
projectId: "myshop-93998",
storageBucket: "myshop-93998.appspot.com",
messagingSenderId: "93783327011",
appId: "1:93783327011:web:688139134a3ae9ce594c96",
measurementId: "G-BWEHDHQ16S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const fireBaseApp = firebase.initializeApp(config);