import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'

const Dashboard = () => {
  return (
    <div>
      Test
    </div>
  )
}

Dashboard.layout = page => <AppLayout children={page} heading="My Crew Page" title="Crew Page" />

export default Dashboard
