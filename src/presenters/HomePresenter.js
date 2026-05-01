import L from 'leaflet'
import { getMonos } from '../models/MonoModel'
import HomeView from '../views/HomeView'
export default class HomePresenter {
  #map = null

  async init() {
    HomeView.render()
    HomeView.showLoading()
    this.#initMap()

    try {
      const data = await getMonos({ location: 1, page: 1 })

      if (data.error) {
        throw new Error(data.message)
      }

      const monos = data.listStory
      HomeView.renderList(monos)
    } catch (error) {
      HomeView.hideLoading()
      alert(error.message)
    }
  }

  #initMap() {
    const mapEl = document.getElementById('map')
    this.#map = L.map(mapEl, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
    }).setView([-6.2, 106.816], 11)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    ).addTo(this.#map)
  }
}
