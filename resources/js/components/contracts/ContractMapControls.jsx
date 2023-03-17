import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { MapStyleControl } from '../general/maps/MapStyleControl'
import { ContractFilterControl } from './ContractFilterControl'

export const ContractMapControls = () => {
  return (
    <Box position="absolute" top={5} right={5}>
      <Flex direction="column" gap={2}>
        <MapStyleControl />
        <ContractFilterControl />
      </Flex>
    </Box>
  )
}
