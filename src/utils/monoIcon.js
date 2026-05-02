import L from 'leaflet'

export const monoIcon = L.divIcon({
  className: 'mono-marker',
  html: `
        <div class="mono-marker__pulse"></div>
        <div class="mono-marker__core"></div>
      `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
})
