import './style.css'
import { getRoute } from './core/routes'

const handleRouteChange = () => {
  getRoute().init()
}

handleRouteChange()
window.addEventListener('hashchange', handleRouteChange)
