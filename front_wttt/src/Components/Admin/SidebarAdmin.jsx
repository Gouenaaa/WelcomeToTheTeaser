import React from 'react'
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink, useNavigate } from 'react-router-dom'
import { accountService } from '../../sevices/account.service'

export default function SidebarAdmin() {
  const navigate = useNavigate()

  const logout = () => {
    accountService.logout()
    navigate('/')
    window.location.reload(false)
  }

  return (
    <div className='h-full w-[320px] bg-white shadow-2xl flex flex-col items-center justify-between py-5 gap-20'>
      <img alt='logo' src='/logoWTTT_emerald.svg' className='w-10/12 mt-3' />
      <ul className='list-none flex flex-col gap-6'>
        <NavLink className={({ isActive }) =>
          isActive ?
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 scale-105 translate-x-2 bg-emerald-400 text-white transition-all ease-out'
            :
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 hover:translate-x-2 hover:bg-emerald-400 hover:text-white transition-all ease-out'

        } to={'/admin/advertisements'}><AssignmentIcon /> Advertisements</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ?
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 scale-105 translate-x-2 bg-emerald-400 text-white transition-all ease-out'
            :
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 hover:translate-x-2 hover:bg-emerald-400 hover:text-white transition-all ease-out'

        } to={'/admin/applications'}><AppRegistrationIcon /> Applications</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ?
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 scale-105 translate-x-2 bg-emerald-400 text-white transition-all ease-out'
            :
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 hover:translate-x-2 hover:bg-emerald-400 hover:text-white transition-all ease-out'

        } to={'/admin/companies'}><BusinessIcon /> Companies</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ?
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 scale-105 translate-x-2 bg-emerald-400 text-white transition-all ease-out'
            :
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 hover:translate-x-2 hover:bg-emerald-400 hover:text-white transition-all ease-out'

        } to={'/admin/guests'}><PersonAddIcon /> Guests</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ?
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 scale-105 translate-x-2 bg-emerald-400 text-white transition-all ease-out'
            :
            'flex items-center gap-5 text-xl border-[1px] border-gray-300 shadow-sm rounded-full py-3 px-5 hover:translate-x-2 hover:bg-emerald-400 hover:text-white transition-all ease-out'

        } to={'/admin/users'}><PeopleIcon /> Users</NavLink>
      </ul>
      <div className='flex flex-col gap-4'>
        <NavLink className="border-[2px] border-emerald-500 p-2 text-emerald-500 hover:text-white hover:bg-emerald-500 transition ease-in" to={'/'}>
          Go to Web Site
        </NavLink>
        <button className='underline text-emerald-500' onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  )
}
