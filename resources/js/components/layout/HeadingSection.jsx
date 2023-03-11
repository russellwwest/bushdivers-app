import PropTypes from 'prop-types'
import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

export const HeadingSection = ({ heading, children }) => {
  return (
    <Flex mb={6} justifyContent="space-between" alignItems="center">
      <Heading>{heading}</Heading>
      {children}
    </Flex>
  )
}

HeadingSection.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element
}
