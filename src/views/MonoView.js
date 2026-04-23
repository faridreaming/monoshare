export default class MonoView {
  static render() {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div class="drawer h-full w-full drawer-open">
        <input id="mono-drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content h-full">
          <section class="h-full min-h-0 p-4 flex flex-col gap-4">
            <div id="mono-filter" class="border border-base-300 bg-base-100 p-3">
              <button class="btn btn-ghost btn-sm">Filter</button>
            </div>

            <div id="mono-map" class="flex-1 min-h-0 border border-base-300 bg-base-200"></div>
          </section>
        </div>

        <div class="drawer-side is-drawer-close:overflow-visible h-full">
          <label for="mono-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="flex h-full flex-col items-start border-r border-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
            <div class="p-2 w-full grid grid-cols-1">
              <span class="is-drawer-close:hidden text-center col-start-1 row-start-1 self-center text-sm">Daftar <em class="font-bold">mono</em></span>
              <div class="col-start-1 row-start-1 flex justify-end">
                <label for="mono-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost row-start-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-panel-left-icon lucide-panel-left h-4 w-4">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18" />
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
