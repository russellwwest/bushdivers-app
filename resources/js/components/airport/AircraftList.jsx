import {
  Accordion, AccordionButton, AccordionIcon,
  AccordionItem, AccordionPanel,
  Box
} from '@chakra-ui/react'
import { usePage } from '@inertiajs/react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AircraftCard } from './AircraftCard'

export const AircraftList = ({ aircraft }) => {
  const { auth } = usePage().props
  const [fleetAircraft, setFleetAircraft] = useState(null)
  const [myAircraft, setMyAircraft] = useState(null)
  const [usedAircraft, setUsedAircraft] = useState(null)
  const [hasRental, setHasRental] = useState(false)

  useEffect(() => {
    setFleetAircraft(aircraft.filter((f) => f.owner_id === 0))
    setMyAircraft(aircraft.filter((f) => f.owner_id === auth.user.id))
    setUsedAircraft(aircraft.filter((f) => f.owner_id === null))
    const activeRentals = aircraft.filter((f) => f.user_id === auth.user.id)
    if (activeRentals?.length > 0) setHasRental(true)
  }, [aircraft])

  return (
    <Box maxHeight="500px" style={{ overflowY: 'auto' }} >
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Fleet Aircraft ({fleetAircraft?.length})
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {fleetAircraft && fleetAircraft.map((fac) => (
              <AircraftCard key={fac.id} ac={fac} hasRental={hasRental} />
            ))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                My Aircraft ({myAircraft?.length})
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {myAircraft && myAircraft.map((mac) => (
              <AircraftCard key={mac.id} ac={mac} hasRental={hasRental} />
            ))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Other Aircraft ({usedAircraft?.length})
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {usedAircraft && usedAircraft.map((uac) => (
              <AircraftCard key={uac.id} ac={uac} hasRental={hasRental} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

AircraftList.propTypes = {
  aircraft: PropTypes.array
}
