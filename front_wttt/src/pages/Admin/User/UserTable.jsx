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
import { UserForm } from './UserForm';

export function UserTable() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const [users, setUsers] = useState([]);
  const defaultUser = {
    email: '',
    roles: ["ROLE_SEEKER"],
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 0,
    city: '',
    phone: '',
    studyLVL: '',
    password: '',
    company: null,
  }
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const sexes = ["Male", "Female", "Other"];

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
    axios.get("http://127.0.0.1:8000/api/users?itemsPerPage=1", {
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
    axios.get("http://127.0.0.1:8000/api/users?itemsPerPage=13&page=" + page, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => setUsers(response.data));
  }, [page, currentUser]);

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
    data.gender = parseInt(data.gender);
    data.roles = [data.roles];
    if (data.roles[0] !== "ROLE_OFFERER") {
      data.company = null;
    }
    if (createOpen) {
      axios.post("http://127.0.0.1:8000/api/users", data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setConfirmationCreate(true);
          startInterval();
          setCurrentUser(defaultUser);
        })
    }
    else if (editOpen) {
      axios.patch("http://127.0.0.1:8000/api/users/" + currentUser.id, data, {
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

  const deleteUser = () => {
    axios.delete("http://127.0.0.1:8000/api/users/" + currentUser.id);
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
          setCurrentUser(defaultUser)
        }}
      >
        <DialogTitle>
          {createOpen && 'Create a new user'}
          {editOpen && 'Edit user ' + currentUser.id}
          {deleteOpen && 'Are you sure you want to delete user ' + currentUser.id + ' ?'}
        </DialogTitle>
        <DialogContent>
          {(createOpen || editOpen) && (
            <UserForm defaultUser={defaultUser} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} currentUser={currentUser} setCurrentUser={setCurrentUser} createOpen={createOpen} editOpen={editOpen} />
          )}
          {deleteOpen && (
            <div className='flex justify-around'>
              <button
                className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500'
                onClick={() => {
                  deleteUser();
                  setDeleteOpen(false);
                  setConfirmationDelete(true);
                  startInterval();
                  setCurrentUser(defaultUser);
                }}
              >Yes</button>
              <button
                className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-emerald-400 hover:border-emerald-400 hover:bg-white hover:text-emerald-400'
                onClick={() => {
                  setCurrentUser(defaultUser);
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
          {confirmationCreate && 'User created successfully !'}
          {confirmationEdit && 'User edited successfully !'}
          {confirmationDelete && 'User has been deleted successfully !'}
        </Alert>
      </Snackbar>
      <div className='flex w-full items-center justify-between px-8 mt-8'>
        <p className='text-5xl font-semibold'>Users</p>
        <button
          className='flex gap-3 text-white p-2 bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition ease-out rounded-sm mt-4'
          onClick={() => {
            setCurrentUser(defaultUser);
            setCreateOpen(true);
          }}
        >
          <AddCircleOutlineIcon /> New User
        </button>
      </div>
      <table className='block text-base text-left text-gray-500'>
        <thead className=''>
          <tr className=''>
            <th scope="col" className="px-4 py-2">Id</th>
            <th scope="col" className="px-4 py-2">Role</th>
            <th scope="col" className="px-4 py-2">Company</th>
            <th scope="col" className="px-4 py-2">Email</th>
            <th scope="col" className="px-4 py-2">First Name</th>
            <th scope="col" className="px-4 py-2">Last Name</th>
            <th scope="col" className="px-4 py-2">Birth Date</th>
            <th scope="col" className="px-4 py-2">Gender</th>
            <th scope="col" className="px-4 py-2">City</th>
            <th scope="col" className="px-4 py-2">Phone</th>
            <th scope="col" className="px-4 py-2">Study LVL</th>
            <th scope="col" className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} className='bg-white border-b'>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.id}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.roles[0]}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.company ? user.company : "No company"}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.email}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.firstName}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.lastName}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{new Date(user.birthDate).toLocaleDateString()}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{sexes[user.gender]}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.city}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.phone}</td>
                <td className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap'>{user.studyLVL}</td>
                <td className='flex gap-x-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  <button
                    className='text-emerald-400 hover:animate-spin'
                    onClick={() => {
                      setCurrentUser(user);
                      setEditOpen(true);
                    }}
                  ><EditIcon /></button>
                  <button
                    className='text-red-600 hover:animate-ping'
                    onClick={() => {
                      setCurrentUser(user);
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
