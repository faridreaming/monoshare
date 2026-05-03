import { login, register } from '../services/storyService'
import { setToken } from '../utils/auth'

export async function loginUser({ email, password }) {
  const data = await login({ email, password })

  if (!data.error) {
    setToken(data.loginResult.token)
  }

  return data
}

export async function registerUser({ name, email, password }) {
  return register({ name, email, password })
}
