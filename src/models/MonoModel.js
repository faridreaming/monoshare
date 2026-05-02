import { addStory, getStories } from '../services/storyService'

export async function getMonos({ location = 1, page, size } = {}) {
  const options = { location }
  if (page) options.page = page
  if (size) options.size = size
  return getStories(options)
}

export async function addMono({ description, photo, lat, lon }) {
  return addStory({ description, photo, lat, lon })
}
