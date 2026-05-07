import {
  subscribe,
  unsubscribe,
  getSubscriptionStatus,
} from '../models/PushModel'

export default class PushPresenter {
  #view

  constructor(view) {
    this.#view = view
  }

  async init() {
    const subscribed = await getSubscriptionStatus()
    this.#view.update(subscribed)
  }

  async toggle() {
    this.#view.setLoading()

    try {
      const subscribed = await getSubscriptionStatus()
      if (subscribed) {
        await unsubscribe()
        this.#view.update(false)
      } else {
        await subscribe()
        this.#view.update(true)
      }
    } catch (error) {
      const actual = await getSubscriptionStatus()
      this.#view.update(actual)
      alert(error.message)
    }
  }
}
