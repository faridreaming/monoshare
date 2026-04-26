import { isLoggedIn } from './auth'

export function setupNavbar() {
  const navbarMobileDropdown = document.getElementById('navbar-mobile-dropdown')
  const navbarDesktopMenu = document.getElementById('navbar-desktop-menu')
  const authAction = document.getElementById('auth-action')

  if (isLoggedIn()) {
    navbarMobileDropdown.classList.remove('hidden')
    navbarMobileDropdown.classList.add('block')
    navbarDesktopMenu.innerHTML = `
      <li>
        <a href="#/">
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
            class="lucide lucide-house-icon lucide-house h-4 w-4 opacity-70"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path
              d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            />
          </svg>
          Home</a
        >
      </li>
      <li>
        <a href="#/monos">
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
            class="lucide lucide-map-icon lucide-map h-4 w-4 opacity-70"
          >
            <path
              d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
            />
            <path d="M15 5.764v15" />
            <path d="M9 3.236v15" />
          </svg>
          Jelajah Peta</a
        >
      </li>
    `
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
          class="btn btn-ghost gap-2 btn-xs md:btn-sm"
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
