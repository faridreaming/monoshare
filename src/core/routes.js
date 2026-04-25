import HomePresenter from '../presenters/HomePresenter'
import LoginPresenter from '../presenters/LoginPresenter'
import MonoPresenter from '../presenters/MonoPresenter'
import NotFoundPresenter from '../presenters/NotFoundPresenter'
import RegisterPresenter from '../presenters/RegisterPresenter'

const routes = {
  '/': new HomePresenter(),
  '/*': new NotFoundPresenter(),
  '/monos': new MonoPresenter(),
  '/login': new LoginPresenter(),
  '/register': new RegisterPresenter(),
}

export const getRoute = () => {
  const hash = location.hash.slice(1) || '/'

  if (routes[hash]) {
    return routes[hash]
  }

  return routes['/*']
}
