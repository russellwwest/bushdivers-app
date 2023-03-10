import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: '\'Open Sans\', sans-serif',
    body: '\'Montserrat\', sans-serif'
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.100', 'gray.700')(props),
        lineHeight: 'base'
      }
    })
  }
})
