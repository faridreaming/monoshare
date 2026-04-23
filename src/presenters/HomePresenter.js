import HomeView from '../views/HomeView'
import getMonos from '../models/MonoMockModel'

export default class HomePresenter {
  init() {
    HomeView.render(getMonos())
  }
}
