// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDmx8gaJxT3EHQvLcBmp2XoYzDZqA9FbJs",
    authDomain: "data-1451f.firebaseapp.com",
    projectId: "data-1451f",
    storageBucket: "data-1451f.appspot.com",
    messagingSenderId: "708656887175",
    appId: "1:708656887175:web:f0297aeba44c2750db4f22",
    measurementId: "G-D0PDT7R4R1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
