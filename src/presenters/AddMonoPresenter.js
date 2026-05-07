import { addMono } from '../models/MonoModel'
import { queueMono } from '../models/OfflineQueueModel'
import { getUserLocation } from '../utils/geolocation'
import AddMonoView from '../views/AddMonoView'

export default class AddMonoPresenter {
  async init() {
    AddMonoView.render(this.#onSubmit)
    AddMonoView.setupPhoto()

    const coords = await getUserLocation([-6.2, 106.816])
    AddMonoView.initMap(coords)

    AddMonoView.setupCleanup()
  }

  #onSubmit = async ({ description, photo, lat, lon }) => {
    if (!photo) {
      alert('Foto wajib diisi!')
      return
    }

    AddMonoView.showSubmitLoading()

    try {
      if (!navigator.onLine) {
        await this.#saveOffline({ description, photo, lat, lon })
        return
      }

      const data = await addMono({ description, photo, lat, lon })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      alert(data.message)
      location.hash = '#/'
    } catch (error) {
      if (!navigator.onLine) {
        await this.#saveOffline({ description, photo, lat, lon })
      } else {
        alert(`Error: ${error.message}`)
      }
    } finally {
      AddMonoView.hideSubmitLoading()
    }
  }

  async #saveOffline({ description, photo, lat, lon }) {
    const photoBase64 = await this.#fileToBase64(photo)
    await queueMono({ description, photoBase64, lat, lon })
    alert(
      'Kamu sedang offline. Mono disimpan ke antrian dan akan di-sync saat online.',
    )
    location.hash = '#/saved'
  }

  #fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}
