import React from 'react'
import {
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Button
} from '@chakra-ui/react'
import { capitalize } from '../../helpers/general.helper'
import PropTypes from 'prop-types'

export const FlashMessage = ({ type, message }) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible
    ? (
      <Alert status={type}>
        <AlertIcon />
        <Box>
          <AlertTitle>{capitalize(type)}!</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='relative'
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
      )
    : (
      <Button onClick={onOpen}>Show Alert</Button>
      )
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}
