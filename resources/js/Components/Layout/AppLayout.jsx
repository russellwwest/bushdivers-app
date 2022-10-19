import React from 'react'
import AppBar from './Navigation/AppBar'
import { Head } from '@inertiajs/inertia-react'

const AppLayout = ({ children, title }) => {
  return (
    <>
      <Head><title>{title}</title></Head>
      <AppBar />
      <div className="mt-20 container mx-auto">{children}</div>
    </>
  )
}

export default AppLayout
