import { getToken } from '../utils/auth'

const API_URL = import.meta.env.VITE_API_URL

export async function register({ name, email, password }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }

  const response = await fetch(`${API_URL}/register`, options)

  return response.json()
}

export async function login({ email, password }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }

  const response = await fetch(`${API_URL}/login`, options)

  return response.json()
}

export async function getStories({ location = 1, page, size } = {}) {
  const params = { location }
  if (page) params.page = page
  if (size) params.size = size

  const token = getToken()

  const queryString = new URLSearchParams(params).toString()

  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await fetch(`${API_URL}/stories?${queryString}`, options)

  return response.json()
}

export async function addStory({ description, photo, lat, lon }) {
  const formData = new FormData()
  formData.append('description', description)
  formData.append('photo', photo)
  formData.append('lat', lat)
  formData.append('lon', lon)

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  }

  const response = await fetch(`${API_URL}/stories`, options)

  return response.json()
}

export async function getStoryById(id) {
  const token = getToken()

  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await fetch(`${API_URL}/stories/${id}`, options)

  return response.json()
}
