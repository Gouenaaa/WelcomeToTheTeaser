import React from 'react'
import SidebarAdmin from '../../Components/Admin/SidebarAdmin'
import {Outlet} from 'react-router-dom'
export function AdminLayout() {
  return (
    <div className='AppAdmin'>
        <SidebarAdmin />
        <Outlet />
    </div>
  )
}
