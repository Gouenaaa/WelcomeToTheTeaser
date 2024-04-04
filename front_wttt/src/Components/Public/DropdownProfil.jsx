import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { accountService } from '../../sevices/account.service'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import jwtDecode from 'jwt-decode';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function DropdownProfil() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    accountService.logout()
    setIsOpen(false)
    navigate('/')
    window.location.reload(false)
}
  return (
    <div className='flex flex-col justify-center items-center border-b-2 border-transparent'>
      <button id='greg' onClick={() => setIsOpen(true)}>
        <Avatar src='#'>
        </Avatar>
      </button>
      <Menu
        anchorEl={document.getElementById("greg")}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem sx={{display : 'flex'}} onClick={() => {
          navigate('/profil')
          window.location.reload(false)
          }}>
          <PersonIcon />
          Profil
        </MenuItem>
      {jwtDecode(sessionStorage.getItem('token')).roles.includes('ROLE_ADMIN') && 
        <MenuItem sx={{display : 'flex'}} onClick={() => {
          navigate('/admin/advertisements')
          window.location.reload(false)
        }}>
          <AdminPanelSettingsIcon />
          Admin
        </MenuItem>
        }
        <MenuItem onClick={() => logout()}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

