import MonoView from '../views/MonoView'
import { getMonos } from '../models/MonoModel'
import { getUserLocation } from '../utils/geolocation'

export default class MonoPresenter {
  #monos = []

  async init() {
    MonoView.render()
    MonoView.showLoading()

    try {
      const data = await getMonos({ location: 1, page: 1, size: 9999 })

      if (data.error) {
        throw new Error(data.message)
      }

      this.#monos = data.listStory

      const coords = await getUserLocation([-6.2, 106.816])
      MonoView.initMap(coords, this.#monos)

      this.#filterByBounds()

      MonoView.onMapMoveEnd(() => {
        this.#filterByBounds()
      })
    } catch (error) {
      MonoView.hideLoading()
      alert(error.message)
    }
  }

  #filterByBounds() {
    const filteredMonos = MonoView.getVisibleMonos(this.#monos)
    MonoView.renderList(filteredMonos, (id) => MonoView.navigateToMarker(id))
  }
}
