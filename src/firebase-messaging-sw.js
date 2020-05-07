// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBWh4lRntilVk-XYablX8iv6TQ7swkXy5s",
  authDomain: "github-ae841.firebaseapp.com",
  databaseURL: "https://github-ae841.firebaseio.com",
  projectId: "github-ae841",
  storageBucket: "github-ae841.appspot.com",
  messagingSenderId: "390667823333",
  appId: "1:390667823333:web:2d1fff9afa969b7d044c0c",
  measurementId: "G-WFKYCXHV4S"
});

const messaging = firebase.messaging();
