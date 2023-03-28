import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { displayNumber } from '../../helpers/general.helper'
import { AVGAS_WEIGHT, JET_FUEL_WEIGHT } from '../../helpers/weight.helper'
import { completionState } from '../../state/dispatch.state'

export const DispatchSummary = ({ aircraft }) => {
  const completion = useAtomValue(completionState)
  const [canDispatch, setCanDispatch] = useState(!(completion.isAircraftSelected && completion.isContractSelected && completion.isDestinationSet))

  useEffect(() => {
    setCanDispatch(!(completion.isAircraftSelected && completion.isContractSelected && completion.isDestinationSet))
  }, [completion])

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">Dispatch Summary</Heading>
        <Button isDisabled={canDispatch}>Submit</Button>
      </Flex>
      <Card my={4}>
        <CardBody>
          <Flex gap={2} justifyContent="space-between">
            <Text>Pilot & Payload Weight (inc. Fuel):</Text>
            <Text>0 lbs / {displayNumber(aircraft.aircraft_type.mtow, false)} lbs</Text>
          </Flex>
          <Flex gap={2} justifyContent="space-between">
            <Text>Cargo Payload:</Text>
            <Text>0 lbs / {displayNumber(aircraft.aircraft_type.cargo_capacity, false)} lbs</Text>
          </Flex>
          <Flex gap={2} justifyContent="space-between">
            <Text>Passenger Count:</Text>
            <Text>0 / {displayNumber(aircraft.aircraft_type.pax_capacity, false)}</Text>
          </Flex>
          <Flex gap={2} justifyContent="space-between">
            <Text>Fuel (gal):</Text>
            <Text>0  / {displayNumber(aircraft.aircraft_type.fuel_capacity, false)} gal</Text>
          </Flex>
          <Flex gap={2} justifyContent="space-between">
            <Text>Fuel (lbs):</Text>
            <Text>0  / {displayNumber((aircraft.aircraft_type.fuel_capacity * (aircraft.aircraft_type.fuel_type === 1 ? AVGAS_WEIGHT : JET_FUEL_WEIGHT)), false)} lbs</Text>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  )
}

DispatchSummary.propTypes = {
  aircraft: PropTypes.object
}
