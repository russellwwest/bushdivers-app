import React, { useState } from 'react'
import { Head, Link, usePage, router } from '@inertiajs/react'
import {
  Box,
  Flex,
  Image,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button, Checkbox
} from '@chakra-ui/react'

const Login = () => {
  const { errors } = usePage().props
  const { flash } = usePage().props
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false
  })

  function handleChange (e) {
    const key = e.target.id
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  function handleSubmit (e) {
    e.preventDefault()
    router.post('/login', values)
  }

  return (
    <Box h="100vh" w="100%" bgGradient="linear(to-r, orange.500, orange.300)">
      <Head title="Login" />
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Box mt="24">
          <Image
            src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png"
            boxSize={28}
          />
        </Box>
        <Box mt={8} mx={2} w={{ base: '95%', md: '50%', lg: '25%' }}>
          <Card>
            <CardBody>
              <Heading my={2} fontSize="2xl">
                Login
              </Heading>
              {flash.error && <p className="text-red-500">{flash.error}</p>}
              {flash.success && <p className="text-green-500">{flash.success}</p>}
              <form onSubmit={handleSubmit}>
                <FormControl mt={2} isInvalid={errors?.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id="email"
                    placeholder="john@doe.com"
                    type="email"
                    focusBorderColor="orange.400"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.email}</FormErrorMessage>
                </FormControl>
                <FormControl mt={2} isInvalid={errors?.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    focusBorderColor="orange.400"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.password}</FormErrorMessage>
                  <Box color="orange.500" mt={2} fontSize="sm"><Link href="/password">Forgot password?</Link></Box>
                </FormControl>
                <Checkbox value={values.remember} onChange={handleChange} mt={4} colorScheme="orange">Remember me</Checkbox>
                <Button colorScheme="orange" mt={4} w="100%" type="submit">
                  Login
                </Button>
              </form>
              <Box color="orange.500" mt={4}><Link href="/register">New to Bush Divers?</Link></Box>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  )
}

export default Login
