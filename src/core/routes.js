import HomePresenter from '../presenters/HomePresenter'
import LoginPresenter from '../presenters/LoginPresenter'
import MonoPresenter from '../presenters/MonoPresenter'
import NotFoundPresenter from '../presenters/NotFoundPresenter'
import RegisterPresenter from '../presenters/RegisterPresenter'
import { isLoggedIn } from '../utils/auth'

const routes = {
  '/': new HomePresenter(),
  '/*': new NotFoundPresenter(),
  '/monos': new MonoPresenter(),
  '/login': new LoginPresenter(),
  '/register': new RegisterPresenter(),
}

export const getRoute = () => {
  const hash = location.hash.slice(1) || '/'

  const protectedRoutes = ['/', '/monos']
  const guestRoutes = ['/login', '/register']

  if (protectedRoutes.includes(hash)) {
    if (!isLoggedIn()) {
      history.replaceState(null, '', '#/login')
      return routes['/login']
    }
    return routes[hash]
  }

  if (guestRoutes.includes(hash)) {
    if (isLoggedIn()) {
      history.replaceState(null, '', '#/')
      return routes['/']
    }
    return routes[hash]
  }

  return routes['/*']
}
