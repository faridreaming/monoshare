import { getMonos } from '../models/MonoModel'
import HomeView from '../views/HomeView'
export default class HomePresenter {
  async init() {
    HomeView.render()
    HomeView.renderLoading()

    try {
      const data = await getMonos({ location: 1, page: 1 })

      if (data.error) {
        alert(`Error: ${data.message}`)
        return
      }

      const monos = data.listStory
      HomeView.renderList(monos)
    } catch (error) {
      alert(`Error fetching data: ${error}`)
    }
  }
}
