const cacheName = 'ah-academy-v1';
const assets = [
  "./",
  "./index.html",
  "./AH.css",
  "./AH.js",
  "./logo.jpg"
];

// تثبيت التطبيق وتخزين الملفات
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق وجلب البيانات من الكاش
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});