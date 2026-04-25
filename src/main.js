import { getRoute } from './core/routes'
import { setupNavbar } from './utils/navbar'
import 'leaflet/dist/leaflet.css'

const handleRouteChange = () => {
  getRoute().init()
}

handleRouteChange()
window.addEventListener('hashchange', handleRouteChange)

document.addEventListener('DOMContentLoaded', () => {
  const details = document.querySelector('details.dropdown')
  const summary = details.querySelector('summary')

  details.addEventListener('toggle', () => {
    summary.setAttribute('aria-expanded', String(details.open))
  })

  details.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      details.open = false
    })
  })

  document.addEventListener('click', (e) => {
    if (!details.contains(e.target)) {
      details.open = false
    }
  })

  setupNavbar()
})
