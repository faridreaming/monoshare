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
  const footer = document.querySelector('footer')

  const protectedRoutes = ['/', '/monos']
  const guestRoutes = ['/login', '/register']

  if (protectedRoutes.includes(hash)) {
    if (!isLoggedIn()) {
      footer.classList.remove('hidden')
      history.replaceState(null, '', '#/login')
      return routes['/login']
    }
    footer.classList.toggle('hidden', hash === '/monos')
    return routes[hash]
  }

  footer.classList.remove('hidden')

  if (guestRoutes.includes(hash)) {
    if (isLoggedIn()) {
      history.replaceState(null, '', '#/')
      return routes['/']
    }
    return routes[hash]
  }

  return routes['/*']
}
