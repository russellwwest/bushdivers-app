import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
export const PageWrapper = ({
  isFullSize = false,
  children
}) => {
  return (
    <>
      {!isFullSize
        ? (
          <Box mx={{ sm: 4, lg: 36 }} mt={4} mb={2}>
              {children}
          </Box>
          )
        : (
          <Box>{children}</Box>
          )}
    </>
  )
}

PageWrapper.propTypes = {
  isFullSize: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
