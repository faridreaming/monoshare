import AddMonoView from '../views/AddMonoView'

export default class AddMonoPresenter {
  init() {
    AddMonoView.render()
    this.#setupPhoto()
  }

  #setupPhoto() {
    const btnUpload = document.getElementById('btn-upload')
    const photoUpload = document.getElementById('photo-upload')
    const previewImg = document.getElementById('preview-img')
    const photoPreview = document.getElementById('photo-preview')

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
  }
}
