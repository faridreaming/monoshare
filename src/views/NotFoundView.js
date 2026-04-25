export default class NotFoundView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="flex flex-col items-center justify-center h-full gap-4 p-8">
        <h1 class="text-4xl font-bold">404</h1>
        <p>Halaman tidak ditemukan.</p>
        <a href="#/" class="btn btn-primary btn-sm">Kembali ke Home</a>
      </section>
    `
  }
}
