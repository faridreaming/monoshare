export default class AddMonoView {
  static render(callback) {
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
                <button type="submit" class="btn btn-primary mt-2">Login</button>
              </form>
            <p class="mt-2">Belum punya akun? <a href="#/register" class="link">Register di sini</a></p>
          </div>
        </div>
      </div>
    `
  }
}
