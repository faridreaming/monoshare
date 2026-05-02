import AddMonoView from '../views/AddMonoView'

export default class AddMonoPresenter {
  #stream = null

  init() {
    AddMonoView.render()
    this.#setupPhoto()
    this.#setupCleanup()
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
