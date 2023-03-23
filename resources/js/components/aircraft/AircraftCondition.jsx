import { Progress } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

function renderColour (condition) {
  if (condition >= 75) return 'green'
  if (condition < 75 && condition >= 50) return 'yellow'
  if (condition < 50 && condition > 30) return 'orange'
  if (condition <= 30) return 'red'
}
export const AircraftCondition = ({ condition }) => {
  return (
    <Progress colorScheme={renderColour(condition)} value={condition} />
  )
}

AircraftCondition.propTypes = {
  condition: PropTypes.number
}
