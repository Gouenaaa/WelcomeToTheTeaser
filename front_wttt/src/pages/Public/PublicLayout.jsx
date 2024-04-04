import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../Components/Public/Navbar'

export function PublicLayout() {
  return (
    <div className='App'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
