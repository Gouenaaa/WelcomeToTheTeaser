import { useForm } from "react-hook-form";
import axios from "axios";


export function ApplicationForm({ application, editing, setConfirmationEdit, setConfirmationCreate, setCreateOpen, setEditOpen, setCurrentApp }) {

    const {
        register,
        handleSubmit,
    } = useForm();


    const onSubmit = (data) => {

        const app = {
            'user': parseInt(data.userID)!== 0 ? `/api/users/${data.userID}` : null,
            'advertisement': '/api/advertisements/' +data.adID,
            'message': data.message,
            'guest': parseInt(data.guestID) !== 0 ? `/api/guests/${data.guestID}` : null,
            'date': new Date()
        }

        if (editing) {
            axios.patch("http://127.0.0.1:8000/api/applications/"+application.id, app,
                {
                    headers: {
                        'Content-Type': 'application/merge-patch+json'
                    }
                }
            ).then(response => {
                setConfirmationEdit(true)
                setCurrentApp({})
                setInterval(() => {
                    setConfirmationEdit(false)
                }, 1500)
                setEditOpen(false)
            })
        } else {
            axios.post("http://127.0.0.1:8000/api/applications", app,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                setConfirmationCreate(true)
                setCurrentApp({})
                setInterval(() => {
                    setConfirmationCreate(false)
                }, 1500)
                setCreateOpen(false)
            }).catch(error => console.log(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">User ID: (0 if you add with a guest)</label>
                    <input
                        name="userID"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="number" placeholder="User ID" defaultValue={!!application.user ? parseInt(application.user.slice(11, application.user.length)) : 0} {...register("userID", { required: true })}
                    />
                </div>
                <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Advertisement ID: </label>
                    <input
                        name="adID"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="number" placeholder="Advertisement ID" defaultValue={!!application.advertisement ? parseInt(application.advertisement.slice(20, application.advertisement.length)) : ""} {...register("adID", { required: true })}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Message: </label>
                    <textarea
                        name="massage"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        placeholder="Message" defaultValue={!!application.message ? application.message : ""} {...register("message", { required: true })}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Guest ID: (0 if you add with an user)</label>
                    <input
                        name="guestID"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="number" placeholder="Guest ID" defaultValue={!!application.guest ? parseInt(application.guest.slice(12, application.guest.length)) : 0} {...register("guestID", { required: true })}
                    />
                </div>  
            </div>
            <div className="flex justify-center mt-7">
                <button type="submit"
                    className="rounded-md  w-fit text bg-emerald-400  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >Save</button>
            </div>
        </form>
    )
}
