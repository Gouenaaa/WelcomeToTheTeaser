import { useState } from "react";

export function GuestForm({ defaultGuest, handleSubmit, onSubmit, register, currentGuest, setCurrentGuest, createOpen, editOpen }) {
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                    <input type="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Email" {...register("email", { required: true, maxLength: 80 })}
                        value={currentGuest.email}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'email': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
                    <input type="text"
                        id="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Phone" {...register("phone", { required: true, maxLength: 80 })}
                        value={currentGuest.phone}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'phone': e.target.value })} />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">First Name:</label>
                    <input type="text"
                        id="firstName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="First Name" {...register("firstName", { required: true, maxLength: 80 })}
                        value={currentGuest.firstName}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'firstName': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Last Name:</label>
                    <input type="text"
                        id="lastName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Last Name" {...register("lastName", { required: true, maxLength: 80 })}
                        value={currentGuest.lastName}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'lastName': e.target.value })} />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">City:</label>
                    <input type="text"
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="City" {...register("city", { required: true, maxLength: 80 })}
                        value={currentGuest.city}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'city': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Study Level:</label>
                    <input type="text"
                        id="studyLVL"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Study Level" {...register("studyLVL", { required: true, maxLength: 80 })}
                        value={currentGuest.studyLVL}
                        onChange={(e) => setCurrentGuest({ ...currentGuest, 'studyLVL': e.target.value })} />
                </div>
            </div>
            <div className="flex gap-5 mt-2">
                <div className="w-1/2 flex justify-end items-center">
                    <button type="submit"
                        className="rounded-md border-2 border-transparent text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:border-emerald-400 hover:text-emerald-400"
                    >{createOpen ? 'Create' : 'Update'}</button>
                </div>
            </div>
        </form>
    );
}