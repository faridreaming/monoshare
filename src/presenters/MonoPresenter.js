import L from 'leaflet'
import MonoView from '../views/MonoView'
import getMonos from '../models/MonoMockModel'

export default class MonoPresenter {
  init() {
    MonoView.render()
    this.#initMap()
  }

  #initMap() {
    const map = L.map('mono-map').setView([-6.2, 106.816], 11)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(map)

    L.marker([-6.2, 106.816]).addTo(map).bindPopup('Mono A')
    L.marker([-6.17, 106.83]).addTo(map).bindPopup('Mono B')
  }
}
