import { ArrowUpIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, Flex, Heading, Icon, IconButton, Text, useToast } from '@chakra-ui/react'
import { router, usePage } from '@inertiajs/react'
import axios from 'axios'
import { useAtom } from 'jotai'
import PropTypes from 'prop-types'
import React from 'react'
import { IoAirplane } from 'react-icons/io5'
import { displayNumber } from '../../helpers/general.helper'
import dayjs from '../../helpers/date.helper'
import { selectedContractAtom } from '../../state/contract.state'

export const ContractDetails = ({ contract }) => {
  const [selectedContract, setSelectedContract] = useAtom(selectedContractAtom)
  const { auth } = usePage().props
  const toast = useToast()

  function updateSelectedContract (contract) {
    setSelectedContract(contract)
  }

  async function acceptContract (e, contract) {
    e.stopPropagation()
    try {
      const res = await axios.post('/api/contracts/accept', { contract_id: contract.id, user_id: auth.user.id, is_acceptance: true })
      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Contract accepted successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
        router.visit(`/airport/${contract.dep_airport_id}`, { only: ['contracts'] })
      }
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  return (
    <Card onClick={() => updateSelectedContract(contract)} my={2} bgColor={selectedContract && selectedContract.id === contract.id ? 'orange.400' : ''} cursor="pointer">
      <CardBody>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Flex direction="column">
                <Flex direction="row" alignItems="center" gap={1}>
                  <Text fontSize="md">{contract.dep_airport_id}</Text>
                  <Icon as={IoAirplane} />
                  <Text fontSize="md">{contract.arr_airport_id}</Text>
                </Flex>
                <Box><Heading textAlign="center" size="sm">${displayNumber(contract.contract_value)}</Heading></Box>
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
                <Text fontSize="xs">{displayNumber(contract.cargo_qty, false)}{contract.cargo_type === 1 ? ' lbs' : ''} {contract.cargo}</Text>
              </Flex>
            </Box>
            <Box>
              <Flex direction="column" gap={1} alignItems="center">
                <Text fontSize="xs">Expires In</Text>
                <Text fontSize="xs">{dayjs(contract.expires_at).toNow(true)}</Text>
              </Flex>
            </Box>
            <Box>
              <IconButton onClick={(e) => acceptContract(e, contract)} size="xs" aria-label="Accept" icon={<CheckIcon />} />
            </Box>
          </Flex>
      </CardBody>
    </Card>
  )
}

ContractDetails.propTypes = {
  contract: PropTypes.object
}
