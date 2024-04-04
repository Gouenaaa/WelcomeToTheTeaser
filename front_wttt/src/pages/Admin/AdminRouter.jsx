import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdvertisementTable, ApplicationTable, CompanyTable, GuestTable, UserTable, AdminLayout} from './index'


export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path='advertisements' element={<AdvertisementTable />} />
        <Route path='applications' element={<ApplicationTable />} />
        <Route path='companies' element={<CompanyTable />} />
        <Route path='guests' element={<GuestTable />} />
        <Route path='users' element={<UserTable />} />

      </Route>
    </Routes>
  )
}
