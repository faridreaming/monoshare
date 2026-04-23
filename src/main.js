import { getRoute } from './core/routes'
import 'leaflet/dist/leaflet.css'

const handleRouteChange = () => {
  getRoute().init()
}

handleRouteChange()
window.addEventListener('hashchange', handleRouteChange)
