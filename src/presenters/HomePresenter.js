import { getMonos } from '../models/MonoModel'
import HomeView from '../views/HomeView'
export default class HomePresenter {
  async init() {
    HomeView.render()
    HomeView.showLoading()

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
}
