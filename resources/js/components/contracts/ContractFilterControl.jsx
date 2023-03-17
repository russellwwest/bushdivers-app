import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup, Tooltip, useBoolean,
  useColorModeValue
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { IoFunnelOutline } from 'react-icons/io5'
import { distanceFilter, payloadFilter } from '../../state/contract.state'

export const ContractFilterControl = () => {
  const [filterDistance, setDistanceFilter] = useAtom(distanceFilter)
  const [filterPayload, setPayloadFilter] = useAtom(payloadFilter)
  const [flag, setFlag] = useBoolean()

  function handleUpdateDistance (filter) {
    setDistanceFilter(filter)
    if (filter !== 'all' || filterPayload !== 'all') {
      setFlag.on()
    } else {
      setFlag.off()
    }
  }

  function handleUpdatePayload (filter) {
    setPayloadFilter(filter)
    if (filter !== 'all' || filterDistance !== 'all') {
      setFlag.on()
    } else {
      setFlag.off()
    }
  }

  return (
    <Box>
      <Menu closeOnSelect={false}>
        <Tooltip hasArrow label='Filter contracts' placement="left">
        <MenuButton
          as={IconButton}
          aria-label='Contract filter'
          icon={<IoFunnelOutline />}
          variant={useColorModeValue('solid', 'outline')}
        />
        </Tooltip>
        {flag && <Box bottom={-1} right={-1} h={3} w={3} position="absolute" rounded="full" bgColor="green"></Box>}
        <MenuList minWidth='150px'>
          <MenuOptionGroup defaultValue="all" title='Distance' type='radio'>
            <MenuItemOption onClick={() => handleUpdateDistance('all')} value='all'>All Distances</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdateDistance('short')} value='short'><ChevronLeftIcon /> 60nm</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdateDistance('medium')} value='medium'>60-100nm</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdateDistance('long')} value='long'><ChevronRightIcon /> 100nm</MenuItemOption>
          </MenuOptionGroup>
          <MenuOptionGroup defaultValue="all" title='Payloads' type='radio'>
            <MenuItemOption onClick={() => handleUpdatePayload('all')} value='all'>All Payloads</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdatePayload('light')} value='light'><ChevronLeftIcon /> 1000 lbs</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdatePayload('medium')} value='medium'>1000 - 3000 lbs</MenuItemOption>
            <MenuItemOption onClick={() => handleUpdatePayload('heavy')} value='heavy'><ChevronRightIcon /> 3000 lbs</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  )
}
