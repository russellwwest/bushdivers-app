import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/montserrat/400.css'
import '@fontsource/open-sans/700.css'

import { theme } from './theme'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup ({ el, App, props }) {
    createRoot(el).render(
      <ChakraProvider theme={theme}>
        <App {...props} />
      </ChakraProvider>
    )
  }
})
