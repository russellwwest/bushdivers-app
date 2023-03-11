import { Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

export const StatCard = ({ title, value, helper }) => {
  return (
    <Card>
      <CardBody>
        <Stat>
          <StatLabel>{title}</StatLabel>
          <StatNumber>{value}</StatNumber>
          {helper && <StatHelpText>{helper}</StatHelpText>}
        </Stat>
      </CardBody>
    </Card>
  )
}

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.node,
  helper: PropTypes.string
}
