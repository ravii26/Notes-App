importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCbT7DV58OrCbFbxFpYnCY2CPpTfNChm1w",
  authDomain: "notes-app-bba20.firebaseapp.com",
  projectId: "notes-app-bba20",
  storageBucket: "notes-app-bba20.firebasestorage.app",
  messagingSenderId: "379380850976",
  appId: "1:379380850976:web:e826fd421cd1c0693d7745",
  measurementId: "G-W8YX9P8YVL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  // Customize your notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Replace with your own icon path
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
