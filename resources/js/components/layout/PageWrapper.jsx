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
          <Box px={12} py={4}>
            <Box mt={4}>{children}</Box>
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
