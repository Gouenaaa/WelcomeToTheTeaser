import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { accountService } from "../../../sevices/account.service";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import jwtDecode from "jwt-decode";

export function RegistrationForm() {
  let navigate = useNavigate()
  const [isOfferer, setIsOfferer] = useState(false)
  const [companies, setCompanies] = useState([])
  const [logState, setLogState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()
  const password = useRef({});
  password.current = watch("password", "");

  const handleChange = (event) => {
    if (event.target.checked) {
      setIsOfferer(true)
      getCompanies()
    } else {
      setIsOfferer(false)
    }
  }

  const getCompanies = () => {
    axios.get('http://localhost:8000/api/companies',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      setCompanies(response.data)
    })
  }

  const onSubmit = (data) => {
    setLogState(true);
    let company = !!data.company ? data.company : null
    let user = {
      "email": data.email,
      "roles": [
        `${isOfferer ? "ROLE_OFFERER" : "ROLE_SEEKER"}`,
      ],
      "password": data.password,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "birthDate": null,
      "phone": data.phone,
      "gender": parseInt(data.gender),
      "city": "",
      "studyLVL": "",
      "company": company,
      "advertisements": [],
      "applications": [],
    }
    axios.post(
      'http://127.0.0.1:8000/api/users',
      user,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      setLogState(false);
    }).finally(() => {
      axios.post(
        'http://127.0.0.1:8000/api/login',
        {
          "username": user.email,
          "password": user.password
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
          if (role === "ROLE_SEEKER") {
            navigate('/');
            window.location.reload(false)
          }
          if (role === "ROLE_OFFERER") {
            navigate('/offerer');
            window.location.reload(false)
          }
          return 0;
        })

      })
        .catch(error => console.log(error.response));
    })

  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={logState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="w-screen h-fit flex justify-center content-center ">

        <div className="flex flex-col content-center justify-center shadow-xl shadow-emerald-300 rounded-lg h-fit py-[100px] px-10 gap-10 bg-white">

          <div className="flex flex-col justify-center align-middle text-center">
            <img src="logoWTTT_emerald.svg" className="h-14 w-auto" alt="WTTT Logo"></img>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to Welcome To The Teaser</h2>
          </div>

          <div className="flex justify-center content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-center content-center gap-5">

              <div className="flex gap-5">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">First Name:</label>
                  <input type="text"
                    id="firstName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    placeholder="First name" {...register("firstName", { required: "You must specify your first name", maxLength: 80 })} />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Last Name:</label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    type="text" placeholder="Last name" {...register("lastName", { required: "You must specify your last name", maxLength: 100 })} />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                <input
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  type="email" placeholder="Email" {...register("email", { required: 'You must specify an email', pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Invalid email address format."
                  } })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              </div>
              <div w>
                <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  type="password" placeholder="Password" autoComplete="current-password"{...register("password", {
                    required: "You must specify a password", minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                    }, pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/i,
                      message: "Password must contain at least one lowercase, uppercase letter, digit, and special character(!@#$%^&*)."
                    }
                  })} />
                {errors.password && <p className="text-red-500 w-[500px] text-sm">{errors.password.message}</p>}
              </div>
              <div className="flex gap-5">
                <div className="w-1/2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Gender:</label>
                  <select  {...register("gender", { required: true })}
                    name="gender"
                    className="block px-4 py-2 bg-white w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number:</label>
                  <input
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    type="tel" placeholder="Phone Number" {...register("phone", { required: "You must specify a phone number", pattern: /^\+?\d{1,13}/ })} />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <label htmlFor="isOfferer">Are you a Job Offerer ?</label>
                <input type="checkbox" onChange={handleChange} />
              </div>

              {isOfferer &&

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Companies:</label>
                  <select  {...register("company")}
                    name="company"
                    className="block px-4 py-2 bg-white w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={""} key={0}>--Select a company--</option>
                    {companies.map((company) => <option value={`/api/companies/${company.id}`} key={company.id}>{company.name}</option>)}
                  </select>
                </div>

              }

              <div className="flex justify-center">
                <button type="submit"
                  className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >Sign Up
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

    </>
  )
}