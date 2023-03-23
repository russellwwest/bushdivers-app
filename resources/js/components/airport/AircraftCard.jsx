import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import { Link, router, usePage } from '@inertiajs/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import React from 'react'

export const AircraftCard = ({ ac, hasRental }) => {
  const { auth } = usePage().props
  const toast = useToast()
  async function rentAircraft (e, aircraft) {
    e.stopPropagation()
    try {
      const res = await axios.post('/api/aircraft/rent', { aircraft_id: aircraft.id, user_id: auth.user.id })
      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Aircraft rented successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
        router.visit(`/airport/${aircraft.current_airport_id}`, { only: ['aircraft'] })
      }
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  function renderActionButton () {
    if (ac.user_id === auth.user.id) return <IconButton onClick={(e) => rentAircraft(e, ac)} size="xs" aria-label="Rent" icon={<CloseIcon />} />
    if (hasRental) return null
    return <IconButton onClick={(e) => rentAircraft(e, ac)} size="xs" aria-label="Rent" icon={<CheckIcon />} />
  }

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
          <Box>
            {renderActionButton()}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

AircraftCard.propTypes = {
  ac: PropTypes.object,
  hasRental: PropTypes.bool
}
