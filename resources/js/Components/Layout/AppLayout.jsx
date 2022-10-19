import React from 'react'
import AppBar from './Navigation/AppBar'
import { Head } from '@inertiajs/inertia-react'

const AppLayout = ({ children, title, heading }) => {
  return (
    <>
      <Head><title>{title}</title></Head>
      <AppBar />
      <div className="mt-20 container mx-auto">
        <h1>{heading}</h1>
        <div className="mt-4">{children}</div>
      </div>
    </>
  )
}

export default AppLayout
