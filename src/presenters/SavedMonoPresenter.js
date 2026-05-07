import { getAllSavedMonos, removeSavedMono } from '../models/SavedMonoModel'
import { getPendingQueue, removePendingItem } from '../models/OfflineQueueModel'
import { addMono } from '../models/MonoModel'
import SavedMonoView from '../views/SavedMonoView'

export default class SavedMonoPresenter {
  #allMonos = []
  #searchQuery = ''
  #sortOrder = 'newest'

  async init() {
    SavedMonoView.render()
    SavedMonoView.showLoading()
    await this.#loadAll()
    this.#setupControls()
  }

  async #loadAll() {
    this.#allMonos = await getAllSavedMonos()
    this.#renderFiltered()

    const queue = await getPendingQueue()
    SavedMonoView.renderOfflineQueueBanner(queue, () => this.#syncQueue())
  }

  #renderFiltered() {
    let result = [...this.#allMonos]

    if (this.#searchQuery) {
      const q = this.#searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q),
      )
    }

    switch (this.#sortOrder) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-za':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    SavedMonoView.renderList(result, (id) => this.#onDelete(id))
  }

  #setupControls() {
    const searchInput = document.getElementById('search-input')
    const searchBtn = document.getElementById('search-btn')
    const sortSelect = document.getElementById('sort-select')

    const doSearch = () => {
      this.#searchQuery = searchInput.value.trim()
      this.#renderFiltered()
    }

    searchBtn.addEventListener('click', doSearch)
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch()
    })
    searchInput.addEventListener('input', () => {
      if (searchInput.value === '') {
        this.#searchQuery = ''
        this.#renderFiltered()
      }
    })

    sortSelect.addEventListener('change', () => {
      this.#sortOrder = sortSelect.value
      this.#renderFiltered()
    })
  }

  async #onDelete(id) {
    const confirmed = confirm('Hapus mono ini dari tersimpan?')
    if (!confirmed) return

    await removeSavedMono(id)
    this.#allMonos = this.#allMonos.filter((m) => m.id !== id)
    this.#renderFiltered()
  }

  async #syncQueue() {
    SavedMonoView.showSyncLoading()

    const queue = await getPendingQueue()
    let successCount = 0
    let failCount = 0

    for (const item of queue) {
      try {
        const photoBlob = await fetch(item.photoBase64).then((r) => r.blob())
        const photoFile = new File([photoBlob], 'offline.jpg', {
          type: 'image/jpeg',
        })

        const result = await addMono({
          description: item.description,
          photo: photoFile,
          lat: item.lat,
          lon: item.lon,
        })

        if (!result.error) {
          await removePendingItem(item.id)
          successCount++
        } else {
          failCount++
        }
      } catch {
        failCount++
      }
    }

    const msg =
      failCount === 0
        ? `${successCount} mono berhasil di-sync!`
        : `${successCount} berhasil, ${failCount} gagal.`

    alert(msg)
    await this.#loadAll()
  }
}
