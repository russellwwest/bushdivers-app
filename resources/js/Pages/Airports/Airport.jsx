import { Box, Grid, GridItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { AirportContent } from '../../components/airport/AirportContent'
import { AirportHeader } from '../../components/airport/AirportHeader'
import AppLayout from '../../components/layout/AppLayout'
import { Map, MapProvider, Marker } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import { parseMapStyle, mapboxToken, transformRequest } from '../../helpers/general.helper'

const Airport = ({ airport, contracts }) => {
  const { colorMode } = useColorMode()

  function updateView (whatClicked) {
    // update to show/hide aircraft
    console.log(whatClicked)
  }

  return (
    <MapProvider>
    <Box h="94vh" position="relative">
      <Grid h="94vh" templateColumns="repeat(12, 1fr)">
        <GridItem
          borderRightWidth={1}
          borderRightColor={useColorModeValue('gray.200', 'gray.600')}
          colSpan={5}
        >
          <Box p={4}>
            <Box>
              <AirportHeader airport={airport} />
            </Box>
            <Box mt={4}>
              <AirportContent airport={airport} contracts={contracts} updateView={updateView} />
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={7}>
          <Map
            id="airportMap"
            mapLib={maplibregl}
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: airport.lon,
              latitude: airport.lat,
              zoom: 7
            }}
            mapStyle={parseMapStyle(colorMode)}
            transformRequest={transformRequest}
          >
            {/* Airport marker */}
            <Marker latitude={airport.lat} longitude={airport.lon} color="#F97316" />
            {/* Contracts */}
          </Map>
        </GridItem>
      </Grid>
    </Box>
    </MapProvider>
  )
}

Airport.layout = page => <AppLayout title="Airport Info" fullSize>{page}</AppLayout>
export default Airport

Airport.propTypes = {
  airport: PropTypes.object,
  contracts: PropTypes.array
}
