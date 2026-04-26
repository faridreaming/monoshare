import { login } from '../services/storyService'
import { setToken } from '../utils/auth'
import LoginView from '../views/LoginView'

export default class LoginPresenter {
  init() {
    LoginView.render(this.onSubmit)
  }

  onSubmit = async ({ email, password }) => {
    try {
      const data = await login({ email, password })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      alert(data.message)

      setToken(data.loginResult.token)

      location.hash = '#/'
    } catch (error) {
      alert(`Error fetching data: ${error}`)
    }
  }
}
