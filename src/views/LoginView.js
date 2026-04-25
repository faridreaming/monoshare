export default class LoginView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-full justify-center items-center">
        <div class="card bg-base-200 w-full max-w-sm card-border border-base-300">
          <div class="card-body">
            <h1 class="card-title">Login</h1>
            <form class="flex flex-col gap-2">
              <div class="flex flex-col gap-2">
                <label for="email" class="label">Email</label>
                <input id="email" type="email" class="input validator" placeholder="nama@email.com" required />
                <p class="validator-hint hidden">Email wajib diisi</p>
              </div>
              <div class="flex flex-col gap-2">
                <label for="password" class="label">Password</label>
                <input id="password" type="password" class="input validator" placeholder="Masukkan password" required minlength="8" />
                <p class="validator-hint hidden">Minimal 8 karakter</p>
              </div>
              <button type="submit" class="btn btn-primary mt-4">Login</button>
            </form>
            <p class="mt-4">Belum punya akun? <a href="#/register" class="link">Register</a></p>
          </div>
        </div>
      </div>
    `
  }
}
