import {
  Box, Button,
  Card,
  CardBody,
  CardFooter,
  Divider, Flex,
  Heading,
  Image, SimpleGrid,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { renderFuelType } from '../../helpers/aircraft.helpers'
import { displayNumber } from '../../helpers/general.helper'
import { FleetListModal } from './FleetListModal'

export const AircraftType = ({ acType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
    <Card>
      <CardBody>
        <Flex justifyContent="center">
        <Image
          src={acType.image}
          alt={acType.name}
          borderRadius='lg'
        />
        </Flex>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{acType.manufacturer?.name} {acType.name} ({acType.identifier})</Heading>
          <SimpleGrid columns="2" gap={1}>
            <Flex direction="column"><Text as="b">Service Ceiling:</Text> {displayNumber(acType.service_ceiling, false)} ft</Flex>
            <Flex direction="column"><Text as="b">Range</Text> {displayNumber(acType.range, false)} nm</Flex>
            <Flex direction="column"><Text as="b">PAX Capacity:</Text> {acType.pax_capacity}</Flex>
            <Flex direction="column"><Text as="b">Cargo Capacity:</Text> {displayNumber(acType.cargo_capacity, false)} lbs</Flex>
            <Flex direction="column"><Text as="b">Fuel Type:</Text> {renderFuelType(acType.fuel_type)}</Flex>
            <Flex direction="column"><Text as="b">Fuel Capacity:</Text> {displayNumber(acType.fuel_capacity, false)} gal</Flex>
          </SimpleGrid>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex gap={2}>
          <Button variant="link" onClick={onOpen}>Show Aircraft</Button>
          <Box>({acType.aircraft?.length} aircraft)</Box>
        </Flex>
      </CardFooter>
    </Card>
    <FleetListModal aircraft={acType.aircraft} isOpen={isOpen} onClose={onClose} acType={`${acType.manufacturer.name} ${acType.name} (${acType.identifier})`} />
    </Box>
  )
}

AircraftType.propTypes = {
  acType: PropTypes.object
}
