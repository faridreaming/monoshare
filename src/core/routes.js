import HomePresenter from '../presenters/HomePresenter'
import NotFoundPresenter from '../presenters/NotFoundPresenter'

const routes = {
  '/': new HomePresenter(),
  '/*': new NotFoundPresenter(),
}

export const getRoute = () => {
  const hash = location.hash.slice(1) || '/'

  if (routes[hash]) {
    return routes[hash]
  }

  return routes['/*']
}
