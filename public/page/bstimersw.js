
var cacheName = 'dsblackstrawberrycache_v20171127-1';

var urlsToCache = ['/','/bstimer.html','/memo.css','/img/blackstrawberry.png','/img/del.png'];

self.addEventListener('install',function(event){
	event.waitUntil(
			caches.open(cacheName)
			.then(function(cache){
			console.log('sw.js will cache files');
			return cache.addAll(urlsToCache);
			})
		);	
});


self.addEventListener('activate', function(e) {
  console.log('handling activate event..');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

    return self.clients.claim();
});


self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request)
			.then(function(response){
				if(response){
				 console.log('responding from cache');
				 return response;
				}
				return fetch(event.request);
			  }
			)
	);
});