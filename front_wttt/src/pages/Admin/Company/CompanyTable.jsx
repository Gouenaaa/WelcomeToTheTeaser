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
import { CompanyForm } from './CompanyForm';


export function CompanyTable() {
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);

  const [companies, setCompanies] = useState([])
  const [currentCompany, setCurrentCompany] = useState({})

  const [createOpen, setCreateOpen] = useState(false)
  const [confirmationCreate, setConfirmationCreate] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [confirmationEdit, setConfirmationEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false);

  const deleteCompany = () => {
    axios.delete(`http://127.0.0.1:8000/api/companies/${currentCompany.id}`)
  }

  axios.get('http://127.0.0.1:8000/api/companies', {
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    }
  })
    .then((response => {
      setLastPage(Math.ceil(response.data['hydra:totalItems'] / 13));
    }));

  useEffect(() => {
    axios.get(`http://localhost:8000/api/companies?itemsPerPage=13&page=${page}`,
      {
        headers:
        {
          'Accept': 'application/json'
        }
      }
    ).then(response => setCompanies(response.data))
  }, [page, currentCompany])

  return (
    <div className='h-full flex-grow flex flex-col items-center'>
      {/* DIALOG */}
      <Dialog
        id='dialogDelete'
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <DialogTitle>
          Are you sure you want to delete company {currentCompany.id} ?
        </DialogTitle>
        <DialogContent className='flex justify-around'>
          <button
            className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500'
            onClick={() => {
              deleteCompany();
              setDeleteOpen(false);
              setConfirmationDelete(true);
              setCurrentCompany({});
              setInterval(() => {
                setConfirmationDelete(false);
              }, 1500)
            }}
          >Yes</button>
          <button
            className='py-2 px-4 rounded-lg border-2 text-white border-transparent bg-emerald-400 hover:border-emerald-400 hover:bg-white hover:text-emerald-400'
            onClick={() => {
              setCurrentCompany({});
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
        <CompanyForm company={{}} editing={false} setConfirmationCreate={setConfirmationCreate} setConfirmationEdit={setConfirmationEdit} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentCompany={setCurrentCompany} />
      </Dialog>

      {/* DIALOG EDIT */}

      <Dialog
        id='dialogDelete'
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <DialogTitle>
          Edit the advertisement {currentCompany.id}
        </DialogTitle>
        <CompanyForm company={currentCompany} editing={true} setConfirmationEdit={setConfirmationEdit} setConfirmationCreate={setConfirmationCreate} setCreateOpen={setCreateOpen} setEditOpen={setEditOpen} setCurrentCompany={setCurrentCompany} />
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
          {confirmationCreate && 'Company created successfully !'}
          {confirmationEdit && 'Company edited successfully !'}
          {confirmationDelete && 'Company has been deleted successfully !'}
        </Alert>
      </Snackbar>

      <div className='flex w-full items-center justify-between px-60 mt-8'>
        <p className='text-5xl font-semibold'>Companies</p>

        <button className='text-white p-2 bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition ease-out rounded-sm mt-4'
          onClick={() => {
            setCreateOpen(true)
            setCurrentCompany({})
          }}
        >
          <AddCircleOutlineIcon /> New Company
        </button>
      </div>
      <table className='block text-base text-left text-gray-500'>
        <thead className=''>
          <tr className=''>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Creation Date</th>
            <th scope="col" className="px-6 py-3">Sales Revenue</th>
            <th scope="col" className="px-6 py-3">Work Force</th>
            <th scope="col" className="px-6 py-3">Country</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            companies.map((company) => {
              return (
                <tr key={company.id} className='bg-white border-b'>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.id}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.name}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{new Date(company.creationDate).toLocaleDateString()}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.salesRevenue}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.workForce}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.country}</td>
                  <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>{company.city}</td>
                  <td className='flex justify-around px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    <button
                      className='text-emerald-400 hover:animate-spin'
                      onClick={() => {
                        setCurrentCompany(company)
                        setEditOpen(true)
                      }}
                    ><EditIcon /></button>
                    <button
                      className='text-red-600 hover:animate-ping'
                      onClick={() => {
                        setCurrentCompany(company)
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
