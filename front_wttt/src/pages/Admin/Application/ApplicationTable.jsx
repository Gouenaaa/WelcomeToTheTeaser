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
import { ApplicationForm } from './ApplicationForm';


export function ApplicationTable() {


  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);

  const [applications, setApplication] = useState([])
  const [currentApp, setCurrentApp] = useState({})

  const [createOpen, setCreateOpen] = useState(false)
  const [confirmationCreate, setConfirmationCreate] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [confirmationEdit, setConfirmationEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false);

  const deleteApp = () => {
    axios.delete(`http://127.0.0.1:8000/api/applications/${currentApp.id}`)
  }

  axios.get('http://127.0.0.1:8000/api/applications', {
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    }
  })
    .then((response => {
      setLastPage(Math.ceil(response.data['hydra:totalItems'] / 13));
    }));

  useEffect(() => {
    axios.get(`http://localhost:8000/api/applications?itemsPerPage=13&page=${page}`,
      {
        headers:
        {
          'Accept': 'application/json'
        }
      }
    ).then(response => setApplication(response.data))
  }, [page, currentApp])

  console.log(applications)

  return (
    <div className='h-full flex-grow flex flex-col items-center'>
      {/* DIALOG */}
      <Dialog
        id='dialogDelete'
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <DialogTitle>
          Are you sure you want to delete application {currentApp.id} ?
        </DialogTitle>
        <DialogContent className='flex justify-around'>
          <button
            className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500'
            onClick={() => {
              deleteApp();
              setDeleteOpen(false);
              setConfirmationDelete(true);
              setCurrentApp({});
              setInterval(() => {
                setConfirmationDelete(false);
              }, 1500)
            }}
          >Yes</button>
          <button
            className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-emerald-400 hover:border-emerald-400 hover:bg-white hover:text-emerald-400'
            onClick={() => {
              setCurrentApp({});
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
        <ApplicationForm application={{}} editing={false} setConfirmationCreate={setConfirmationCreate} setConfirmationEdit={setConfirmationEdit} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentApp={setCurrentApp} />
      </Dialog>

      {/* DIALOG EDIT */}

      <Dialog
        id='dialogDelete'
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <DialogTitle>
          Edit the advertisement {currentApp.id}
        </DialogTitle>
        <ApplicationForm application={currentApp} editing={true} setConfirmationEdit={setConfirmationEdit} setConfirmationCreate={setConfirmationCreate} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentApp={setCurrentApp} />
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
          {confirmationCreate && 'Application created successfully !'}
          {confirmationEdit && 'Application edited successfully !'}
          {confirmationDelete && 'Application has been deleted successfully !'}
        </Alert>
      </Snackbar>
      <div className='flex w-full items-center justify-between px-52 mt-8'>
        <p className='text-5xl font-semibold'>Applications</p>
        <button className='text-white p-2 bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition ease-out rounded-sm mt-4' onClick={() => {
          setCurrentApp({})
          setCreateOpen(true)
        }}>
          <AddCircleOutlineIcon /> New Application
        </button>

      </div>
      <table className='block text-base text-left text-gray-500'>
        <thead className=''>
          <tr className=''>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">User</th>
            <th scope="col" className="px-6 py-3">Advertisement</th>
            <th scope="col" className="px-6 py-3">Guest</th>
            <th scope="col" className="px-6 py-3">Message</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            applications.map((application) => {
              return (
                <tr key={application.id} className='bg-white border-b'>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{application.id}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{!!application.user ? application.user : "It's a guest"}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{application.advertisement}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{!!application.guest ? application.guest : "It's a user"}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{application.message.slice(0, 30)} [...] {application.message.slice((application.message.length - 23), application.message.length)}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{new Date(application.date).toLocaleDateString()}</td>
                  <td className='flex justify-around px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    <button
                      className='text-emerald-400 hover:animate-spin'
                      onClick={() => {
                        setCurrentApp(application)
                        setEditOpen(true)
                      }}
                    ><EditIcon /></button>
                    <button
                      className='text-red-600 hover:animate-ping'
                      onClick={() => {
                        setCurrentApp(application)
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
