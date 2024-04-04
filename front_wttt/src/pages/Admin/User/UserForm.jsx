import { useState } from "react";

export function UserForm({ defaultUser, handleSubmit, onSubmit, register, currentUser, setCurrentUser, createOpen, editOpen }) {
    const roles = ["ROLE_SEEKER", "ROLE_OFFERER", "ROLE_ADMIN"];
    const genders = [{ gender: 0, value: "Male" }, { gender: 1, value: "Female" }, { gender: 2, value: "Other" }];
    const [changeDate, setChangeDate] = useState(true);
    const birthDate = () => {
        let date;
        if (currentUser.birthDate) {
            date = new Date(currentUser.birthDate);
        }
        else {
            date = new Date();
        }
        if (changeDate) {
            date.setDate(date.getDate() + 1);
        }
        return date.toISOString().slice(0, 10);
    }

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
                        value={currentUser.email}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'email': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Role:</label>
                    <select  {...register("roles", { required: true })}
                        name="roles"
                        className="block px-4 py-2 bg-white w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={currentUser.roles[0]}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'roles': [e.target.value, 'ROLE_USER'] })}
                    >
                        {roles.map(role => {
                            return (
                                <option key={role} value={role}>{role}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">First Name:</label>
                    <input type="text"
                        id="firstName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="First Name" {...register("firstName", { required: true, maxLength: 80 })}
                        value={currentUser.firstName}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'firstName': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Last Name:</label>
                    <input type="text"
                        id="lastName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Last Name" {...register("lastName", { required: true, maxLength: 80 })}
                        value={currentUser.lastName}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'lastName': e.target.value })} />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Birth Date:</label>
                    <input type="date"
                        id="birthDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        {...register("birthDate", { required: true, maxLength: 80 })}
                        value={birthDate()}
                        onChange={(e) => { setCurrentUser({ ...currentUser, 'birthDate': e.target.value }); setChangeDate(false) }} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Gender:</label>
                    <select  {...register("gender", { required: true })}
                        name="gender"
                        className="block px-4 py-2 bg-white w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={currentUser.gender}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'gender': e.target.value })}
                    >
                        {genders.map(gender => {
                            return (
                                <option key={gender.gender} value={gender.gender}>{gender.value}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">City:</label>
                    <input type="text"
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="City" {...register("city", { required: true, maxLength: 80 })}
                        value={currentUser.city}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'city': e.target.value })} />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
                    <input type="text"
                        id="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Phone" {...register("phone", { required: true, maxLength: 80 })}
                        value={currentUser.phone}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'phone': e.target.value })} />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Study Level:</label>
                    <input type="text"
                        id="studyLVL"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Study Level" {...register("studyLVL", { required: true, maxLength: 80 })}
                        value={currentUser.studyLVL}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'studyLVL': e.target.value })} />
                </div>
                {createOpen && (
                    <div className="w-1/2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        <input type="password"
                            id="password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                            placeholder="Password" {...register("password", { required: true, maxLength: 80 })}
                            value={currentUser.password}
                            onChange={(e) => setCurrentUser({ ...currentUser, 'password': e.target.value })} />
                    </div>
                )}
            </div>
            <div className="flex gap-5 mt-2">
                <div className="w-1/2" hidden={currentUser.roles[0] !== "ROLE_OFFERER" && 'hidden'}>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Company:</label>
                    <input type="text"
                        id="company"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 sm:text-sm sm:leading-6 px-3"
                        placeholder="Company" {...register("company", { maxLength: 80 })}
                        value={!!currentUser.company ? currentUser.company : ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, 'company': e.target.value })}
                        disabled={currentUser.roles[0] !== "ROLE_OFFERER" && 'disabled'} />
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <button type="submit"
                        className="rounded-md border-2 border-transparent text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:border-emerald-400 hover:text-emerald-400"
                    >{createOpen ? 'Create' : 'Update'}</button>
                </div>
            </div>
        </form>
    );
}