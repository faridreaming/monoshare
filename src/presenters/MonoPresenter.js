import L from 'leaflet'
import MonoView from '../views/MonoView'
import { getMonos } from '../models/MonoModel'
import { delay } from '../utils/delay'
import { getUserLocation } from '../utils/geolocation'
import { monoIcon } from '../utils/monoIcon'

export default class MonoPresenter {
  #monos = []
  #map = null
  #markers = new Map()

  async init() {
    MonoView.render()
    MonoView.showLoading()

    try {
      const data = await getMonos({ location: 1, page: 1, size: 9999 })

      if (data.error) {
        throw new Error(data.message)
      }

      this.#monos = data.listStory
      await this.#initMap(this.#monos)
      MonoView.renderList(this.#monos, (id) => this.#navigateToMarker(id))
      this.#map.on('moveend', () => {
        this.#filterByBounds()
      })
    } catch (error) {
      MonoView.hideLoading()
      alert(error.message)
    }
  }

  async #initMap(monos = this.#monos) {
    const monoMapEl = document.getElementById('mono-map')
    monoMapEl.innerHTML = ''
    const coords = await getUserLocation([-6.2, 106.816])
    this.#map = L.map(monoMapEl).setView(coords, 11)

    const darkLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    )

    const lightLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    )

    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      },
    )

    darkLayer.addTo(this.#map)

    L.control
      .layers({
        Dark: darkLayer,
        Light: lightLayer,
        Satellite: satelliteLayer,
      })
      .addTo(this.#map)

    monos.forEach((mono) => {
      const marker = L.marker([mono.lat, mono.lon], { icon: monoIcon })
        .addTo(this.#map)
        .bindPopup(mono.name)

      this.#markers.set(mono.id, marker)
    })

    this.#filterByBounds()
  }

  #filterByBounds() {
    const bounds = this.#map.getBounds()
    const filteredMonos = this.#monos.filter((mono) =>
      bounds.contains([mono.lat, mono.lon]),
    )
    MonoView.renderList(filteredMonos, (id) => this.#navigateToMarker(id))
  }

  #navigateToMarker(id) {
    const marker = this.#markers.get(id)
    const markerLatLng = marker.getLatLng()
    this.#map.flyTo(markerLatLng)
    marker.openPopup()
  }
}
