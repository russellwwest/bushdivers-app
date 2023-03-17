import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup, Tooltip,
  useColorModeValue
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { IoLayersOutline } from 'react-icons/io5'
import { mapStyleAtom } from '../../../state/general.state'

export const MapStyleControl = () => {
  const [mapStyle, setMapStyle] = useAtom(mapStyleAtom)
  function updateMapStyle (style) {
    setMapStyle(style)
  }

  return (
    <Box>
    <Menu>
      <Tooltip hasArrow label='Change map style' placement="left">
      <MenuButton
        as={IconButton}
        aria-label='Map style'
        icon={<IoLayersOutline />}
        variant={useColorModeValue('solid', 'outline')}
      />
      </Tooltip>
      <MenuList minWidth='150px'>
        <MenuOptionGroup defaultValue={mapStyle} title='Map Style' type='radio'>
          <MenuItemOption onClick={() => updateMapStyle('theme')} value='theme'>Theme</MenuItemOption>
          <MenuItemOption onClick={() => updateMapStyle('satellite')} value='satellite'>Satelitte</MenuItemOption>
          <MenuItemOption onClick={() => updateMapStyle('terrain')} value='terrain'>Terrain</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
    </Box>
  )
}
