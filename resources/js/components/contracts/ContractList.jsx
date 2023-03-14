import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { ContractDetails } from './ContractDetails'

export const ContractList = ({ contracts }) => {
  return (
    <Box maxHeight="500px" style={{ overflowY: 'auto' }} >
      {contracts && contracts.map((contract) => (
        <ContractDetails key={contract.id} contract={contract} />
      ))}
    </Box>
  )
}

ContractList.propTypes = {
  contracts: PropTypes.array
}
