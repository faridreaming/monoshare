export function getUserLocation(defaultCoords) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(defaultCoords)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve([latitude, longitude])
      },
      () => {
        resolve(defaultCoords)
      },
    )
  })
}
