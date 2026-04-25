import { isLoggedIn } from './auth'

export function setupNavbar() {
  const navbarMobileDropdown = document.getElementById('navbar-mobile-dropdown')
  const navbarDesktopMenu = document.getElementById('navbar-desktop-menu')
  const authAction = document.getElementById('auth-action')

  if (isLoggedIn()) {
    navbarMobileDropdown.classList.remove('hidden')
    navbarMobileDropdown.classList.add('block')
    authAction.innerHTML = `
      <button
        id="logout-button"
        class="btn btn-error gap-2 btn-xs md:btn-sm"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-log-out-icon lucide-log-out h-3 w-3"
        >
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>
        Logout
      </button>
    `
  } else {
    navbarMobileDropdown.classList.remove('block')
    navbarMobileDropdown.classList.add('hidden')
    navbarDesktopMenu.innerHTML = ''
    authAction.innerHTML = `
      <div class="flex gap-2">
        <a
          href="#/login"
          class="btn btn-outline gap-2 btn-xs md:btn-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-log-in-icon lucide-log-in h-3 w-3" aria-hidden="true">
            <path d="m10 17 5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          </svg>
          Login
        </a>
        <a
          href="#/register"
          class="btn btn-primary gap-2 btn-xs md:btn-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-user-round-plus-icon lucide-user-round-plus h-3 w-3" aria-hidden="true">
            <path d="M2 21a8 8 0 0 1 13.292-6" />
            <circle cx="10" cy="8" r="5" />
            <path d="M19 16v6" />
            <path d="M22 19h-6" />
          </svg>
          Register
        </a>
      </div>
    `
  }
}
