import { Box, SimpleGrid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { AircraftType } from '../../components/aircraft/AircraftType'
import AppLayout from '../../components/layout/AppLayout'
import { HeadingSection } from '../../components/layout/HeadingSection'

const Fleet = ({ aircraftTypes }) => {
  return (
    <Box>
      <HeadingSection heading="Fleet" />
      <Box>
        <SimpleGrid columns={4} gap={4}>
          {aircraftTypes && aircraftTypes.map((acType) => (
            <AircraftType key={acType.id} acType={acType} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

Fleet.layout = page => <AppLayout title="Fleet">{page}</AppLayout>
export default Fleet

Fleet.propTypes = {
  aircraftTypes: PropTypes.array
}
