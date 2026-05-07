import { clientsClaim, skipWaiting } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  }),
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30 }),
    ],
  }),
)

registerRoute(
  ({ url }) => url.origin.includes('basemaps.cartocdn.com'),
  new CacheFirst({
    cacheName: 'map-tiles',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 500 }),
    ],
  }),
)

registerRoute(
  ({ url }) =>
    url.origin === 'https://story-api.dicoding.dev' &&
    url.pathname.includes('/images/'),
  new CacheFirst({
    cacheName: 'monoshare-api-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100 }),
    ],
  }),
)

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'dismiss') return

  const id = event.notification.data?.id
  const url = id ? `/#/monos/${id}` : '/'

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus()
            return client.navigate(url)
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(url)
      }),
  )
})
