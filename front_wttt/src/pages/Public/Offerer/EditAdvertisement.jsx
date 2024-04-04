import Snackbar from '@mui/material/Snackbar';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export function EditAdvertisement(props){
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        axios.patch("http://localhost:8000/api/advertisements/"+props.id, data, {
            headers:{
                'Content-Type': 'application/merge-patch+json'
            }
        })
        .then(response => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, "2000")
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <Snackbar
                anchorOrigin={{'vertical' : 'top', 'horizontal' : 'center'}}
                open={success}
                onClose={() => setSuccess(false)}
            >
                <Alert onClose={() => setSuccess(false)} severity="success">
                    Edit succeed
                </Alert>
            </Snackbar>
            <div className='flex gap-x-4'>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Title: </label>
                    <input 
                        name="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Title" {...register("title", {required: true})}
                        defaultValue={props.title}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Contract type: </label>
                    <input 
                        name="contractType"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Contract type" {...register("contractType", {required: true})}
                        defaultValue={props.contractType}
                    />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Description: </label>
                <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    name="description" id="description" cols="30" rows="10"
                    placeholder="Description" {...register("description", {required: true})}
                    defaultValue={props.description}
                    style={{resize: "none"}}
                ></textarea>
            </div>
            <div className='flex gap-x-4 mt-4'>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Wages: </label>
                    <input 
                        name="wages"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Wages" {...register("wages", {required: true})}
                        defaultValue={props.wages}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Working time: </label>
                    <input 
                        name="workingTime"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Working time" {...register("workingTime", {required: true})}
                        defaultValue={props.workingTime}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-7">
                <button type="submit" 
                    className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >Save</button>
            </div>
        </form>
    );
}