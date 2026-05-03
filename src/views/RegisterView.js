export default class RegisterView {
  static render(callback) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-full justify-center items-center">
        <div class="card bg-base-200 w-full max-w-sm card-border border-base-300">
          <div class="card-body gap-4">
            <h1 class="card-title">Register</h1>
            <form class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label for="name" class="label">Nama Lengkap</label>
                  <input id="name" type="text" class="input validator w-full"
                    placeholder="Masukkan nama lengkap Anda"
                    autocomplete="name"
                    aria-describedby="name-hint"
                    required />
                  <p id="name-hint" class="validator-hint hidden m-0">Nama lengkap wajib diisi</p>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="email" class="label">Email</label>
                  <input id="email" type="email" class="input validator w-full"
                    placeholder="nama@email.com"
                    autocomplete="email"
                    aria-describedby="email-hint"
                    required />
                  <p id="email-hint" class="validator-hint hidden m-0">Email wajib diisi</p>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="password" class="label">Password</label>
                  <input id="password" type="password" class="input validator w-full"
                    placeholder="Masukkan password baru"
                    autocomplete="new-password"
                    aria-describedby="password-hint"
                    required minlength="8" />
                  <p id="password-hint" class="validator-hint hidden m-0">Minimal 8 karakter</p>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="password-confirm" class="label">Konfirmasi Password</label>
                  <input id="password-confirm" type="password" class="input validator w-full"
                    placeholder="Masukkan konfirmasi password"
                    autocomplete="new-password"
                    aria-describedby="password-confirm-hint"
                    required minlength="8" />
                  <p id="password-confirm-hint" class="validator-hint hidden m-0">Minimal 8 karakter</p>
                </div>
                <button id="btn-submit" type="submit" class="btn btn-primary mt-2">Register</button>
              </form>
            <p class="mt-2">Sudah punya akun? <a href="#/login" class="link">Login di sini</a></p>
          </div>
        </div>
      </div>
    `

    const form = app.querySelector('form')
    const nameInput = form.querySelector('#name')
    const emailInput = form.querySelector('#email')
    const passwordInput = form.querySelector('#password')
    const passwordConfirmInput = form.querySelector('#password-confirm')

    form.addEventListener('submit', (event) => {
      event.preventDefault()

      const name = nameInput.value
      const email = emailInput.value
      const password = passwordInput.value

      const passwordConfirm = passwordConfirmInput.value
      const passwordConfirmValidatorEl = passwordConfirmInput.nextElementSibling
      const passwordConfirmErrorMsg = 'Konfirmasi password tidak cocok'

      if (password !== passwordConfirm) {
        passwordConfirmValidatorEl.textContent = passwordConfirmErrorMsg
        passwordConfirmInput.setCustomValidity(passwordConfirmErrorMsg)
        passwordConfirmInput.reportValidity()
        return
      }

      callback({ name, email, password })
    })

    passwordConfirmInput.addEventListener('input', () => {
      passwordConfirmInput.setCustomValidity('')
    })
  }

  static showSubmitLoading() {
    const btn = document.getElementById('btn-submit')
    btn.disabled = true
    btn.dataset.label = btn.textContent
    btn.innerHTML = '<span class="loading loading-spinner loading-sm"></span> Loading...'
  }

  static hideSubmitLoading() {
    const btn = document.getElementById('btn-submit')
    btn.disabled = false
    btn.textContent = btn.dataset.label
  }
}
