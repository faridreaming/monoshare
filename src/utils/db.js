import { openDB } from 'idb'

const DB_NAME = 'monoshare-db'
const DB_VERSION = 1

const getDB = () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('saved-monos')) {
        db.createObjectStore('saved-monos', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('offline-queue')) {
        const store = db.createObjectStore('offline-queue', {
          keyPath: 'id',
          autoIncrement: true,
        })
        store.createIndex('status', 'status')
      }
    },
  })

export async function getSavedMonos() {
  const db = await getDB()
  return db.getAll('saved-monos')
}

export async function saveMono(mono) {
  const db = await getDB()
  return db.put('saved-monos', mono)
}

export async function deleteSavedMono(id) {
  const db = await getDB()
  return db.delete('saved-monos', id)
}

export async function isMonoSaved(id) {
  const db = await getDB()
  const mono = await db.get('saved-monos', id)
  return !!mono
}

export async function addToOfflineQueue(item) {
  const db = await getDB()
  return db.add('offline-queue', {
    ...item,
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
}

export async function getOfflineQueue() {
  const db = await getDB()
  return db.getAllFromIndex('offline-queue', 'status', 'pending')
}

export async function deleteFromOfflineQueue(id) {
  const db = await getDB()
  return db.delete('offline-queue', id)
}
