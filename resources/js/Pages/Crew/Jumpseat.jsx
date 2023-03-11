import {
  Box, Button,
  Card,
  CardBody,
  CardHeader, Flex,
  Grid,
  GridItem,
  Heading, Input, SimpleGrid, Skeleton, Text, useBoolean, useToast
} from '@chakra-ui/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { StatCard } from '../../components/general/StatCard'
import AppLayout from '../../components/layout/AppLayout'
import { HeadingSection } from '../../components/layout/HeadingSection'
import { displayCash } from '../../helpers/general.helper'

const Jumpseat = ({ user, spent }) => {
  const [search, setSearch] = useState('')
  const [airport, setAirport] = useState('')
  const [distance, setDistance] = useState(0.00)
  const [cost, setCost] = useState(0.00)
  const [isLoading, setIsLoading] = useBoolean(false)
  const toast = useToast()

  useEffect(() => {
    if (user.current_airport_id === search) {
      setSearch('')
      setAirport('')
      setDistance(0.00)
      setCost(0.00)
    }
  }, [user])
  function handleSearchChange (e) {
    setSearch(e.target.value)
  }

  async function processJumpseat () {
    router.post('/jumpseat', { destination: airport.identifier, cost })
  }
  async function getDestination () {
    if (search?.length > 2) {
      try {
        setIsLoading.on()
        const response = await axios.get(`/api/jumpseat/check/${user.location.identifier}/${search}`)
        if (response.status === 200) {
          setAirport(response.data.airport)
          setDistance(response.data.distance)
          setCost(response.data.cost)
        }
        setIsLoading.off()
      } catch (e) {
        setIsLoading.off()
        toast({
          title: 'Error',
          description: e.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
      }
    }
  }

  return (
    <Box>
      <HeadingSection heading="Jumpseat" />
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem colSpan={{ sm: 6, lg: 4 }}>
          <Card>
            <CardHeader>
              <Flex justifyContent="space-between">
                <Heading size='md'>Calculate Jumpseat</Heading>
                <Flex gap={2}>
                  <Input value={search} onChange={handleSearchChange} placeholder='Enter icao' />
                  <Button onClick={() => getDestination()} isLoading={isLoading}>Check</Button>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={3} gap={{ sm: 1, lg: 6 }}>
                <Box textAlign="center">
                  <Flex direction="column" alignItems="center">
                    <Text mb={2} fontSize="lg">Current Location</Text>
                    <Heading size="lg">{user.location.identifier}</Heading>
                    <Text fontSize="lg">{user.location.name}</Text>
                  </Flex>
                </Box>
                <Box textAlign="center">
                  <Flex direction="column" alignItems="center" gap={2}>
                    {airport && <Text fontSize="lg">Travel Details</Text>}
                    <Skeleton h={4} mb={2} isLoaded={!isLoading}>{airport && <Heading size="lg">${cost}</Heading>}</Skeleton>
                    <Skeleton h={4} isLoaded={!isLoading}>{airport && <Text fontSize="xl">{distance} nm</Text>}</Skeleton>
                  </Flex>
                </Box>
                <Box textAlign="center">
                  <Flex direction="column" alignItems="center" gap={2}>
                    <Text fontSize="lg">Destination</Text>
                    {!airport && <Text>Enter ICAO and click Check</Text>}
                    <Skeleton h={4} mb={2} isLoaded={!isLoading}>{airport && <Heading size="lg">{airport?.identifier}</Heading>}</Skeleton>
                    <Skeleton h={4} isLoaded={!isLoading}>{airport && <Text fontSize="lg">{airport?.name}</Text>}</Skeleton>
                  </Flex>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
          <Flex mt={2} justifyContent="end">
            <Button onClick={() => processJumpseat()} isDisabled={!airport} colorScheme="orange">Process Jumpseat</Button>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ sm: 3, lg: 1 }}>
          <StatCard
            title="Total Spent on Travel"
            value={`$${displayCash(spent)}`}
          />
        </GridItem>
        <GridItem colSpan={{ sm: 3, lg: 1 }}>
          <StatCard
            title="Current Cash"
            value={`$${displayCash(user.cash)}`}
          />
        </GridItem>
      </Grid>
    </Box>
  )
}

Jumpseat.layout = page => <AppLayout title="Jumpseat">{page}</AppLayout>
export default Jumpseat

Jumpseat.propTypes = {
  user: PropTypes.object,
  spent: PropTypes.number
}
