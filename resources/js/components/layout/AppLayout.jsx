import React from 'react'
import {
  Box
} from '@chakra-ui/react'
import { Head, usePage } from '@inertiajs/react'
import { FlashMessage } from '../general/FlashMessage'
import { PageWrapper } from './PageWrapper'
import PropTypes from 'prop-types'
import { AppBar } from '../navigation/AppBar'

export default function AppLayout ({ children, title, fullSize = false }) {
  const { flash } = usePage().props
  return (
    <>
      <Head><title>{title}</title></Head>
      <AppBar />
      <Box mt={14}>
        {flash.error && <FlashMessage type="error" message={flash.error} />}
        {flash.success && <FlashMessage type="success" message={flash.success} />}
        <PageWrapper isFullSize={fullSize}>
          {children}
        </PageWrapper>
      </Box>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  fullSize: PropTypes.bool
}
