import { Box } from '@chakra-ui/react'
import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { HeadingSection } from '../components/layout/HeadingSection'

const Dashboard = () => {
  return (
    <Box>
      <HeadingSection heading="Dashboard" />
    </Box>
  )
}

Dashboard.layout = page => <AppLayout title="Crew Dashboard">{page}</AppLayout>
export default Dashboard
