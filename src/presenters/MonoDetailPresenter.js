import { getMono } from '../models/MonoModel'
import MonoDetailView from '../views/MonoDetailView'

export default class MonoDetailPresenter {
  #id

  constructor(id) {
    this.#id = id
  }

  async init() {
    MonoDetailView.render()

    try {
      const data = await getMono(this.#id)

      if (!data) {
        throw new Error('Data mono tidak tersedia')
      }

      if (data.error) {
        throw new Error(data.message)
      }

      await MonoDetailView.renderDetail(data.story)
    } catch (error) {
      MonoDetailView.renderError(error.message)
    }
  }
}
