import { getUserLocation } from '../utils/geolocation'
import { monoIcon } from '../utils/monoIcon'
import AddMonoView from '../views/AddMonoView'

export default class AddMonoPresenter {
  #stream = null
  #map = null
  #marker = null

  async init() {
    AddMonoView.render()
    this.#setupPhoto()
    await this.#initMap()
    this.#setupCleanup()
  }

  async #initMap() {
    const selectedLatEl = document.getElementById('selected-lat')
    const selectedLonEl = document.getElementById('selected-lon')
    const inputLatEl = document.getElementById('input-lat')
    const inputLonEl = document.getElementById('input-lon')

    const mapEl = document.getElementById('add-map')
    const coords = await getUserLocation([-6.2, 106.816])
    this.#map = L.map(mapEl).setView(coords, 11)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    ).addTo(this.#map)

    this.#map.on('click', (event) => {
      const { lat, lng } = event.latlng
      syncLocation([lat, lng])
    })

    const syncLocation = (coords) => {
      if (this.#marker) {
        this.#marker.remove()
      }
      this.#marker = L.marker(coords, { icon: monoIcon }).addTo(this.#map)

      inputLatEl.value = coords[0]
      inputLonEl.value = coords[1]
      selectedLatEl.textContent = coords[0].toFixed(6)
      selectedLonEl.textContent = coords[1].toFixed(6)
    }

    syncLocation(coords)
  }

  #setupPhoto() {
    const btnUpload = document.getElementById('btn-upload')
    const photoUpload = document.getElementById('photo-upload')
    const previewImg = document.getElementById('preview-img')
    const photoPreview = document.getElementById('photo-preview')
    const btnCamera = document.getElementById('btn-camera')
    const btnCapture = document.getElementById('btn-capture')
    const btnCloseCamera = document.getElementById('btn-close-camera')
    const cameraView = document.getElementById('camera-view')
    const cameraVideo = document.getElementById('camera-video')
    const canvas = document.getElementById('camera-canvas')

    btnUpload.addEventListener('click', () => {
      photoUpload.click()
    })

    photoUpload.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      previewImg.src = url
      photoPreview.classList.remove('hidden')
    })

    btnCamera.addEventListener('click', async () => {
      this.#stream = await navigator.mediaDevices.getUserMedia({ video: true })
      cameraVideo.srcObject = this.#stream

      photoPreview.classList.add('hidden')
      cameraView.classList.remove('hidden')
      btnCapture.classList.remove('hidden')
      btnCloseCamera.classList.remove('hidden')
      btnCamera.classList.add('hidden')
    })

    const closeCamera = () => {
      this.#stream.getTracks().forEach((track) => track.stop())
      this.#stream = null
      cameraVideo.srcObject = null

      cameraView.classList.add('hidden')
      btnCapture.classList.add('hidden')
      btnCloseCamera.classList.add('hidden')
      btnCamera.classList.remove('hidden')
    }

    btnCloseCamera.addEventListener('click', closeCamera)

    btnCapture.addEventListener('click', () => {
      canvas.width = cameraVideo.videoWidth
      canvas.height = cameraVideo.videoHeight

      canvas.getContext('2d').drawImage(cameraVideo, 0, 0)

      previewImg.src = canvas.toDataURL('image/jpeg')
      photoPreview.classList.remove('hidden')

      closeCamera()
    })
  }

  #setupCleanup() {
    window.addEventListener(
      'hashchange',
      () => {
        if (this.#stream) {
          this.#stream.getTracks().forEach((track) => track.stop())
          this.#stream = null
        }
      },
      { once: true },
    )
  }
}
