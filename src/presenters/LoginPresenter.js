import LoginView from '../views/LoginView'

export default class LoginPresenter {
  init() {
    LoginView.render(this.onSubmit.bind(this))
  }

  onSubmit(event) {
    event.preventDefault()
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    console.log({ email, password })
  }
}
