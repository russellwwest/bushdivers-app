import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  Image,
  Text,
  useDisclosure,
  useConst,
  CardBody,
  CardHeader,
  Card,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react'
import { router, Head, usePage, Link } from '@inertiajs/react'
import PropTypes from 'prop-types'
import PrivacyContent from '../components/general/PrivacyContent'
import { capitalize } from '../helpers/general.helper'
import { PageWrapper } from '../components/layout/PageWrapper'

const Home = ({ stats }) => {
  const { auth } = usePage().props
  const date = useConst(() => new Date().getFullYear())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedInfo, setSelectedInfo] = useState(null)

  useEffect(() => {
    if (auth?.user) router.get('/dashboard')
  }, [])

  function showDetail (info) {
    setSelectedInfo(info)
    onOpen()
  }

  return (
    <>
      <Head title="Bush Divers Virtual Airline" />
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
        <Flex py={2} justifyContent="space-between" alignItems="center">
          <Box>
            <Flex alignItems="center" gap={4}>
              <Image
                src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png"
                boxSize={8}
              />
              <Heading as="h1" size="md">
                Bush Divers
              </Heading>
            </Flex>
          </Box>
          <Box>
            <Flex alignItems="center" gap={4}>
              <Link href="/login">
                <Button colorScheme="gray">Crew Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box mt={12}>
        <PageWrapper isFullSize={true}>
          <Box p={10} bgColor="white" w="100%">
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png"
                boxSize={28}
              />
              <Heading mt={4}>Welcome to Bush Divers Virtual Airline</Heading>
              <Heading my={4} size="md">
                Virtual Bush Flying based in Papua New Guinea and around the
                world
              </Heading>
              <Link href="/register">
                <Button colorScheme="orange">Get Started</Button>
              </Link>
            </Flex>
          </Box>
          <Box py={4} px={12}>
            <Flex justifyContent="center" gap={4}>
              <Card w="200px">
                <CardHeader>
                  <Heading size='lg'>{stats?.flights}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Total Flights</Text>
                </CardBody>
              </Card>
              <Card w="200px">
                <CardHeader>
                  <Heading size='lg'>{stats?.pilots}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Total Pilots</Text>
                </CardBody>
              </Card>
              <Card w="200px">
                <CardHeader>
                  <Heading size='lg'>{stats?.hubs}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Hubs</Text>
                </CardBody>
              </Card>
            </Flex>
          </Box>
          <Box p={6} w="100%" bgGradient="linear(to-r, orange.500, orange.300)">
            <Box
              width={{ base: '100%', lg: '50%' }}
              p={6}
              borderRadius={5}
              backgroundColor="gray.700"
              opacity="80%"
              color="gray.50"
            >
              <Heading size="xl" color="gray.50">Our Story</Heading>
              <Text mt={5} fontSize="xl">
                We are a community of pilots focused on one thing, bush flying!
                Disregarding the ho-hum of big jets and long airfields we opt
                for the dangers of low and slow flying through rugged terrain
                and ever-changing weather landing at the most remote and
                inhospitable airfields in aviation history.
              </Text>
              <Text mt={5} fontSize="xl">
                Ponder this, will you? The weather is closing in. The intended
                landing strip is at 5364ft above sea level and clings to the
                side of a jungle covered mountain. Perhaps 1000ft long, this
                runway is the only connection the local people have with the
                outside world. You think you can see the end of the grass strip
                protruding from a bank of cloud. Do you commit? This is the
                daily decision making of a Bush Diver, landing our aircraft on
                dangerous and remote strips, surrounded by hazardous terrain and
                often with rapidly changing weather conditions and visibility.
                Bush Divers is a bush flying focused virtual airline with a
                strong community of fellow bush flying enthusiasts. To find out
                more about Bush Divers, head to our main
              </Text>
            </Box>
          </Box>
        </PageWrapper>
      </Box>
      <Box>
        <Flex p={4} alignItems="center" justifyContent="space-between">
          <Box>&copy; Bush Divers {date}</Box>
          <Box>
            <Flex alignItems="center" justifyContent="space-between" gap={4}>
              <Button onClick={() => showDetail('privacy')} colorScheme='orange' variant='link'>
                Privacy
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{capitalize(selectedInfo)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInfo && selectedInfo === 'privacy' && <PrivacyContent />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

Home.propTypes = {
  stats: PropTypes.object
}

export default Home
