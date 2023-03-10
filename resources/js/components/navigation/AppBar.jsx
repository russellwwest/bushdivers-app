import {
  Box,
  Button,
  Flex,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  useColorModeValue, Image
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { AppBarMenu } from './AppBarMenu'
import { Profile } from './Profile'

export const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  return (
    <>
      <Box
        zIndex={99}
        w="100%"
        top={0}
        h={14}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue('gray.200', 'gray.600')}
        px={4}
        position="fixed"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Box display={{ base: 'flex', lg: 'none' }}>
            <Button ref={btnRef} onClick={onOpen} variant="ghost">
              <Icon as={AiOutlineMenu} />
            </Button>
          </Box>
          <Box>
            <Image
              src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png"
              boxSize={8}
            />
          </Box>
          <Box display={{ base: 'none', lg: 'flex' }}>
            <AppBarMenu />
          </Box>
          <Profile />
        </Flex>
      </Box>
      <MobileDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  )
}

const MobileDrawer = ({ isOpen, onClose, btnRef }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="top"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue('white', 'gray.800')}>
        <DrawerCloseButton />
        <DrawerBody>
          <Box mt={8}>
            <Flex direction="column" alignItems="center">
              <Profile />
              <AppBarMenu />
            </Flex>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  btnRef: PropTypes.object
}
