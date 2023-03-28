import { Box, Grid, GridItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useAtomValue, useAtom } from 'jotai'
import maplibregl from 'maplibre-gl'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { MapProvider, Map, Marker } from 'react-map-gl'
import { DispatchDetails } from '../components/dispatch/DispatchDetails'
import { AirportMarker } from '../components/general/maps/AirportMarker'
import AppLayout from '../components/layout/AppLayout'
import { mapboxToken, parseMapStyle, transformRequest } from '../helpers/map.helper'
import { completionState } from '../state/dispatch.state'
import { mapStyleAtom } from '../state/general.state'

const Dispatch = ({ aircraft, contracts, airport }) => {
  const [completion, setCompletion] = useAtom(completionState)
  const mapStyle = useAtomValue(mapStyleAtom)
  const { colorMode } = useColorMode()
  console.log(contracts)

  useEffect(() => {
    if (aircraft) setCompletion({ isAircraftSelected: true, ...completion })
  }, [aircraft])

  return (
    <MapProvider>
      <Box h="94vh" position="relative">
        <Grid h="94vh" templateColumns="repeat(12, 1fr)">
          <GridItem
            borderRightWidth={1}
            borderRightColor={useColorModeValue('gray.200', 'gray.600')}
            colSpan={4}
          >
            <Box p={4}>
              <DispatchDetails aircraft={aircraft} contracts={contracts} airport={airport} />
            </Box>
          </GridItem>
          <GridItem colSpan={8}>
            <Map
              id="dispatchMap"
              mapLib={maplibregl}
              mapboxAccessToken={mapboxToken}
              initialViewState={{
                longitude: airport.lon,
                latitude: airport.lat,
                zoom: 7
              }}
              mapStyle={mapStyle === 'theme' ? parseMapStyle(colorMode) : parseMapStyle(mapStyle)}
              transformRequest={transformRequest}
            >
              {/* Airport marker */}
              <Marker latitude={airport.lat} longitude={airport.lon}>
                <AirportMarker icao={airport.identifier} color="green" />
              </Marker>
              {contracts && contracts.map((contract) => (
                <Marker longitude={contract.arr_airport.lon} latitude={contract.arr_airport.lat} key={contract.id}>
                  <AirportMarker icao={contract.arr_airport_id} color="gray" />
                </Marker>
              ))}
            </Map>
          </GridItem>
        </Grid>
      </Box>
    </MapProvider>
  )
}

Dispatch.layout = page => <AppLayout title="Dispatch" fullSize>{page}</AppLayout>

Dispatch.propTypes = {
  aircraft: PropTypes.object,
  contracts: PropTypes.array,
  airport: PropTypes.object
}

export default Dispatch
