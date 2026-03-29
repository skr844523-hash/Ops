const CACHE_NAME = 'secret-notes-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// حفظ ملفات الواجهة للعمل بدون إنترنت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// --- إعدادات إشعارات Firebase في الخلفية ---
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBHleS3vqpik1BzJ3dal2L245dsrlo9lx0",
    projectId: "mons-eb73c",
    messagingSenderId: "1054828640380",
    appId: "1:1054828640380:web:6a3e4e5d208adc4894b1f9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'إشعار جديد';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك رسالة في المنطقة الآمنة',
    icon: 'https://cdn-icons-png.flaticon.com/512/564/564445.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
