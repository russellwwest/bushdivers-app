import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

function renderColour (colour) {
  switch (colour) {
    case 'orange':
      return 'orange.500'
    case 'gray':
      return 'gray.500'
    case 'green':
      return 'green.500'
    default:
      return 'orange.500'
  }
}

export const AirportMarker = ({ icao, color = 'gray' }) => {
  return (
    <Box h={10} w={10} bgColor={renderColour(color)} cursor="pointer" border="1px" borderColor="white" borderRadius="full" display="flex" justifyContent="center" alignItems="center">{icao}</Box>
  )
}

AirportMarker.propTypes = {
  icao: PropTypes.string,
  color: PropTypes.string | null
}
