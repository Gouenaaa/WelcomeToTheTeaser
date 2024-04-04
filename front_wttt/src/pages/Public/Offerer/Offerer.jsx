import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Application } from "./Application";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditAdvertisement } from "./EditAdvertisement";
import { NewAdvertisement } from "./NewAdvertisement";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function Offerer(){
    const [advertisements, setAdvertisements] = useState([]);
    const [userId, setUserId] = useState(jwtDecode(sessionStorage.getItem("token")).username);
    const [currentAdvertisement, setCurrentAdvertisement] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/advertisements/user/"+userId+"/0", {
            headers: {
                'accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            }
        })
        .then(response => setLastPage(Math.ceil(response.data/5)));
    }, [isEditing, isCreating, alert])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/advertisements/user/"+userId+"/"+currentPage, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            let temp = [];
            response.data.map(advertisement => {
                const parts = advertisement.user.split("/");
                if(parts[3] === userId){
                    temp.push(advertisement);
                }
                return 0;
            });
            setAdvertisements(temp);
            setCurrentAdvertisement(temp[0]);
            if(temp.length === 0){
                setAlert(true);
            }
        });
    }, [isEditing, currentPage, isCreating, alert])

    

    return (
        <div className="flex flex-col items-center w-2/3 h-full">
            <div className="flex justify-between items-center w-2/3 mt-4">
                {alert ? (
                    <>
                    <div></div>
                    <Snackbar
                        anchorOrigin={{'vertical' : 'top', 'horizontal' : 'center'}}
                        open={alert}
                    >
                        <Alert severity="error">
                            You don't have any advertisement !
                        </Alert>
                    </Snackbar>
                    </>
                ) : (
                    <nav className="flex justify-center">
                        {currentPage !== 1 && <button className="hover:text-emerald-400" onClick={() => setCurrentPage(currentPage-1)}><ArrowBackIosNewIcon /></button>}
                        {advertisements.map(advertisement => {
                            return (
                                <button
                                    className={currentAdvertisement.id === advertisement.id ? "p-3 border-b-2 border-b-emerald-500" : "p-3 border-b-2 border-b-transparent hover:border-b-emerald-300"}
                                    onClick={() => setCurrentAdvertisement(advertisement)}
                                    key={advertisement.id}
                                    >{advertisement.title}</button>
                            );
                        })}
                        {currentPage !== lastPage && <button className="hover:text-emerald-400" onClick={() => setCurrentPage(currentPage+1)}><ArrowForwardIosIcon /></button>}
                    </nav>
                )}
                <div className="flex gap-x-2">
                    {advertisements.length !== 0 && (
                        <>
                        <button className="hover:text-emerald-400" onClick={() => setIsEditing(true)}><EditIcon /></button>
                        <Dialog
                            open={isEditing}
                            onClose={() => setIsEditing(false)}
                        >
                            <DialogTitle className="flex justify-between" id="alert-dialog-title">
                                <p className="underline text-center w-full">Edit {currentAdvertisement.title}</p>
                                <button onClick={() => setIsEditing(false)}><CloseIcon /></button>
                            </DialogTitle>
                            <DialogContent>
                                <EditAdvertisement {...currentAdvertisement} />
                            </DialogContent>
                        </Dialog>
                        </>
                    )}
                    <button className="hover:text-emerald-400" onClick={() => setIsCreating(true)}><AddCircleOutlineIcon /></button>
                    <Dialog
                        open={isCreating}
                        onClose={() => setIsCreating(false)}
                    >
                        <DialogTitle className="flex justify-between" id="alert-dialog-title">
                            <p className="underline text-center w-full">Create advertisement</p>
                            <button onClick={() => setIsCreating(false)}><CloseIcon /></button>
                        </DialogTitle>
                        <DialogContent>
                            <NewAdvertisement setAlert={setAlert} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex flex-col mt-7 w-2/3">
                {currentAdvertisement !== undefined ? (
                    currentAdvertisement.applications !== undefined ? (
                        currentAdvertisement.applications.length !== 0 ? (
                            currentAdvertisement.applications?.map(application => {
                                return (
                                    <Application key={application} applicationId={application}  />
                                );
                            })
                        ) : (
                            <div>There is no application for this advertisement yet !</div>
                        )
                    ) : (
                        <div>There is no application for this advertisement yet !</div>
                    )
                ) : (
                    null
                )}
            </div>
        </div>
    )
}