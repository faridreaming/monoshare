import { registerUser } from '../models/AuthModel'
import RegisterView from '../views/RegisterView'

export default class RegisterPresenter {
  init() {
    RegisterView.render(this.onSubmit)
  }

  onSubmit = async ({ name, email, password }) => {
    try {
      const data = await registerUser({ name, email, password })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      alert(data.message)

      location.hash = '#/login'
    } catch (error) {
      alert(`Error fetching data: ${error}`)
    }
  }
}
