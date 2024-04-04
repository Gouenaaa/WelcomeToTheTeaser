import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { accountService } from "../../../sevices/account.service";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import jwtDecode from "jwt-decode";

export function LoginForm() {
    let navigate = useNavigate()
    const [error, setError] = useState();
    const [logState, setLogState] = useState(false);
    const {
        register,
        handleSubmit,
      } = useForm()
    

      const onSubmit = (data) => {
        setLogState(true)
        axios.post(
          'http://127.0.0.1:8000/api/login',
          {
            "username" : data.email,
            "password" : data.password
          },
          {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }        

        ).then(response => {
          accountService.saveToken(response.data.token)
          const roles = jwtDecode(sessionStorage.getItem("token")).roles;
          
          roles.map(role => {
            if(role === "ROLE_SEEKER"){
              navigate('/');
              window.location.reload(false)
            }
            else if(role === "ROLE_OFFERER"){
              navigate('/offerer');
              window.location.reload(false)
            }
            else if(role === "ROLE_ADMIN"){
              navigate('/admin/advertisements');
              window.location.reload(false)
            }
            return 0;
          })
        }
      )
        .catch((error) => {
          setError(error.response.data.message)
        })
        .finally(() => setLogState(false))
      }

    return (
      <div className="h-full w-full flex justify-center items-center">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={logState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="h-fit flex justify-center content-center bg-white">

        <div className="flex flex-col content-center justify-center shadow-xl shadow-emerald-300 rounded-lg h-fit py-[100px] px-10 gap-14">

          <div className="flex flex-col justify-center align-middle text-center">
            <img src="logoWTTT_emerald.svg" className="h-14 w-auto" alt="WTTT Logo"></img>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In to Welcome To The Teaser</h2>
          </div>

          <div className="flex justify-center content-center">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-center content-center gap-5">
                <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                    <input 
                    name="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    type="text" placeholder="Email" {...register("email", {required: true})} />
                </div>
                <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                    <input 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    type="password" placeholder="Password" {...register("password", {required: true})} />
                </div>
                <div className="flex flex-col justify-center items-center  w-full">
                  <p className="text-red-600">{error}</p>
                  <button type="submit" 
                            className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        disabled={logState}>Log In
                  </button>
                </div>
        </form>
          </div>
          
      </div>
    </div>

    </div>
    )
}

