import { loginUser } from '../models/AuthModel'
import LoginView from '../views/LoginView'

export default class LoginPresenter {
  init() {
    LoginView.render(this.onSubmit)
  }

  onSubmit = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      alert(data.message)

      location.hash = '#/'
    } catch (error) {
      alert(`Error fetching data: ${error}`)
    }
  }
}
