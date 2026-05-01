import { getRoute } from './core/routes'
import { setupNavbar } from './utils/navbar'
import 'leaflet/dist/leaflet.css'

const handleRouteChange = () => {
  if (!document.startViewTransition) {
    const app = document.getElementById('app')
    app.style.animation = 'view-leave 0.15s ease forwards'

    setTimeout(() => {
      getRoute().init()
      setupNavbar()
      app.style.animation = 'view-enter 0.15s ease forwards'
    }, 150)

    return
  }

  document.startViewTransition(() => {
    getRoute().init()
    setupNavbar()
  })
}

handleRouteChange()
window.addEventListener('hashchange', handleRouteChange)

document.addEventListener('DOMContentLoaded', () => {
  const details = document.querySelector('details.dropdown')
  const summary = details.querySelector('summary')

  details.addEventListener('toggle', () => {
    summary.setAttribute('aria-expanded', String(details.open))
    summary.setAttribute(
      'aria-label',
      details.open ? 'Tutup menu' : 'Buka menu',
    )
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
