import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'

const Dashboard = () => {
  return (
    <div>
      Dashboard
    </div>
  )
}

Dashboard.layout = page => <AppLayout children={page} title="Crew Page" />

export default Dashboard
