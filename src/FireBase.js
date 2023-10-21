import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCsBEE9DLamLw95Qk_pDITi6SqxKAdEINU",
    authDomain: "flipkart-fa2ad.firebaseapp.com",
    databaseURL: "https://flipkart-fa2ad-default-rtdb.firebaseio.com",
    projectId: "flipkart-fa2ad",
    storageBucket: "flipkart-fa2ad.appspot.com",
    messagingSenderId: "215275056827",
    appId: "1:215275056827:web:e18c2ebf9097263271c39e"
};
const app = initializeApp(firebaseConfig);
export  const db=getFirestore(app);