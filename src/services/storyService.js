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
