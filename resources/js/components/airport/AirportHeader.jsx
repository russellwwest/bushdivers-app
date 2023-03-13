import { Box, Button, Card, CardBody, Flex, Heading, Input, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const AirportHeader = ({ airport }) => {
  const [search, setSearch] = useState('')

  function handleChange (e) {
    setSearch(e.target.value.toUpperCase())
  }

  function getAirport () {
    if (search?.length > 2) {
      router.get(`/airport/${search}`)
    }
  }

  return (
    <Card>
      <CardBody>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex direction="column" alignItems="start" gap={2}>
            <Box>
              <Flex direction="column" alignItems="start" gap={1}>
                <Heading>{airport.identifier}</Heading>
                <Text>{airport.name}</Text>
              </Flex>
            </Box>
            <Flex direction="row" alignItems="center" gap={3}>
              <Tag colorScheme="gray">{airport.size}</Tag>
              {airport.is_hub ? <Tag>Hub</Tag> : null}
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Flex gap={2}>
            <Input bg={useColorModeValue('white', 'gray.800')} placeholder='Enter icao' value={search} onChange={handleChange} />
            <Button colorScheme="gray" onClick={() => getAirport()}>Search</Button>
          </Flex>
        </Box>
      </Flex>
      </CardBody>
    </Card>
  )
}

AirportHeader.propTypes = {
  airport: PropTypes.object
}
