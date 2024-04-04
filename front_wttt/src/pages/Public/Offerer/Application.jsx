import { useEffect, useState } from "react";
import axios from "axios";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlaceIcon from '@mui/icons-material/Place';

export function Application({ applicationId }){
    const [application, setApplication] = useState({});
    const [user, setUser] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000"+applicationId, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => setApplication(response.data));
    }, []);

    useEffect(() => {
        let path = "";
        if(application?.user){
            path = application.user;
        }
        else if(application?.guest){
            path = application.guest;
        }
        if(application?.user || application?.guest){
            axios.get("http://127.0.0.1:8000"+path, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => setUser(response.data));
        }
    }, [application])

    return (
        <div className="shadow-lg bg-white m-4 p-4">
            <div className="flex justify-between">
                <p className="flex"><AccountBoxIcon />{user.firstName} {user.lastName}: <span className="underline ml-2">{user.studyLVL}</span></p>
                <p className="bg-gray-200 p-1">{new Date(application.date).toLocaleDateString()}</p>
            </div>
            <p className="ml-4 mt-2 border[1px]">{application.message}</p>
            <div className="flex justify-between">
                <div className="flex items-end">
                    <PlaceIcon />
                    <p>{user.city}</p>
                </div>
                <button id={application.id} onClick={() => setMenuOpen(true)}
                    className="btn self-end bg-emerald-400 text-white hover:bg-white border-2 border-emerald-400 hover:text-emerald-400 w-fit py-2 px-4 mt-1">Contact</button>
                <Menu
                    anchorEl={document.getElementById(application.id)}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                >
                    <MenuItem>{user.email}</MenuItem>
                    <MenuItem>{user.phone}</MenuItem>
                </Menu>
            </div>
        </div>
    )
}