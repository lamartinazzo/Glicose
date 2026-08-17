const VERSION="glicose-v19",CACHE=VERSION,ASSETS=["./","./index.html","./manifest.webmanifest","./sw.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("glicose-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.pathname.endsWith("/")||u.pathname.endsWith("/index.html"))e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{caches.open(CACHE).then(c=>c.put("./index.html",r.clone()));return r}).catch(()=>caches.match("./index.html")));else e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting()});
