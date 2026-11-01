const C='rendicontazione-v2-date-fix';
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(C).then(cache=>cache.addAll(['./','./index.html','./manifest.webmanifest'])))});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==C).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(C).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request)))});
