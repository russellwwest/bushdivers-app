import { Card, Tab, TabList, TabPanel, TabPanels, Tabs, Tag } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { useMap } from 'react-map-gl'
import { AircraftList } from './AircraftList'
import { AirportDetails } from './AirportDetails'
import { ContractList } from '../contracts/ContractList'

export const AirportContent = ({ airport, contracts, updateView }) => {
  const { airportMap } = useMap()

  function handleTabClick (zoom, whatClicked) {
    airportMap.flyTo({ center: [airport.lon, airport.lat], zoom })
    updateView(whatClicked)
  }

  return (
    <Card>
    <Tabs>
      <TabList>
        <Tab onClick={() => handleTabClick(7, 'contracts')}>Contracts <Tag ml={2}>{contracts?.length}</Tag></Tab>
        <Tab onClick={() => handleTabClick(14, 'airport')} >Airport Info</Tab>
        <Tab onClick={() => handleTabClick(14, 'aircraft')}>Aircraft</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ContractList contracts={contracts} />
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
  contracts: PropTypes.array,
  updateView: PropTypes.func
}
