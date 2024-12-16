
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC0GmCvst4UaRxG9tWPAdqv5fzrCKOseRc",
  authDomain: "fir-e1dbc.firebaseapp.com",
  databaseURL: "https://fir-e1dbc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-e1dbc",
  storageBucket: "fir-e1dbc.firebasestorage.app",
  messagingSenderId: "1021458609444",
  appId: "1:1021458609444:web:7ccd2c060281b069c92fb1",
  measurementId: "G-8NQDK20PLM"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, push, set };