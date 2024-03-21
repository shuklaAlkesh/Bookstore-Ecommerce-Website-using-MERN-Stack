import React from 'react'
import { Outlet } from 'react-router-dom'

import Side_bar from './Side_bar'



const DashboardLayout = () => {
  return (
    <div className='flex gap-4 flex-col md:flex-row '>
        <Side_bar/>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout