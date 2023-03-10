import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Dashboard = () => {
  return (
    <div>
      Dashboard
    </div>
  )
}

Dashboard.layout = page => <AppLayout title="Crew Dashboard" fullSize>{page}</AppLayout>
export default Dashboard
