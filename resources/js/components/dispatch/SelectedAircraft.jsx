import { Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { displayNumber } from '../../helpers/general.helper'
import { AircraftCondition } from '../aircraft/AircraftCondition'

export const SelectedAircraft = ({ aircraft }) => {
  // function renderAircraftLabel () {
  //   return 'Aircraft'
  // }

  return (
    <Box mb={2}>
      {aircraft && aircraft !== null
        ? (
          <Card>
            <CardBody>
              <Flex justifyContent="space-between" gap={3}>
                <Flex direction="column" gap={1}>
                  <Heading size="sm">{aircraft.registration}</Heading>
                  <Text fontSize="sm">{aircraft.aircraft_type.manufacturer.name} {aircraft.aircraft_type.name}</Text>
                  <Text fontSize="sm">{aircraft.aircraft_type.identifier}</Text>
                </Flex>
                <Flex direction="column" alignItems="end" gap={1}>
                  <Text fontSize="sm">{aircraft.registration}</Text>
                  <Text fontSize="sm">{displayNumber(aircraft.fuel_onboard, false)} gal</Text>
                </Flex>
              </Flex>
              <Box mt={2}>
                <Text fontSize="xs">Condition</Text>
                <AircraftCondition condition={aircraft.total_condition} />
              </Box>
            </CardBody>
          </Card>
          )
        : (
          <Card>
            <CardBody>
              <Text>Please select an aircraft</Text>
            </CardBody>
          </Card>
          )
      }
    </Box>
  )
}

SelectedAircraft.propTypes = {
  aircraft: PropTypes.object
}
