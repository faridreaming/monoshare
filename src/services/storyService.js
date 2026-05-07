import { getToken } from '../utils/auth'

const API_URL = import.meta.env.VITE_API_URL
const CACHE_NAME = 'monoshare-api-manual'
const CACHE_BASE = 'https://monoshare-cache.local/'

async function saveToCache(key, data) {
  if (!('caches' in window)) return
  const cache = await caches.open(CACHE_NAME)
  cache.put(
    `${CACHE_BASE}${key}`,
    new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    }),
  )
}

async function loadFromCache(key) {
  if (!('caches' in window)) return null
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(`${CACHE_BASE}${key}`)
  if (!cached) return null
  return cached.json()
}

export async function register({ name, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return response.json()
}

export async function login({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function getStories({ location = 1, page, size } = {}) {
  const params = { location }
  if (page) params.page = page
  if (size) params.size = size

  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/stories?${queryString}`
  const cacheKey = `stories-${queryString}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await response.json()

    if (!data.error) saveToCache(cacheKey, data)

    return data
  } catch {
    const cached = await loadFromCache(cacheKey)
    if (cached) return cached
    throw new Error('Tidak ada koneksi dan data offline tidak tersedia')
  }
}

export async function addStory({ description, photo, lat, lon }) {
  const formData = new FormData()
  formData.append('description', description)
  formData.append('photo', photo)
  formData.append('lat', lat)
  formData.append('lon', lon)

  const response = await fetch(`${API_URL}/stories`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  })
  return response.json()
}

export async function getStoryById(id) {
  const url = `${API_URL}/stories/${id}`
  const cacheKey = `story-${id}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await response.json()

    if (!data.error) saveToCache(cacheKey, data)

    return data
  } catch {
    const cached = await loadFromCache(cacheKey)
    if (cached) return cached
    throw new Error('Tidak ada koneksi dan data offline tidak tersedia')
  }
}
