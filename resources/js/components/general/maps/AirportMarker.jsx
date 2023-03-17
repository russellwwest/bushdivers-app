import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

export const AirportMarker = ({ icao, color = 'gray' }) => {
  return (
    <Box h={10} w={10} bgColor={color === 'orange' ? 'orange.500' : 'gray.500'} cursor="pointer" border="1px" borderColor="white" borderRadius="full" display="flex" justifyContent="center" alignItems="center">{icao}</Box>
  )
}

AirportMarker.propTypes = {
  icao: PropTypes.string,
  color: PropTypes.string | null
}
