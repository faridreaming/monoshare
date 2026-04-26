import RegisterView from '../views/RegisterView'

export default class RegisterPresenter {
  init() {
    RegisterView.render(this.onSubmit)
  }

  onSubmit = ({ name, email, password }) => {
    console.log({ name, email, password })
  }
}
