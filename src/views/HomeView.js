export default class HomeView {
  static render(monos = []) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="relative overflow-hidden min-h-[50dvh] flex items-center">
        <div id="map" class="absolute inset-0"></div>
        <div class="absolute inset-0 bg-base-300"></div>

        <div class="relative z-10 flex w-full flex-col items-center justify-center p-6 md:p-10 text-center">
          <h1 class="text-lg md:text-2xl">
            Temukan <em class="font-bold">mono</em> di sekitarmu<strong>.</strong>
          </h1>
          <a href="#/monos" class="btn mt-4 btn-primary btn-sm md:btn-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-map-icon lucide-map h-4 w-4" aria-hidden="true">
              <path
              d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
              <path d="M15 5.764v15" />
              <path d="M9 3.236v15" />
            </svg>
            Jelajah Peta
          </a>
        </div>
      </section>

      <section class="p-8 my-8">
        <div class="flex justify-between items-center">
          <h2 class="text-lg md:text-2xl">Daftar <em class="font-bold">mono</em></h2>
          <button class="btn gap-2 btn-primary btn-sm md:btn-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-plus-icon lucide-plus h-4 w-4" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Tambah <em>mono</em>
          </button>
        </div>
        ${
          monos.length === 0
            ? `
              <div role="alert" class="alert mt-8 p-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-info-icon lucide-info h-4.5 w-4.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>Belum ada <em class="font-bold">mono</em>. Tambahkan <em class="font-bold">mono</em> pertamamu.</span>
              </div>
            `
            : `
              <ul class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                ${monos
                  .map(
                    (mono) => `
                  <li class="card bg-base-300 w-full shadow-sm">
                    <div class="flex items-center gap-2 p-4">
                      <div class="avatar avatar-placeholder">
                        <div class="bg-neutral text-neutral-content w-12 rounded-full text-lg font-bold">
                          ${mono.name
                            .trim()
                            .split(/\s+/)
                            .map((word) => word[0])
                            .join('')
                            .toUpperCase()
                            .substring(0, 2)}
                        </div>
                      </div>
                      <div>
                        <h3 class="card-title">${mono.name}</h3>
                        <time datetime="${mono.createdAt}" class="text-xs">
                          ${new Date(mono.createdAt)
                            .toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })
                            .replace(' pukul ', ', ')
                            .replace(/\./g, ':')}
                        </time>
                      </div>
                    </div>
                    <figure>
                      <img
                        class="aspect-video object-cover w-full"
                        src="${mono.photoUrl}"
                        alt="Foto dari ${mono.name}: ${mono.description.substring(0, 50)}..."
                        loading="lazy" />
                    </figure>
                    <div class="card-body p-4 gap-4">
                      <span class="badge badge-outline badge-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="lucide lucide-map-pin-icon lucide-map-pin h-3 w-3" aria-hidden="true">
                          <path
                            d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        ${mono.lat}, ${mono.lon}
                      </span>
                      <p class="italic flex-1">${mono.description}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary btn-sm" aria-label="Selengkapnya tentang ${mono.name}">
                          Selengkapnya
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-arrow-right-icon lucide-arrow-right h-4 w-4" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                `,
                  )
                  .join('')}
                </ul>
            `
        }
        
      </section>
    `
  }
}
