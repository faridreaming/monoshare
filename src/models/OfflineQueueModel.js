import {
  addToOfflineQueue,
  getOfflineQueue,
  deleteFromOfflineQueue,
} from '../utils/db'

export async function queueMono(item) {
  return addToOfflineQueue(item)
}

export async function getPendingQueue() {
  return getOfflineQueue()
}

export async function removePendingItem(id) {
  return deleteFromOfflineQueue(id)
}
