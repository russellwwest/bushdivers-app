import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { useMap } from 'react-map-gl'
import { AircraftList } from './AircraftList'
import { AirportDetails } from './AirportDetails'
import { ContractList } from './ContractList'

export const AirportContent = ({ airport, updateView }) => {
  const { airportMap } = useMap()

  function handleTabClick (zoom, whatClicked) {
    airportMap.flyTo({ center: [airport.lon, airport.lat], zoom })
    updateView(whatClicked)
  }

  return (
    <Card>
    <Tabs>
      <TabList>
        <Tab onClick={() => handleTabClick(7, 'contracts')}>Contracts</Tab>
        <Tab onClick={() => handleTabClick(14, 'airport')} >Airport Info</Tab>
        <Tab onClick={() => handleTabClick(14, 'aircraft')}>Aircraft</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ContractList />
        </TabPanel>
        <TabPanel>
          <AirportDetails airport={airport} />
        </TabPanel>
        <TabPanel>
          <AircraftList />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Card>
  )
}

AirportContent.propTypes = {
  airport: PropTypes.object,
  updateView: PropTypes.func
}
