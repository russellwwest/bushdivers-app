import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Icon,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuGroup,
  Text,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link, usePage } from '@inertiajs/react'
import { displayCash } from '../../helpers/general.helper'

export const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { auth } = usePage().props

  return (
    <Box>
      <Flex gap={2} alignItems="center">
        <Box>
          <Flex
            gap={{ base: 0, sm: 2 }}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            <Button variant="ghost" onClick={toggleColorMode}>
              <Icon as={colorMode === 'light' ? FaMoon : FaSun} />
            </Button>
            <Box color="orange.500"><Link href={`/airports/${auth.user?.current_airport_id}`}>{auth.user?.current_airport_id}</Link></Box>
            <Box>${displayCash(auth.user?.cash)}</Box>
          </Flex>
        </Box>
        <Box ml={2}>
          <Menu>
            <MenuButton
              p={2}
              _hover={{
                backgroundColor: useColorModeValue('gray.50', 'gray.700')
              }}
            >
              <Flex direction="row" alignItems="center" gap={2}>
                <Avatar size="sm" name={auth.user.name} src="" />
                <Flex direction="column" alignItems="start">
                  <Text fontSize="sm">{auth.user?.pilot_id}</Text>
                  <Text fontSize="xs">{auth.user?.rank.name}</Text>
                </Flex>
              </Flex>
            </MenuButton>
            <MenuList>
              <Link href="/profile"><MenuItem>Profile</MenuItem></Link>
              <Link href="/logbook"><MenuItem>Logbook</MenuItem></Link>
              <Link href="/my-aircraft"><MenuItem>My Aircraft</MenuItem></Link>
              <Link href="/my-finances"><MenuItem>My Finances</MenuItem></Link>
              <MenuDivider />
              <a href="https://storage.googleapis.com/bush-divers-platform.appspot.com/BushTracker.zip"><MenuItem>Bush Tracker</MenuItem></a>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <Link href="/logout"><MenuItem>Logout</MenuItem></Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  )
}
