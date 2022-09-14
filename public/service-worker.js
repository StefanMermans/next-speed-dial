const CACHE_NAME = 'MANUAL_CACHE';

const CACHE_REGEX = /.+\.(png|js|svg|jpg|jpeg|css|ico)$/i;
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
    }),
  );
}

self.addEventListener('fetch', function (event) {
  if (
    CACHE_REGEX.test(event.request.url) &&
    !NO_CACHE_REGEX.test(event.request.url)
  ) {
    console.debug('CACHING: ', event.request.url);
    cacheFetch(event);
  } else {
    console.debug('NO-CACHE: ', event.request.url);
  }
});
