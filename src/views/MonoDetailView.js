export default class MonoDetailView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-full items-center justify-center">
        <span class="loading loading-spinner loading-xl" role="status" aria-label="Loading..."></span>
      </div>
    `
  }

  static renderDetail(mono) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="max-w-2xl mx-auto p-8 flex flex-col gap-6">
        <a href="#/" class="btn btn-ghost btn-sm self-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="h-4 w-4" aria-hidden="true">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Kembali
        </a>
        <div class="card bg-base-200 card-border border-base-300">
          <figure>
            <img src="${mono.photoUrl}" alt="Foto mono dari ${mono.name}" class="w-full object-cover max-h-96" />
          </figure>
          <div class="card-body gap-4">
            <div class="flex items-center gap-3">
              <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-12 rounded-full text-lg font-bold">
                  ${mono.name
                    .trim()
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2)}
                </div>
              </div>
              <div>
                <h1 class="card-title">${mono.name}</h1>
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
            <p>${mono.description}</p>
            <span class="badge badge-outline badge-sm h-fit">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-3 w-3" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              ${mono.lat}, ${mono.lon}
            </span>
          </div>
        </div>
      </section>
    `
  }

  static renderError(message) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="flex flex-col items-center justify-center h-full gap-4 p-8">
        <p>${message}</p>
        <a href="#/" class="btn btn-primary btn-sm">Kembali ke Home</a>
      </section>
    `
  }
}
