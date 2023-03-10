export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ''

export const displayCash = cash => parseFloat(cash).toLocaleString(undefined, { minimumFractionDigits: 2 })
export function dynamicSort (property, direction) {
  const sortOrder = direction === 'asc' ? 1 : -1
  return function (a, b) {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}
