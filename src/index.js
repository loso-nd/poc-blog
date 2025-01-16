import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQnq4zzBLEM54HCW25ONVzBB68xISWXSs",
  authDomain: "react-poc-blog-54b8f.firebaseapp.com",
  projectId: "react-poc-blog-54b8f",
  storageBucket: "react-poc-blog-54b8f.firebasestorage.app",
  messagingSenderId: "160274842160",
  appId: "1:160274842160:web:fde1d0eb8985fd67b0e3f5",
  measurementId: "G-MRY8J87VNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
