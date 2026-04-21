export default class HomeView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="relative overflow-hidden min-h-[50vh] flex items-center">
        <div id="map" class="absolute inset-0"></div>
        <div class="absolute inset-0 bg-white/5"></div>

        <div class="relative z-10 flex w-full flex-col items-center justify-center p-6 md:p-10 text-center">
          <p>
            Temukan <em class="font-bold">mono</em> di sekitarmu<strong>.</strong>
          </p>
          <a href="#/monos" class="btn mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-map-icon lucide-map h-4 w-4">
              <path
              d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
              <path d="M15 5.764v15" />
              <path d="M9 3.236v15" />
            </svg>
            Jelajahi Peta
          </a>
        </div>
      </section>
    `
  }
}
