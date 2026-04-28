import L from 'leaflet'
import MonoView from '../views/MonoView'
import { getMonos } from '../models/MonoModel'
import { delay } from '../utils/delay'

export default class MonoPresenter {
  async init() {
    MonoView.render()
    MonoView.showLoading()

    try {
      const data = await getMonos({ location: 1, page: 1, size: 9999 })

      if (data.error) {
        throw new Error(data.message)
      }

      const monos = data.listStory

      this.#initMap(monos)
      MonoView.renderList(monos)
    } catch (error) {
      MonoView.hideLoading()
      alert(error.message)
    }
  }

  #initMap(monos = []) {
    const monoMapEl = document.getElementById('mono-map')
    monoMapEl.innerHTML = ''
    const map = L.map(monoMapEl).setView([-6.2, 106.816], 11)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(map)

    monos.forEach((mono) => {
      L.marker([mono.lat, mono.lon]).addTo(map).bindPopup(mono.name)
    })
  }
}
