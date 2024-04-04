import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from 'react';

export function AdvertisementForm({ advertisement, editing, setConfirmationEdit, setConfirmationCreate, setCreateOpen, setEditOpen, setCurrentAd }){
    const [editableAd, setEditableAd] = useState(advertisement)

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const advertisement = {
            "title" : data.title,
            "contractType" : data.contractType,
            "description" : data.description,
            "wages" : data.wages,
            "workingTime" : data.workingTime,
            "user" : `/api/users/${data.userId}`,
            "company" : `/api/companies/${data.company}`,
            "applications" : [],
        }
        if(!editing){
            axios.post("http://localhost:8000/api/advertisements", advertisement, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setConfirmationCreate(true)
                setCurrentAd({})
                setInterval(() => {
                    setConfirmationCreate(false);
                }, 1500)
                setCreateOpen(false)
            });
        }else{
            axios.patch(`http://localhost:8000/api/advertisements/${editableAd.id}`, advertisement, {
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                }
            })
            .then(response => {
                setConfirmationEdit(true)
                setCurrentAd({})
                setInterval(() => {
                    setConfirmationEdit(false);
                }, 1500)
                setEditOpen(false)
            });
        }
        
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <div className='flex gap-x-4'>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Title: </label>
                    <input 
                        name="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Title" defaultValue={!!editableAd.title ? editableAd.title : ""} {...register("title", {required: true})}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Contract type: </label>
                    <input 
                        name="contractType"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Contract type" defaultValue={!!editableAd.contractType ? editableAd.contractType : ""} {...register("contractType", {required: true})}
                    />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Description: </label>
                <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    name="description" id="description" cols="30" rows="10"
                    placeholder="Description" defaultValue={!!editableAd.description ? editableAd.description : ""} {...register("description", {required: true})}
                    style={{resize: "none"}}
                ></textarea>
            </div>
            <div className='flex gap-x-4 mt-4'>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Wages: </label>
                    <input 
                        name="wages"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Wages" defaultValue={!!editableAd.wages ? editableAd.wages : ""} {...register("wages", {required: true})}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Working time: </label>
                    <input 
                        name="workingTime"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Working time" defaultValue={!!editableAd.workingTime ? editableAd.workingTime : ""} {...register("workingTime", {required: true})}
                    />
                </div>
            </div>
            <div className='flex gap-x-4 mt-4'>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">User ID: </label>
                    <input 
                        name="wages"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="User ID" defaultValue={!!editableAd.user ? editableAd.user.slice(11, editableAd.user.length) : ""} {...register("userId", {required: true})}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Company ID: </label>
                    <input 
                        name="workingTime"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Company ID" defaultValue={!!editableAd.company ? editableAd.company.slice(15, editableAd.company.length) : ""} {...register("company", {required: true})}
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