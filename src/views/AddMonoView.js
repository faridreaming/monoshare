import L from 'leaflet'
import { monoIcon } from '../utils/monoIcon'

export default class AddMonoView {
  static #stream = null
  static #marker = null
  static #photoFile = null

  static render(onSubmitCallback) {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="flex h-full p-10 justify-center items-center">
        <div class="card bg-base-200 w-full max-w-2xl card-border border-base-300">
          <div class="card-body gap-4">
            <h1 class="card-title">Tambah <strong class="italic">mono</strong></h1>
            <form class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label for="description" class="label">Deskripsi</label>
                  <textarea id="description" class="textarea validator w-full"
                    placeholder="Tulis deskripsi..."
                    aria-describedby="description-hint"
                    required></textarea>
                  <p id="description-hint" class="validator-hint hidden m-0">Deskripsi wajib diisi</p>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="label">Foto</span>

                  <div id="photo-preview" class="hidden">
                    <img id="preview-img" src="" alt="Preview foto" class="h-full max-h-96" />
                  </div>

                  <div id="camera-view" class="hidden">
                    <video id="camera-video" autoplay playsinline class="h-full max-h-96"></video>
                  </div>

                  <canvas id="camera-canvas" class="hidden"></canvas>

                  <div class="flex gap-2">
                    <label for="photo-upload" class="sr-only">Foto</label>
                    <input id="photo-upload" type="file" accept="image/*" class="hidden" />
                    <button type="button" id="btn-upload" class="btn btn-sm btn-outline btn-primary">Upload Gambar</button>
                    <button type="button" id="btn-camera" class="btn btn-sm btn-outline btn-primary">Ambil dari Kamera</button>
                    <button type="button" id="btn-capture" class="hidden btn btn-sm btn-primary">Capture</button>
                    <button type="button" id="btn-close-camera" class="hidden btn btn-sm btn-error">Tutup Kamera</button>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="label">Lokasi</span>
                  <div id="add-map" class="w-full h-96 border border-base-300"></div>
                  <div class="flex gap-4 text-sm">
                    <span>Lat: <strong id="selected-lat">-</strong></span>
                    <span>Lon: <strong id="selected-lon">-</strong></span>
                  </div>
                  <input type="hidden" id="input-lat" />
                  <input type="hidden" id="input-lon" />
                </div>
                <button id="btn-submit" type="submit" class="btn btn-primary btn-wide mt-2">Tambah <strong class="italic">mono</strong></button>
              </form>
          </div>
        </div>
      </div>
    `

    const form = app.querySelector('form')
    const descriptionInput = form.querySelector('#description')
    const inputLat = form.querySelector('#input-lat')
    const inputLon = form.querySelector('#input-lon')

    form.addEventListener('submit', (event) => {
      event.preventDefault()

      onSubmitCallback({
        description: descriptionInput.value,
        photo: AddMonoView.#photoFile,
        lat: inputLat.value,
        lon: inputLon.value,
      })
    })
  }

  static setupPhoto() {
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

      AddMonoView.#photoFile = file
      const url = URL.createObjectURL(file)
      previewImg.src = url
      photoPreview.classList.remove('hidden')
    })

    btnCamera.addEventListener('click', async () => {
      AddMonoView.#stream = await navigator.mediaDevices.getUserMedia({ video: true })
      cameraVideo.srcObject = AddMonoView.#stream

      photoPreview.classList.add('hidden')
      cameraView.classList.remove('hidden')
      btnCapture.classList.remove('hidden')
      btnCloseCamera.classList.remove('hidden')
      btnCamera.classList.add('hidden')
    })

    const closeCamera = () => {
      AddMonoView.#stream.getTracks().forEach((track) => track.stop())
      AddMonoView.#stream = null
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

      canvas.toBlob((blob) => {
        AddMonoView.#photoFile = new File([blob], 'capture.jpg', {
          type: 'image/jpeg',
        })
        previewImg.src = canvas.toDataURL('image/jpeg')
        photoPreview.classList.remove('hidden')
        closeCamera()
      }, 'image/jpeg')
    })
  }

  static initMap(coords) {
    const selectedLatEl = document.getElementById('selected-lat')
    const selectedLonEl = document.getElementById('selected-lon')
    const inputLatEl = document.getElementById('input-lat')
    const inputLonEl = document.getElementById('input-lon')

    const mapEl = document.getElementById('add-map')
    const map = L.map(mapEl).setView(coords, 11)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    ).addTo(map)

    const syncLocation = (locationCoords) => {
      if (AddMonoView.#marker) {
        AddMonoView.#marker.remove()
      }
      AddMonoView.#marker = L.marker(locationCoords, { icon: monoIcon }).addTo(map)

      inputLatEl.value = locationCoords[0]
      inputLonEl.value = locationCoords[1]
      selectedLatEl.textContent = locationCoords[0].toFixed(6)
      selectedLonEl.textContent = locationCoords[1].toFixed(6)
    }

    map.on('click', (event) => {
      const { lat, lng } = event.latlng
      syncLocation([lat, lng])
    })

    syncLocation(coords)

    return map
  }

  static setupCleanup() {
    window.addEventListener(
      'hashchange',
      () => {
        if (AddMonoView.#stream) {
          AddMonoView.#stream.getTracks().forEach((track) => track.stop())
          AddMonoView.#stream = null
        }
      },
      { once: true },
    )
  }

  static showSubmitLoading() {
    const btn = document.getElementById('btn-submit')
    btn.disabled = true
    btn.dataset.label = btn.innerHTML
    btn.innerHTML = '<span class="loading loading-spinner loading-sm"></span> Loading...'
  }

  static hideSubmitLoading() {
    const btn = document.getElementById('btn-submit')
    btn.disabled = false
    btn.innerHTML = btn.dataset.label
  }
}
