import {
  subscribePushNotification,
  unsubscribePushNotification,
  isSubscribed,
} from '../services/pushService'

export async function subscribe() {
  return subscribePushNotification()
}

export async function unsubscribe() {
  return unsubscribePushNotification()
}

export async function getSubscriptionStatus() {
  return isSubscribed()
}
