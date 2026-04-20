import HomePresenter from '../presenters/HomePresenter'
import MonoPresenter from '../presenters/MonoPresenter'
import NotFoundPresenter from '../presenters/NotFoundPresenter'

const routes = {
  '/': new HomePresenter(),
  '/*': new NotFoundPresenter(),
  '/monos': new MonoPresenter(),
}

export const getRoute = () => {
  const hash = location.hash.slice(1) || '/'

  if (routes[hash]) {
    return routes[hash]
  }

  return routes['/*']
}
