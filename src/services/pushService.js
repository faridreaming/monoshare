import { getToken } from '../utils/auth'

const API_URL = import.meta.env.VITE_API_URL

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function subscribePushNotification() {
  const registration = await navigator.serviceWorker.ready

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Izin notifikasi ditolak')
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  })

  const { endpoint, keys } = subscription.toJSON()

  const response = await fetch(`${API_URL}/notifications/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ endpoint, keys }),
  })

  return response.json()
}

export async function unsubscribePushNotification() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()
  if (!subscription) return

  const endpoint = subscription.endpoint
  await subscription.unsubscribe()

  const response = await fetch(`${API_URL}/notifications/subscribe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ endpoint }),
  })

  return response.json()
}

export async function isSubscribed() {
  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    return !!subscription
  } catch {
    return false
  }
}
