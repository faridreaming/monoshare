import LoginView from '../views/LoginView'

export default class LoginPresenter {
  init() {
    LoginView.render(this.onSubmit)
  }

  onSubmit = ({ email, password }) => {
    console.log({ email, password })
  }
}
