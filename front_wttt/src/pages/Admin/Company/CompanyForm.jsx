import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export function CompanyForm({ company, editing, setConfirmationEdit, setConfirmationCreate, setCreateOpen, setEditOpen, setCurrentCompany }) {

    const [changeDate, setChangeDate] = useState(true);

    const {
        register,
        handleSubmit,
    } = useForm();

    const creationDate = () => {
        let date;
        if (company.creationDate) {
            date = new Date(company.creationDate);
        }
        else {
            date = new Date();
        }
        if (changeDate) {
            date.setDate(date.getDate() + 1);
        }
        return date.toISOString().slice(0, 10);
    }

    const onSubmit = (data) => {

        const c = {
            'name': data.name,
            'creationDate': data.date,
            'salesRevenue': data.sales,
            'workForce': parseInt(data.workForce),
            'country': data.country,
            'city': data.city
        }

        if (editing) {
            axios.patch("http://127.0.0.1:8000/api/companies/" + company.id, c,
                {
                    headers: {
                        'Content-Type': 'application/merge-patch+json'
                    }
                }
            ).then(response => {
                setConfirmationEdit(true)
                setCurrentCompany({})
                setInterval(() => {
                    setConfirmationEdit(false)
                }, 1500)
                setEditOpen(false)
            })
        } else {
            axios.post("http://127.0.0.1:8000/api/companies", c,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                setConfirmationCreate(true)
                setCurrentCompany({})
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
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                    <input
                        name="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Name" defaultValue={!!company.name ? company.name : ""} {...register("name", { required: true })}
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Creation Date:</label>
                    <input
                        name="creationDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="date" placeholder="Advertisement ID" defaultValue={!!company.creationDate ? creationDate() : ""} {...register("date", { required: true })}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Sales Revenue:</label>
                    <input
                        name="sales"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Sales Revenue" defaultValue={!!company.salesRevenue ? company.salesRevenue : ""} {...register("sales", { required: true })}
                    />
                </div>
                <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Work Force:</label>
                    <input
                        name="workForce"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Work Force" defaultValue={!!company.workForce ? company.workForce : ""} {...register("workForce", { required: true })}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Country:</label>
                    <input
                        name="country"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="Country" defaultValue={!!company.country ? company.country : ""} {...register("country", { required: true })}
                    />
                </div>
                <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">City:</label>
                    <input
                        name="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                        type="text" placeholder="City" defaultValue={!!company.city ? company.city : ""} {...register("city", { required: true })}
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
