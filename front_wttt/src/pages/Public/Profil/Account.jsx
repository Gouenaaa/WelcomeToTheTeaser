import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import GenderSelectOptions from './GenderSelectOption';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Snackbar } from '@mui/material';

export default function Account(props) {
    const user = props.user
    const { register, handleSubmit } = useForm();
    const [date, setDate] = useState("")
    const [isError, setError] = useState("")
    const [isValid, setValid] = useState(false)
    const onSubmit = data => {
        data.advertisements = []
        data.applications = []
        data.gender = parseInt(data.gender)
        axios.patch('http://localhost:8000/api/users/'+user.id,
            data,
            {
                headers:{
                    'Content-Type': 'application/merge-patch+json'
                }
            }
        ).then(response => {
            setValid(true)
        })
        .catch(response => {
            setError(response.response.data['hydra:description'])
        })
    };

    useEffect(() => {
        if(user.birthDate){
            setDate(new Date(user.birthDate).toISOString().slice(0, 10))
        }
    }, [user.birthDate])


    
    return (
        <>
        {isError !== "" &&
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {isError}
            </Alert>
        }
        {isValid &&
            <Snackbar open={isValid} autoHideDuration={6000} onClose={() => setValid(false)} >
                <Alert onClose={() => setValid(false)} severity="success" sx={{ width: '100%'   }} className='bg-green-500'>
                    Data updated with success
                </Alert>
            </Snackbar>
        }
           
            <div id={'title'} className='mt-10 border-[1px] border-b-0 bg-white w-4/6 text-center p-2'>
                <p className='underline text-2xl '>My Account</p>
            </div>
            <div className='bg-white border-[1px] border-t-0 w-4/6 h-full p-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 justify-between'>
                <div className='w-full flex justify-between gap-2'>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>First Name:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="text" placeholder="First Name" defaultValue={!!user.firstName ? user.firstName : ""} {...register("firstName", {required: true})} />
                    </div>
                    <div className='flex flex-col gap-2 mb-2  w-2/5'>
                        <label>Last Name:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="text" placeholder="Last Name" defaultValue={!!user.lastName ? user.lastName : ""} {...register("lastName", {required: true})} />
                    </div>
                </div>
                <div className='w-full flex justify-between gap-2'>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>Email:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="email" placeholder="Email" defaultValue={!!user.email ? user.email : ""}  {...register("email", {required: true})} />
                    </div>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>Phone Number:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="tel" placeholder="Phone Number" defaultValue={!!user.phone ? user.phone : ""} {...register("phone", {required: true})} />
                    </div>
                </div>
                <div className='w-full flex justify-between gap-2'>

                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>Birth Date:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="date" placeholder="Birth Date" defaultValue={!!date ? date : "" } {...register("birthDate", {required: true})} />
                    </div>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Gender:</label>
                        <select  {...register("gender", {required: true})}
                            name="gender"
                            className="block w-full bg-white py-2 px-5 border-[1px] border-gray-300"
                        >
                            <GenderSelectOptions order={user.gender} />
                        </select>
                    </div>
                </div>

                <div className='w-full flex justify-between gap-2'>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>City:</label>
                        <input className={'block py-2 px-5 border-[1px] border-gray-300'} type="text" placeholder="City" defaultValue={!!user.city ? user.city : ""} {...register("city", {required: true})} />
                    </div>
                    <div className='flex flex-col gap-2 mb-2 w-2/5'>
                        <label>Study Level:</label>
                        <input  className={'block py-2 px-5 border-[1px] border-gray-300'}type="text" placeholder="Study Level" defaultValue={!!user.studyLVL ? user.studyLVL : ""} {...register("studyLVL", {required: true})} />
                    </div>
                </div>                
                <input type="submit" value={"Save"} className='btn self-center bg-emerald-400 text-white hover:bg-white border-2 border-emerald-400 hover:text-emerald-400 w-fit py-2 px-4 mt-1'/>
            </form>
            </div>
        </>
    )
}
