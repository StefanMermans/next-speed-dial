const CACHE_NAME = 'MANUAL_CACHE';

const CACHE_REGEX = /.+\.(png|js|svg|jpg|jpeg|css|ico|woff|woff2)$/i;
const NEXT_IMAGE_REGEX = /.*_next\/image\?url=.*\.((png)|(jpg)|(svg)|(ico)|(jpeg)).*$/i;
const NO_CACHE_REGEX = /(chrome-extension:\/\/)/i;

function cacheFetch(event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function (res) {
          return caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, res.clone()).catch((e) => {
              console.error(e, `URL: ${event.request.url}`);
            });

            return res;
          });
        });
      }
    })
  );
}

function shouldCache(url) {
  if (NO_CACHE_REGEX.test(url)) {
    return false;
  }

  return CACHE_REGEX.test(url) || NEXT_IMAGE_REGEX.test(url);
}

self.addEventListener('fetch', function (event) {
  if (shouldCache(event.request.url)) {
    cacheFetch(event);
  }
});
