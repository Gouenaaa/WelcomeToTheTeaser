import React from 'react';
import { NavLink } from 'react-router-dom';
import { accountService } from '../../sevices/account.service';
import jwtDecode from "jwt-decode";
import DropdownProfil from './DropdownProfil';

export function Navbar(){
    let user;
    if(accountService.isLogged()){
        user = jwtDecode(sessionStorage.getItem('token'))
    }
 

    return (
        <nav className="flex bg-emerald-400 text-white h-16 absolute w-full top-0 shadow-md">
            <div className='w-1/6'></div>
            <div className='flex w-1/3'>
                <NavLink className="flex items-center p-3" to={accountService.isLogged() ? user.roles.includes('ROLE_OFFERER') ? '/offerer' : '/' : '/'}>
                        <img className='w-full h-full' src="./logoWTTT.svg" alt="greg" />
                </NavLink>
            </div>
            <div className='flex justify-end w-1/3'>
                <NavLink className={({ isActive }) => 
                        isActive ? 'flex flex-col content-center justify-center border-b-2 border-b-emerald-700 px-2' : 'flex flex-col content-center justify-center border-b-2 border-transparent px-2'
                    } to={accountService.isLogged() ? user.roles.includes('ROLE_OFFERER') ? '/offerer' : '/' : '/'}>
                        Home
                </NavLink>
                {user ? 
                <>
                    <DropdownProfil />
                </> 
                : 
                <>
                    <NavLink className={({ isActive }) => 
                        isActive ? 'flex flex-col content-center justify-center border-b-2 border-b-emerald-700 px-2' : 'flex flex-col content-center justify-center border-b-2 border-transparent hover:border-b-emerald-700 px-2'
                    } to="/login">Log In</NavLink>
                    <NavLink className={({ isActive }) => 
                        isActive ? 'flex flex-col content-center justify-center border-b-2 border-b-emerald-700 px-2' : 'flex flex-col content-center justify-center border-b-2 border-transparent hover:border-b-emerald-700 px-2'
                    } to={'/registration'}>Sign Up</NavLink>
                </>
                }
            </div>
            <div className='w-1/6'></div>
        </nav>
    );
}