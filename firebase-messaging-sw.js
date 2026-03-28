importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAmk3IaUmNhaU7nAwcCr1nS2J0TUdTlzEk",
  projectId: "sasaffeg",
  messagingSenderId: "224441214532",
  appId: "1:224441214532:web:bc829f90f88af97b7cbe11"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/752/752326.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
