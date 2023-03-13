import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'
export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ''

export const displayNumber = (cash, decimal = true) => parseFloat(cash).toLocaleString(undefined, { minimumFractionDigits: decimal ? 2 : 0 })
export function dynamicSort (property, direction) {
  const sortOrder = direction === 'asc' ? 1 : -1
  return function (a, b) {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}

export const transformRequest = (url, resourceType) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxToken)
  }
  // Do any other transforms you want
  return { url }
}

export const parseMapStyle = (mapStyle) => {
  switch (mapStyle) {
    case 'dark':
      return 'mapbox://styles/mapbox/dark-v10'
    case 'light':
      return 'mapbox://styles/mapbox/light-v10'
    case 'street':
      return 'mapbox://styles/mapbox/streets-v11'
    case 'satellite':
      return 'mapbox://styles/mapbox/satellite-streets-v11'
    case 'terrain':
      return 'mapbox://styles/mapbox/outdoors-v11'
    default:
      return 'mapbox://styles/mapbox/dark-v10'
  }
}
