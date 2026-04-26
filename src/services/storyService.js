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
