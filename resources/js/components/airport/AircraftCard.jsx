import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import PropTypes from 'prop-types'
import React from 'react'

export const AircraftCard = ({ ac }) => {
  return (
    <Card key={ac.id} my={2}>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Flex direction="column">
              <Text>{ac.registration}</Text>
              <Text fontSize="sm">{ac.aircraft_type.manufacturer.name} {ac.aircraft_type.name} ({ac.aircraft_type.identifier})</Text>
            </Flex>
          </Box>
          <Box>
            <Button variant="link"><Link href={`/airport/${ac.home_location}`}></Link>{ac.home_location}</Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

AircraftCard.propTypes = {
  ac: PropTypes.object
}
