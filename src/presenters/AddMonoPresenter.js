import { addMono } from '../models/MonoModel'
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

    try {
      const data = await addMono({
        description,
        photo,
        lat,
        lon,
      })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      alert(data.message)
      location.hash = '#/'
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }
}
