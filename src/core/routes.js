import AddMonoPresenter from '../presenters/AddMonoPresenter'
import HomePresenter from '../presenters/HomePresenter'
import LoginPresenter from '../presenters/LoginPresenter'
import MonoDetailPresenter from '../presenters/MonoDetailPresenter'
import MonoPresenter from '../presenters/MonoPresenter'
import NotFoundPresenter from '../presenters/NotFoundPresenter'
import RegisterPresenter from '../presenters/RegisterPresenter'
import { isLoggedIn } from '../utils/auth'

const routes = {
  '/': new HomePresenter(),
  '/monos': new MonoPresenter(),
  '/add': new AddMonoPresenter(),
  '/login': new LoginPresenter(),
  '/register': new RegisterPresenter(),
  '/*': new NotFoundPresenter(),
}

const routeTitles = {
  '/': 'Home - monoshare',
  '/monos': 'Jelajah Peta - monoshare',
  '/add': 'Tambah mono - monoshare',
  '/login': 'Login - monoshare',
  '/register': 'Register - monoshare',
  '/*': 'Halaman tidak ditemukan - monoshare',
}

export const getRoute = () => {
  const hash = location.hash.slice(1) || '/'
  const footer = document.querySelector('footer')

  const monoDetailMatch = hash.match(/^\/monos\/(.+)$/)
  if (monoDetailMatch) {
    const id = monoDetailMatch[1]
    if (!isLoggedIn()) {
      history.replaceState(null, '', '#/login')
      document.title = routeTitles['/login']
      return routes['/login']
    }
    footer.classList.remove('hidden')
    document.title = 'Detail mono - monoshare'
    return new MonoDetailPresenter(id)
  }

  const protectedRoutes = ['/', '/monos', '/add']
  const guestRoutes = ['/login', '/register']

  if (protectedRoutes.includes(hash)) {
    if (!isLoggedIn()) {
      footer.classList.remove('hidden')
      history.replaceState(null, '', '#/login')
      document.title = routeTitles['/login']
      return routes['/login']
    }
    footer.classList.toggle('hidden', hash === '/monos')
    document.title = routeTitles[hash]
    return routes[hash]
  }

  footer.classList.remove('hidden')

  if (guestRoutes.includes(hash)) {
    if (isLoggedIn()) {
      history.replaceState(null, '', '#/')
      document.title = routeTitles['/']
      return routes['/']
    }
    document.title = routeTitles[hash]
    return routes[hash]
  }

  document.title = routeTitles['/*']
  return routes['/*']
}
