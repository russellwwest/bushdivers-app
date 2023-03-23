export const renderAircraftState = (state) => {
  switch (state) {
    case 1:
      return 'Available'
    case 2:
      return 'Reserved'
    default:
      return 'Available'
  }
}

export const renderFuelType = (fuel) => {
  switch (fuel) {
    case 1:
      return 'AvGas'
    case 2:
      return 'Jet Fuel'
    default:
      return 'AvGas'
  }
}
