import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
import { GuestForm } from './GuestForm';


export function GuestTable() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const [guests, setGuests] = useState([]);
  const defaultGuest = {
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    studyLVL: '',
  }
  const [currentGuest, setCurrentGuest] = useState(defaultGuest);

  const {
    register,
    handleSubmit,
  } = useForm();

  const [createOpen, setCreateOpen] = useState(false)
  const [confirmationCreate, setConfirmationCreate] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [confirmationEdit, setConfirmationEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false);

  //Get last page number
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/guests?itemsPerPage=1", {
      headers: {
        'Accept': 'application/ld+json'
      }
    })
      .then(response => {
        setLastPage(Math.ceil(response.data['hydra:totalItems'] / 13))
      });
  }, []);

  //Get current page users
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/guests?itemsPerPage=13&page=" + page, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => setGuests(response.data));
  }, [page, currentGuest]);

  let intervalID;
  const setFalse = () => {
    setConfirmationCreate(false);
    setCreateOpen(false);
    setConfirmationEdit(false);
    setConfirmationDelete(false);
    stopInterval();
  }

  const startInterval = () => {
    intervalID = setInterval(setFalse, 1500);
  }

  const stopInterval = () => {
    clearInterval(intervalID);
  }

  const onSubmit = (data) => {
    if (createOpen) {
      axios.post("http://127.0.0.1:8000/api/guests", data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setConfirmationCreate(true);
          startInterval();
          setCurrentGuest(defaultGuest);
        })
    }
    else if (editOpen) {
      axios.patch("http://127.0.0.1:8000/api/guests/" + currentGuest.id, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json'
        }
      })
        .then(response => {
          setConfirmationEdit(true);
          startInterval();
        })
    }
  }

  const deleteGuest = () => {
    axios.delete("http://127.0.0.1:8000/api/guests/" + currentGuest.id);
  }

  return (
    <div className='h-full flex-grow flex flex-col items-center'>
      {/* DIALOG */}
      <Dialog
        id='dialogDelete'
        open={createOpen || editOpen || deleteOpen}
        onClose={() => {
          setCreateOpen(false);
          setEditOpen(false);
          setDeleteOpen(false);
          setCurrentGuest(defaultGuest);
        }}
      >
        <DialogTitle>
          {createOpen && 'Create a new guest'}
          {editOpen && 'Edit guest ' + currentGuest.id}
          {deleteOpen && 'Are you sure you want to delete guest ' + currentGuest.id + ' ?'}
        </DialogTitle>
        <DialogContent>
          {(createOpen || editOpen) && (
            <GuestForm defaultGuest={defaultGuest} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} currentGuest={currentGuest} setCurrentGuest={setCurrentGuest} createOpen={createOpen} editOpen={editOpen} />
          )}
          {deleteOpen && (
            <div className='flex justify-around'>
              <button
                className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500'
                onClick={() => {
                  deleteGuest();
                  setDeleteOpen(false);
                  setConfirmationDelete(true);
                  startInterval();
                  setCurrentGuest(defaultGuest);
                }}
              >Yes</button>
              <button
                className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-emerald-400 hover:border-emerald-400 hover:bg-white hover:text-emerald-400'
                onClick={() => {
                  setCurrentGuest(defaultGuest);
                  setDeleteOpen(false);
                }}
              >No</button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CONFIRMATION */}
      <Snackbar
        open={confirmationCreate || confirmationEdit || confirmationDelete}
        onClose={() => {
          setConfirmationEdit(false);
          setConfirmationDelete(false);
        }}
        anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}
      >
        <Alert severity='success'>
          {confirmationCreate && 'Guest created successfully !'}
          {confirmationEdit && 'Guest edited successfully !'}
          {confirmationDelete && 'Guest has been deleted successfully !'}
        </Alert>
      </Snackbar>
      <div className='flex w-full items-center justify-between px-80 mt-8'>
        <p className='text-5xl font-semibold'>Guests</p>

        <button
          className='flex gap-3 text-white p-2 bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition ease-out rounded-sm mt-4'
          onClick={() => {
            setCurrentGuest(defaultGuest);
            setCreateOpen(true);
          }}
        >
          <AddCircleOutlineIcon /> New Guest
        </button>
      </div>
      <table className='block text-base text-left text-gray-500'>
        <thead className=''>
          <tr className=''>
            <th scope="col" className="px-4 py-2">Id</th>
            <th scope="col" className="px-4 py-2">Email</th>
            <th scope="col" className="px-4 py-2">First Name</th>
            <th scope="col" className="px-4 py-2">Last Name</th>
            <th scope="col" className="px-4 py-2">City</th>
            <th scope="col" className="px-4 py-2">Phone</th>
            <th scope="col" className="px-4 py-2">Study LVL</th>
            <th scope="col" className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => {
            return (
              <tr key={guest.id} className='bg-white border-b'>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.id}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.email}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.firstName}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.lastName}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.city}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.phone}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{guest.studyLVL}</td>
                <td className='flex gap-x-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  <button
                    className='text-emerald-400 hover:animate-spin'
                    onClick={() => {
                      setCurrentGuest(guest);
                      setEditOpen(true);
                    }}
                  ><EditIcon /></button>
                  <button
                    className='text-red-600 hover:animate-ping'
                    onClick={() => {
                      setCurrentGuest(guest);
                      setDeleteOpen(true);
                    }}
                  ><DeleteForeverIcon /></button>
                </td>
              </tr>
            )
          })}
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
