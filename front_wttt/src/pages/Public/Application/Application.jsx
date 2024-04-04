import { accountService } from "../../../sevices/account.service"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";

export function Application(props){
    const [hasAccount, setHasAccount] = useState(false);
    const [isLogged, setIsLogged] = useState(accountService.isLogged());
    const [guestId, setGuestId] = useState(0);

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmitLogin = (data) => {
        axios.post('http://127.0.0.1:8000/api/login', {
            "username" : data.email,
            "password" : data.password
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            accountService.saveToken(response.data.token);
            setIsLogged(accountService.isLogged());
        });
    }

    const onSubmitGuest = (data) => {
        axios.post('http://127.0.0.1:8000/api/guests', {
            "email" : data.email,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "phone": data.phone,
            "city": data.city,
            "studyLVL": data.studyLVL
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setGuestId(response.data.id);
            setIsLogged(true);
        });
    }

    const onSubmitApplication = (data) => {
        let postData = {};
        let userId = "";
        if(sessionStorage.getItem("token")){
            userId = jwtDecode(sessionStorage.getItem("token")).username;
        }
        if(guestId === 0){
            postData = {
                "message" : data.message,
                "date" : new Date(),
                "user" : "/api/users/"+userId,
                "advertisement" : "/api/advertisements/"+props.id,
                "guest" : null,
            }
        }
        else{
            postData = {
                "message" : data.message,
                "date" : new Date(),
                "user" : null,
                "advertisement" : "/api/advertisements/"+props.id,
                "guest" : "/api/guests/"+guestId,
            }
        }
        axios.post('http://127.0.0.1:8000/api/applications', postData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        props.setIsApplying(false);
    }

    return (
        <>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            {!isLogged ? (
                <>
                <div className="flex justify-between px-4 mb-4">
                    <button onClick={() => setHasAccount(true)} className={hasAccount ? "border-b-2 border-b-emerald-400" : "border-b-2 border-transparent hover:border-b-emerald-400"}>I have an account</button>
                    <button onClick={() => setHasAccount(false)} className={hasAccount ? "border-b-2 border-transparent hover:border-b-emerald-400" : "border-b-2 border-b-emerald-400"}>I don't have an account</button>
                </div>
                {hasAccount ? (
                    <div className="h-fit flex justify-center content-center">
                    <div className="flex flex-col content-center justify-center border-2 border-black rounded-lg h-fit py-[100px] px-5">
                        <div className="flex flex-col justify-center align-middle text-center">
                            <img src="logoWTTT_emerald.svg" className="h-14 w-auto" alt="WTTT Logo"></img>
                            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to Welcome To The Teaser</h2>
                        </div>
                        <div className="flex justify-center content-center">
                            <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-1 flex-col justify-center content-center gap-5">
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
                                <div className="flex justify-center">
                                    <button type="submit" 
                                        className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                    >Log In
                                    </button>
                                    <Link className='ml-4 w-fit px-3 py-2 text-sm font-semibold underline text-emerald-400 shadow-sm border-2 border-transparent rounded-lg hover:border-emerald-400' to={'/registration'}>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmitGuest)} className="flex flex-1 flex-col justify-center content-center gap-5">
                        <div className="flex gap-5">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">First Name:</label>
                                <input  type="text" id="firstName" 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="First name" {...register("firstName", {required: true, maxLength: 80})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Last Name:</label>
                                <input type="text" id="lastName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="Last name" {...register("lastName", {required: true, maxLength: 100})} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                                <input name="email" type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="Email" {...register("email", {required: true})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number:</label>
                                <input
                                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    type="tel" placeholder="Phone Number" {...register("phone", {required: true, pattern: /^\+?\d{1,13}/})} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">City:</label>
                                <input type="text" id="city"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="City" {...register("city", {required: true, maxLength: 100})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Study level:</label>
                                <input type="text" id="StudyLVL"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="Study level" {...register("studyLVL", {required: true, maxLength: 100})} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" 
                                className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >Continue
                            </button>
                            <Link className='ml-4 w-fit px-3 py-2 text-sm font-semibold underline text-emerald-400 shadow-sm border-2 border-transparent rounded-lg hover:border-emerald-400' to={'/registration'}>Sign Up</Link>        
                        </div>
                    </form>
                )}
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmitApplication)} className="flex flex-1 flex-col justify-center content-center gap-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Your message:</label>
                    <textarea placeholder="Write your message for the recruiter here" name="message" cols="30" rows="10" 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        {...register("message", {required: true, maxLength: 100})}></textarea>
                    <div className="flex justify-center">
                        <button type="submit" 
                            className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        >Apply
                        </button>
                    </div>
                </form>
            ) }
        </DialogContent>
        </>
    );
}