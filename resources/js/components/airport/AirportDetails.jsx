import { ArrowUpIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem, AccordionPanel,
  Box,
  Flex,
  Heading, Icon, SimpleGrid,
  Text, useToast
} from '@chakra-ui/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { BsCloud, BsCloudDrizzle, BsCloudRain, BsCloudSnow, BsSun } from 'react-icons/bs'
import { renderRunwayText } from '../../helpers/airport.helper'
import { displayNumber } from '../../helpers/general.helper'
import dayjs from '../../helpers/date.helper'

function renderClouds (m) {
  if (m) {
    if (m?.conditions?.length > 0) {
      if (m.conditions[0].code === 'RA') {
        return { text: 'Rain', icon: <Icon boxSize={8} as={BsCloudRain} /> }
      }
      if (m.conditions[0].code === 'SN') {
        return { text: 'Snow', icon: <Icon boxSize={8} as={BsCloudSnow} /> }
      }
      if (m.conditions[0].code === 'DZ') {
        return { text: 'Light Drizzle', icon: <Icon boxSize={8} as={BsCloudDrizzle} /> }
      }
    }
    if (m?.clouds?.length > 0) {
      if (m.clouds[0].code === 'CAVOK') {
        return { text: 'Sunny', icon: <Icon boxSize={8} as={BsSun} /> }
      }
      if (m.clouds[0].code === 'BKN') {
        return { text: 'Overcast', icon: <Icon boxSize={8} as={BsCloud} /> }
      }
    }
    return { text: 'Overcast', icon: <Icon boxSize={8} as={BsCloud} /> }
  }
  return null
}

export const AirportDetails = ({ airport }) => {
  const [metar, setMetar] = useState(null)
  const [clouds, setClouds] = useState(null)
  const toast = useToast()
  useEffect(() => {
    const getMetar = async () => {
      try {
        const res = await axios.get(`/api/metar/${airport.identifier}`)
        if (res.data.metar !== null) {
          setMetar(res.data.metar.data[0])
          const cl = renderClouds(res.data.metar.data[0])
          setClouds(cl)
        } else {
          toast({
            title: 'Error',
            description: 'Error retrieving METAR',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          })
        }
      } catch (e) {
        console.log(e)
        toast({
          title: 'Error',
          description: 'Error retrieving METAR',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
      }
    }
    getMetar()
  }, [airport])

  return (
    <Box p={4}>
      <SimpleGrid columns={3} gap={2}>
        <Flex direction="column">
          <Heading size="md">{airport.name}</Heading>
          <Text>{airport.identifier}</Text>
          <Text fontSize="sm">Elev. {displayNumber(airport.altitude, false)}ft</Text>
        </Flex>
        <Flex direction="column">
          <Heading size="sm">Longest Runway</Heading>
          <Text>
            {displayNumber(airport.longest_runway_length, false)}ft x {displayNumber(airport.longest_runway_width, false)}ft
          </Text>
          <Text>{renderRunwayText(airport.longest_runway_surface)}</Text>
        </Flex>
        <Flex direction="column" alignItems="end">
          <Heading size="sm">Fuel</Heading>
          {airport.has_avgas ? <Text>AV GAS: {displayNumber(airport.avgas_qty, false)} gal</Text> : null}
          {airport.has_jetfuel ? <Text>Jet A: {displayNumber(airport.jetfuel_qty, false)} gal</Text> : null}
        </Flex>
      </SimpleGrid>
      <Box mt={6}>
        <SimpleGrid columns={3} gap={2}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Heading size="md">Clouds</Heading>
            {clouds?.icon}
            <Text>{clouds?.text}</Text>
          </Flex>
          <Flex direction="column" alignItems="center" gap={2}>
            <Heading size="md">Temperature</Heading>
            <Flex><Heading size="2xl">{metar?.temperature?.celsius}</Heading><Text>&#176;C</Text></Flex>
          </Flex>
          <Flex direction="column" alignItems="center" gap={2}>
            <Heading size="md">Wind</Heading>
            <ArrowUpIcon boxSize={6} style={{ transform: `rotate(${metar?.wind?.degrees}deg)` }} />
            <Flex gap={1}>
              <Text>{metar?.wind?.degrees}&#176;</Text>
              <Text>{metar?.wind?.speed_kts} kts</Text>
            </Flex>
          </Flex>
        </SimpleGrid>
      </Box>
      <Accordion allowToggle mt={4}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                More weather & METAR
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={4} gap={1}>
              <Flex direction="column" alignItems="center" gap={1}>
                <Heading size="sm">Air Pressure</Heading>
                <Text>{metar?.barometer?.hpa} hpa</Text>
                <Text>{metar?.barometer?.hg} hg</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap={1}>
                <Heading size="sm">Dew Point</Heading>
                <Text>{metar?.dewpoint?.celsius}&#176;C</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap={1}>
                <Heading size="sm">Humidity</Heading>
                <Text>{metar?.humidity?.percent}%</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap={1}>
                <Heading size="sm">Flight Category</Heading>
                <Text>{metar?.flight_category}</Text>
              </Flex>
            </SimpleGrid>
            <Box mt={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xs">Latest METAR</Text>
                <Text fontSize="xs">{dayjs(metar?.observed).fromNow()}</Text>
              </Flex>
              <Box mt={2}>{metar?.raw_text}</Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

AirportDetails.propTypes = {
  airport: PropTypes.object
}
