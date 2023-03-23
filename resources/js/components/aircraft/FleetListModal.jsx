import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import PropTypes from 'prop-types'
import React from 'react'
import { renderAircraftState } from '../../helpers/aircraft.helpers'
import { convertMinuteDecimalToHoursAndMinutes } from '../../helpers/date.helper'
import { AircraftCondition } from './AircraftCondition'

export const FleetListModal = ({ aircraft, isOpen, onClose, acType }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay
        backdropFilter='blur(5px)'
      />
      <ModalContent>
        <ModalHeader>{acType}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Registration</Th>
                  <Th>Current Location</Th>
                  <Th>Hub</Th>
                  <Th>Flight Time</Th>
                  <Th>Status</Th>
                  <Th>Condition</Th>
                </Tr>
              </Thead>
              <Tbody>
                {aircraft && aircraft.map((ac) => (
                  <Tr key={ac.id}>
                    <Td>{ac.registration}</Td>
                    <Td><Button variant="link"><Link href={`/airport/${ac.current_airport_id}`}>{ac.current_airport_id}</Link></Button></Td>
                    <Td><Button variant="link"><Link href={`/airport/${ac.home_location}`}>{ac.home_location}</Link></Button></Td>
                    <Td>{convertMinuteDecimalToHoursAndMinutes(ac.flight_time_mins)}</Td>
                    <Td>{renderAircraftState(ac.state)}</Td>
                    <Td><AircraftCondition condition={ac.total_condition} /></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

FleetListModal.propTypes = {
  aircraft: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  acType: PropTypes.string
}
