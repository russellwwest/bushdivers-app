import { ArrowUpIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { IoAirplane } from 'react-icons/io5'
import { displayNumber } from '../../helpers/general.helper'
import dayjs from '../../helpers/date.helper'

export const ContractDetails = ({ contract }) => {
  return (
    <Card my={2}>
      <CardBody>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Flex direction="column">
                <Flex direction="row" alignItems="center" gap={1}>
                  <Text fontSize="xl">{contract.dep_airport_id}</Text>
                  <Icon as={IoAirplane} />
                  <Text fontSize="xl">{contract.arr_airport_id}</Text>
                </Flex>
                <Box><Heading textAlign="center" size="md">${displayNumber(contract.contract_value)}</Heading></Box>
              </Flex>
            </Box>
            <Box>
              <Flex direction="column" alignItems="center">
                <Text fontSize="xs">{contract.distance}nm</Text>
                <Box>
                  <Flex alignItems="center" gap={1}>
                    <ArrowUpIcon boxSize={3} style={{ transform: `rotate(${contract.heading}deg)` }} />
                    <Text fontSize="xs">{contract.heading}&#176;</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex direction="column">
                <Text fontSize="sm">{contract.cargo_qty}{contract.cargo_type === 1 ? ' lbs' : ''} {contract.cargo}</Text>
              </Flex>
            </Box>
            <Box>
              <Flex direction="column" gap={1} alignItems="center">
                <Text fontSize="sm">Expires In</Text>
                <Text fontSize="sm">{dayjs(contract.expires_at).toNow(true)}</Text>
              </Flex>
            </Box>
            <Box>
              <IconButton size="xs" aria-label="Accept" icon={<CheckIcon />} />
            </Box>
          </Flex>
      </CardBody>
    </Card>
  )
}

ContractDetails.propTypes = {
  contract: PropTypes.object
}
