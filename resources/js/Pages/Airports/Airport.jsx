import { Box, Grid, GridItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AirportContent } from '../../components/airport/AirportContent'
import { AirportHeader } from '../../components/airport/AirportHeader'
import { ContractMapControls } from '../../components/contracts/ContractMapControls'
import { distanceFilter, payloadFilter, selectedContractAtom } from '../../state/contract.state'
import { SelectedContractRoute } from '../../components/contracts/SelectedContractRoute'
import { AirportMarker } from '../../components/general/maps/AirportMarker'
import AppLayout from '../../components/layout/AppLayout'
import { Map, MapProvider, Marker } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import { parseMapStyle, mapboxToken, transformRequest } from '../../helpers/map.helper'
import { mapStyleAtom } from '../../state/general.state'

const Airport = ({ airport, contracts }) => {
  const setSelectedContract = useSetAtom(selectedContractAtom)
  const mapStyle = useAtomValue(mapStyleAtom)
  const filterDistance = useAtomValue(distanceFilter)
  const filterPayload = useAtomValue(payloadFilter)
  const { colorMode } = useColorMode()
  const [filteredContracts, setFilteredContracts] = useState(contracts)

  useEffect(() => {
    applyFilters()
  }, [filterPayload, filterDistance])

  function updateView (whatClicked) {
    // update to show/hide aircraft
    console.log(whatClicked)
  }

  const applyFilters = () => {
    setSelectedContract(null)
    let distanceFilteredContracts = null
    let newContracts = null

    switch (filterDistance) {
      case 'all':
        distanceFilteredContracts = contracts
        break
      case 'short':
        distanceFilteredContracts = contracts.filter(c => c.distance < 60)
        break
      case 'medium':
        distanceFilteredContracts = contracts.filter(c => c.distance < 100 && c.distance >= 60)
        break
      case 'long':
        distanceFilteredContracts = contracts.filter(c => c.distance >= 100)
        break
      default:
        distanceFilteredContracts = contracts
        break
    }
    switch (filterPayload) {
      case 'all':
        newContracts = distanceFilteredContracts
        break
      case 'light':
        newContracts = distanceFilteredContracts.filter(c => c.cargo_qty < 1000)
        break
      case 'medium':
        newContracts = distanceFilteredContracts.filter(c => c.cargo_qty < 3000 && c.cargo_qty >= 1000)
        break
      case 'heavy':
        newContracts = distanceFilteredContracts.filter(c => c.cargo_qty >= 3000)
        break
      default:
        newContracts = distanceFilteredContracts
        break
    }
    console.log(newContracts)
    setFilteredContracts(newContracts)
  }

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
            <Box>
              <AirportHeader airport={airport} />
            </Box>
            <Box mt={4}>
              <AirportContent airport={airport} contracts={filteredContracts} updateView={updateView} />
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={8}>
          <Map
            id="airportMap"
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
              <AirportMarker icao={airport.identifier} />
            </Marker>
            {/* Contracts */}
            {filteredContracts && filteredContracts.map((contract) => (
              <Marker onClick={() => setSelectedContract(contract)} key={contract.id} scale={0.75} longitude={contract.arr_airport.lon} latitude={contract.arr_airport.lat}>
                <AirportMarker icao={contract.arr_airport_id} color="orange" />
              </Marker>
            ))}
            <SelectedContractRoute />
            <ContractMapControls />
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
