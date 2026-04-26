export default class LoginView {
  static render(callback) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-full justify-center items-center">
        <div class="card bg-base-200 w-full max-w-sm card-border border-base-300">
          <div class="card-body gap-4">
            <h1 class="card-title">Login</h1>
            <form class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="email" class="label">Email</label>
                <input id="email" type="email" class="input validator w-full" placeholder="nama@email.com" required />
                <p class="validator-hint hidden m-0">Email wajib diisi</p>
              </div>
              <div class="flex flex-col gap-2">
                <label for="password" class="label">Password</label>
                <input id="password" type="password" class="input validator w-full" placeholder="Masukkan password" required minlength="8" />
                <p class="validator-hint hidden m-0">Minimal 8 karakter</p>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Login</button>
            </form>
            <p class="mt-2">Belum punya akun? <a href="#/register" class="link">Register di sini</a></p>
          </div>
        </div>
      </div>
    `

    const form = app.querySelector('form')
    const emailInput = form.querySelector('#email')
    const passwordInput = form.querySelector('#password')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const email = emailInput.value
      const password = passwordInput.value
      callback({ email, password })
    })
  }
}
