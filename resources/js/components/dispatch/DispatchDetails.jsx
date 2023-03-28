import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, Box
} from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import PropTypes from 'prop-types'
import React from 'react'
import { completionState } from '../../state/dispatch.state'
import { ContractsPanel } from './ContractsPanel'
import { DispatchSummary } from './DispatchSummary'
import { SelectedAircraft } from './SelectedAircraft'

export const DispatchDetails = ({ aircraft, contracts, airport }) => {
  const completion = useAtomValue(completionState)
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="start">
          <Heading>Dispatch</Heading>
          <SelectedAircraft aircraft={aircraft} />
        </Flex>
      </CardHeader>
      <CardBody>
        <DispatchSummary aircraft={aircraft} />
        <Tabs>
          <TabList>
            <Tab><Flex alignItems="center" gap={2}><Box>Contracts</Box> {completion.isContractSelected && <CheckIcon />}</Flex></Tab>
            <Tab><Flex alignItems="center" gap={2}><Box>Planning</Box> {completion.isDestinationSet && <CheckIcon />}</Flex></Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ContractsPanel contracts={contracts} />
            </TabPanel>
            <TabPanel>
              <p>Planning</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  )
}

DispatchDetails.propTypes = {
  aircraft: PropTypes.object,
  contracts: PropTypes.array,
  airport: PropTypes.object
}
