import React from 'react'
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from '@inertiajs/react'
import PropTypes from 'prop-types'

const hqMenu = [
  { location: '/roster', label: 'Roster' },
  { location: '/fleet-aircraft', label: 'Fleet' },
  { location: '/hubs', label: 'Hubs' },
  { location: '/finances', label: 'Finances' }
]

const crewMenu = [
  { location: '/live-flights', label: 'Live Flights' },
  { location: '/loans', label: 'Loans' },
  { location: '/jumpseat', label: 'Jumpseat' },
  { location: '/', label: 'Airports' }
]

export const AppBarMenu = () => {
  return (
    <Box>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={2}>
        <Button variant="ghost"><Link href="/dispatch">Flight Dispatch</Link></Button>
        <Button variant="ghost">Contracts</Button>
        <AppBarMenuItem title="Bush Divers HQ" menuItems={hqMenu} />
        <AppBarMenuItem title="Crew Area" menuItems={crewMenu} />
      </Flex>
    </Box>
  )
}

const AppBarMenuItem = ({ menuItems, title }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            backgroundColor={useColorModeValue('white', 'gray.800')}
            isActive={isOpen}
            as={Button}
            rightIcon={
              isOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />
            }
          >
            {title}
          </MenuButton>
          <MenuList>
            {menuItems &&
              menuItems.map((item, index) => (
                <Link key={index} href={item.location}><MenuItem>{item.label}</MenuItem></Link>
              ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

AppBarMenuItem.propTypes = {
  menuItems: PropTypes.array,
  title: PropTypes.string
}
