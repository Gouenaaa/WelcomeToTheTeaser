import React, { useEffect, useState} from 'react';
import Account from './Account';
import jwtDecode from "jwt-decode";
import axios from 'axios';

export function Profil () {
    
    const [isAccount, setIsAcount] = useState(true)
    const [user, setUser] = useState(jwtDecode(sessionStorage.getItem('token')))

    useEffect(()=> {
        if(!!user.username)
        axios.get(`http://localhost:8000/api/users/${user.username}`,
        {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
        ).then((response) => setUser(response.data))
    }, [user])
 
    return (
        <div className='w-full h-full display flex flex-col'>
            <div className='w-full h-[5vh] flex justify-center items-end gap-4 border-b-2 border-gray-300'>
                <span className={isAccount ? 
                "mb-2 border-b-[2px] border-emerald-500" 
                : 
                "mb-1 py-1 after:block after:border-b-[2px] after:border-emerald-500 after:ease-liner after:duration-300 after:scale-x-0 after:hover:scale-x-100 origin-center"}
                onClick={() => {
                    setIsAcount(true)
                }}>Account</span>
                
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                {isAccount && <Account user={user} />}
            </div>
        </div>
    );
};