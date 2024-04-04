import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AdvertisementForm } from './AdvertisementForm';

export function AdvertisementTable() {

    const [lastPage, setLastPage] = useState(0);
    const [page, setPage] = useState(1);

    const [currentAd, setCurrentAd] = useState({});

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [confirmationDelete, setConfirmationDelete] = useState(false);

    const [createOpen, setCreateOpen] = useState(false)
    const [confirmationCreate, setConfirmationCreate] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [confirmationEdit, setConfirmationEdit] = useState(false);

    const [advertisements, setAdvertisement] = useState([])
    const deleteAdvertisement = () => {
        axios.delete(`http://127.0.0.1:8000/api/advertisements/${currentAd.id}`)
    }

    axios.get('http://127.0.0.1:8000/api/advertisements', {
        headers: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
        }
    })
        .then((response => {
            setLastPage(Math.ceil(response.data['hydra:totalItems'] / 13));
        }));

    useEffect(() => {
        axios.get(`http://localhost:8000/api/advertisements?itemsPerPage=13&page=${page}`,
            {
                headers:
                {
                    'Accept': 'application/json'
                }
            }
        ).then(response => setAdvertisement(response.data))
    }, [page, currentAd])


    return (
        <div className='h-full flex-grow flex flex-col items-center'>
            {/* DIALOG DELETE */}
            <Dialog
                id='dialogDelete'
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            >
                <DialogTitle>
                    Are you sure you want to delete advertisement {currentAd.id} ?
                </DialogTitle>
                <DialogContent className='flex justify-around'>
                    <button
                        className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500'
                        onClick={() => {
                            deleteAdvertisement();
                            setDeleteOpen(false);
                            setConfirmationDelete(true);
                            setCurrentAd({});
                            setInterval(() => {
                                setConfirmationDelete(false);
                            }, 1500)
                        }}
                    >Yes</button>
                    <button
                        className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-emerald-400 hover:border-emerald-400 hover:bg-white hover:text-emerald-400'
                        onClick={() => {
                            setCurrentAd({});
                            setDeleteOpen(false);
                        }}
                    >No</button>
                </DialogContent>
            </Dialog>

            {/* DIALOG NEW */}

            <Dialog
                id='dialogDelete'
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            >
                <DialogTitle>
                    Create New Advertisement
                </DialogTitle>
                <AdvertisementForm advertisement={{}} editing={false} setConfirmationCreate={setConfirmationCreate} setConfirmationEdit={setConfirmationEdit} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentAd={setCurrentAd} />
            </Dialog>

            {/* DIALOG EDIT */}

            <Dialog
                id='dialogDelete'
                open={editOpen}
                onClose={() => setEditOpen(false)}
            >
                <DialogTitle>
                    Edit the advertisement {currentAd.id}
                </DialogTitle>
                <AdvertisementForm advertisement={currentAd} editing={true} setConfirmationEdit={setConfirmationEdit} setConfirmationCreate={setConfirmationCreate} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentAd={setCurrentAd} />
            </Dialog>

            {/* CONFIRMATION */}
            <Snackbar
                open={confirmationCreate || confirmationEdit || confirmationDelete}
                onClose={() => {
                    setConfirmationEdit(false);
                    setConfirmationDelete(false);
                    setConfirmationCreate(false);
                }}
                anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}
            >
                <Alert severity='success'>
                    {confirmationCreate && 'Advertisement created successfully !'}
                    {confirmationEdit && 'Advertisement edited successfully !'}
                    {confirmationDelete && 'Advertisement has been deleted successfully !'}
                </Alert>
            </Snackbar>
            <div className='flex items-center justify-between w-full px-16 mt-8'>
                <p className='text-5xl font-semibold'>Advertisements</p>
                <button className='flex gap-3 text-white p-2 bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition ease-out rounded-sm mt-4'
                    onClick={() => {
                        setCurrentAd({})
                        setCreateOpen(true)
                    }}
                >
                    <AddCircleOutlineIcon /> New Advertisement
                </button>
            </div>

            <table className='block text-base text-left text-gray-500'>
                <thead className=''>
                    <tr className=''>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Offerer</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Contract Type</th>
                        <th scope="col" className="px-6 py-3">Wages</th>
                        <th scope="col" className="px-6 py-3">Working Time</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        advertisements.map((advertisement) => {
                            return (
                                <tr key={advertisement.id} className='bg-white border-b'>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.id}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.title}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.user}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.description.slice(0, 30)} [...] {advertisement.description.slice((advertisement.description.length - 23), advertisement.description.length)}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.contractType}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.wages}</td>
                                    <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{advertisement.workingTime}</td>
                                    <td className='flex justify-around px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                        <button
                                            className='text-emerald-400 hover:animate-spin'
                                            onClick={() => {
                                                setCurrentAd(advertisement)
                                                setEditOpen(true)
                                            }}
                                        ><EditIcon /></button>
                                        <button
                                            className='text-red-600 hover:animate-ping'
                                            onClick={() => {
                                                setCurrentAd(advertisement)
                                                setDeleteOpen(true)
                                            }}
                                        ><DeleteForeverIcon /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='flex justify-center w-full'>
                <button
                    disabled={page === 1 && 'disabled'}
                    onClick={() => setPage(page - 1)}
                ><ArrowBackIosNewIcon /></button>
                <button>{page}</button>
                <button
                    disabled={page === lastPage && 'disabled'}
                    onClick={() => setPage(page + 1)}
                ><ArrowForwardIosIcon /></button>
            </div>
        </div>
    )
}

