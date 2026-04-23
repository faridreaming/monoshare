export default class HomeView {
  static render(monos) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="relative overflow-hidden min-h-[50vh] flex items-center">
        <div id="map" class="absolute inset-0"></div>
        <div class="absolute inset-0 bg-white/5"></div>

        <div class="relative z-10 flex w-full flex-col items-center justify-center p-6 md:p-10 text-center">
          <h1 class="text-2xl">
            Temukan <em class="font-bold">mono</em> di sekitarmu<strong>.</strong>
          </h1>
          <a href="#/monos" class="btn mt-4 btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-map-icon lucide-map h-4 w-4">
              <path
              d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
              <path d="M15 5.764v15" />
              <path d="M9 3.236v15" />
            </svg>
            Jelajah Peta
          </a>
        </div>
      </section>

      <section class="p-8">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl">Daftar <em class="font-bold">mono</em></h2>
          <button class="btn gap-2 btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-plus-icon lucide-plus h-4 w-4">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Tambah <em>mono</em>
          </button>
        </div>
        <div role="alert" class="alert mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-info-icon lucide-info">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Belum ada mono.</span>
        </div>
      </section>
    `
  }
}
