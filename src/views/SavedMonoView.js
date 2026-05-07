export default class SavedMonoView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <section class="p-8 my-8" aria-labelledby="saved-mono-heading">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <h1 id="saved-mono-heading" class="text-lg md:text-2xl">
            <em class="font-bold">mono</em> Tersimpan
          </h1>
          <div class="flex gap-2 items-center flex-wrap">
            <div class="join">
              <label for="search-input" class="sr-only">Cari mono tersimpan</label>
              <input
                id="search-input"
                type="search"
                class="input input-bordered join-item input-sm"
                placeholder="Cari nama / deskripsi..."
              />
              <button id="search-btn" class="btn btn-sm join-item btn-primary" aria-label="Cari">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </button>
            </div>
            <label for="sort-select" class="sr-only">Urutkan mono</label>
            <select id="sort-select" class="select select-sm select-bordered">
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="name-az">Nama A–Z</option>
              <option value="name-za">Nama Z–A</option>
            </select>
          </div>
        </div>

        <div id="offline-queue-banner" class="hidden mt-4"></div>

        <div id="saved-mono-list" class="mt-8"></div>
      </section>
    `
  }

  static showLoading() {
    document.getElementById('saved-mono-list').innerHTML = `
      <div class="flex items-center justify-center py-20">
        <span class="loading loading-spinner loading-xl" role="status" aria-label="Loading..."></span>
      </div>
    `
  }

  static renderList(monos = [], onDelete) {
    const listEl = document.getElementById('saved-mono-list')

    if (monos.length === 0) {
      listEl.innerHTML = `
        <div role="alert" class="alert p-10 alert-vertical md:alert-horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="h-4.5 w-4.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
          <span>Belum ada <em class="font-bold">mono</em> yang disimpan.</span>
        </div>
      `
      return
    }

    listEl.innerHTML = `
      <ul class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        ${monos
          .map(
            (mono) => `
          <li class="card bg-base-300 w-full shadow-sm">
            <div class="flex items-center gap-2 p-4">
              <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-12 rounded-full text-lg font-bold" aria-hidden="true">
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
                <h2 class="card-title">${mono.name}</h2>
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
                alt="Foto mono dari ${mono.name}"
                loading="lazy" />
            </figure>
            <div class="card-body p-4 gap-4">
              <span class="badge badge-outline badge-sm h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="h-3 w-3" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span class="sr-only">Lokasi: </span>${mono.lat}, ${mono.lon}
              </span>
              <p class="italic flex-1">${mono.description?.length > 100 ? `${mono.description.substring(0, 100)}...` : mono.description}</p>
              <div class="card-actions justify-between">
                <a href="#/monos/${mono.id}" class="btn btn-primary btn-sm" aria-label="Selengkapnya tentang mono dari ${mono.name}">
                  Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </a>
                <button
                  class="btn btn-error btn-sm btn-delete"
                  data-id="${mono.id}"
                  aria-label="Hapus mono dari ${mono.name} dari tersimpan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4" aria-hidden="true">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          </li>
        `,
          )
          .join('')}
      </ul>
    `

    listEl.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.addEventListener('click', () => onDelete(btn.dataset.id))
    })
  }

  static renderOfflineQueueBanner(items = [], onSync) {
    const banner = document.getElementById('offline-queue-banner')

    if (items.length === 0) {
      banner.classList.add('hidden')
      banner.innerHTML = ''
      return
    }

    banner.classList.remove('hidden')
    banner.innerHTML = `
      <div role="alert" class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="h-5 w-5" aria-hidden="true">
          <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
        </svg>
        <div>
          <p class="font-semibold">Ada ${items.length} mono belum ter-sync</p>
          <p class="text-sm">Mono ini dibuat saat offline dan belum dikirim ke server.</p>
        </div>
        <button id="btn-sync" class="btn btn-sm btn-warning">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="h-4 w-4" aria-hidden="true">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
          Sync Sekarang
        </button>
      </div>
    `

    document.getElementById('btn-sync').addEventListener('click', onSync)
  }

  static showSyncLoading() {
    const btn = document.getElementById('btn-sync')
    if (!btn) return
    btn.disabled = true
    btn.innerHTML =
      '<span class="loading loading-spinner loading-xs"></span> Sync...'
  }
}