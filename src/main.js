import { getRoute } from './core/routes'
import { setupNavbar } from './utils/navbar'
import 'leaflet/dist/leaflet.css'
import { registerServiceWorker } from './utils/serviceWorker'

const setupSkipLink = () => {
  const skipLink = document.getElementById('skip-to-content')
  if (!skipLink) return

  const handleSkip = (event) => {
    event.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  skipLink.removeEventListener('click', handleSkip)
  skipLink.addEventListener('click', handleSkip)

  skipLink.removeEventListener('keydown', handleSkipOnKey)
  skipLink.addEventListener('keydown', handleSkipOnKey)
}

const handleSkipOnKey = (event) => {
  if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
    event.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const handleRouteChange = () => {
  scrollTo({ top: 0, behavior: 'instant' })

  if (!document.startViewTransition) {
    const app = document.getElementById('app')
    app.style.animation = 'view-leave 0.15s ease forwards'

    setTimeout(async () => {
      await getRoute().init()
      setupNavbar()
      setupSkipLink()
      app.style.animation = 'view-enter 0.15s ease forwards'
    }, 150)

    return
  }

  document.startViewTransition(async () => {
    await getRoute().init()
    setupNavbar()
    setupSkipLink()
  })
}

handleRouteChange()
window.addEventListener('hashchange', handleRouteChange)

document.addEventListener('DOMContentLoaded', () => {
  await registerServiceWorker()
  
  const details = document.querySelector('details.dropdown')
  if (details) {
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

    document.addEventListener('click', (event) => {
      if (!details.contains(event.target)) {
        details.open = false
      }
    })
  }

  setupNavbar()
})
