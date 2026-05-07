self.addEventListener('push', (event) => {
  let data = {}

  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = {
      title: 'monoshare',
      options: { body: event.data?.text() ?? 'Ada mono baru!' },
    }
  }

  const title = data.title || 'monoshare'
  const options = {
    body: data.options?.body || 'Ada mono baru!',
    icon: data.options?.icon || '/favicon.svg',
    badge: data.options?.badge || '/favicon.svg',
    data: data.options?.data || {},
    tag: 'monoshare-push',
    renotify: true,
    actions: [
      {
        action: 'view',
        title: 'Lihat mono',
      },
      {
        action: 'dismiss',
        title: 'Tutup',
      },
    ],
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

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
        if (self.clients.openWindow) {
          return self.clients.openWindow(url)
        }
      }),
  )
})
