import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { capitalize } from '../../helpers/general.helper'
import PropTypes from 'prop-types'

export const FlashMessage = ({ type, message }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle>{capitalize(type)}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}
