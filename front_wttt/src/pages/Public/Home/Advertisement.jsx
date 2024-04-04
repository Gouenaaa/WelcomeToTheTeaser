import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import { Application } from "../Application/Application";
import jwtDecode from "jwt-decode";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import { accountService } from "../../../sevices/account.service";

export function Advertisement(props){
    const [advertisement, setAdvertisement] = useState({});
    const [company, setCompany] = useState({});
    const [companyInitials, setCompanyInitials] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const [canApply, setCanApply] = useState(true);

    let user = {
        roles: ["ROLE_SEEKER"],
        username: null
    };
    if(accountService.isLogged()){
        user = jwtDecode(sessionStorage.getItem('token'))
    }
    
    //Get the advertisement
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/advertisements/'+props.advertisementId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => setAdvertisement(response.data));
    }, [props.advertisementId])

    useEffect(() => {
        if(advertisement.applications !== undefined){
            if(sessionStorage.getItem("token")){
                const userId = jwtDecode(sessionStorage.getItem("token")).username;
                advertisement.applications.map(app => {
                    axios.get("http://127.0.0.1:8000"+app, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        const parts = !!response.data.user && response.data.user.split("/");
                        if(parts[3] === userId){
                            setCanApply(false);
                        }
                    });
                    return 0;
                })
            }
        }
    }, [advertisement.applications])

    //Get advertisement's company
    useEffect(() => {
        if(advertisement.company !== undefined){
            axios.get('http://127.0.0.1:8000'+advertisement.company, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => setCompany(response.data));
        }
    }, [advertisement]);

    //Convert company's name into initials
    useEffect(() => {
        if(company.name !== undefined){
            let initials = "";
            for(const c of company.name){
                if(c === c.toUpperCase()){
                    initials += c;
                }
            }
            setCompanyInitials(initials);
        }
    }, [company]);

    return(
        <>
            <Dialog className="w-1/2 ml-[25%]" open={isApplying} onClose={() => setIsApplying(false)}>
                <Application {...advertisement} setIsApplying={setIsApplying} />
            </Dialog>
            <div className="flex flex-col w-4/6 pt-10 px-10 bg-white shadow-lg h-[calc(100vh-4rem)]">
                <div className="border-b-2 border-emerald-400 w-fit flex justify-center items-center text-emerald-500 hover:cursor-pointer" onClick={() => props.setIsAdvertisementOpen(false)}>
                    <KeyboardBackspaceSharpIcon/>
                    <p className="text-emerald-500" >Back</p>
                </div>
                <div className="w-full border-b-2 border-emerald-400 py-4">
                    <p className="text-2xl font-bold">{advertisement.title}</p>
                    <p className="text-lg flex justify-center items-center w-fit">{advertisement.contractType} - <PlaceIcon/> {company.city} ({company.country})</p>
                </div>
                <div className="flex mt-5">
                    <div className="flex flex-col w-3/4 gap-3">
                        <p className="text-xl font-bold">Description</p>
                        <p className="text-justify w-5/6">{advertisement.description}</p>
                    </div>
                    <div className="flex flex-col bg-white w-1/4 p-2">
                        <div className="flex justify-center items-center w-1/2 aspect-square border-2 border-emerald-500 text-3xl">
                            <p>{companyInitials}</p>
                        </div>
                        <p className="font-bold text-lg underline">{company.name}</p>
                        <p className="w-fit flex justify-center items-center gap-1"><CalendarMonthIcon className="text-emerald-500"/> Founded in {company.creationDate !== undefined ? company.creationDate.slice(0, 4) : null}</p>
                        <p className="w-fit flex justify-center items-center gap-1"><PlaceIcon className="text-emerald-500"/> {company.city} ({company.country})</p>
                        <p className="w-fit flex justify-center items-center gap-1"><PeopleAltIcon className="text-emerald-500"/> {company.workForce} employees</p>
                        <p className="w-fit flex justify-center items-center gap-1"><PaidIcon className="text-emerald-500"/> {company.salesRevenue}</p>
                        
                        {user.roles.includes("ROLE_SEEKER") ? canApply ? (
                                <button className="border-2 py-2 px-10 mt-5 border-emerald-500 text-white hover:text-emerald-500 bg-emerald-500 hover:bg-white  w-fit" onClick={() => setIsApplying(true)}>Apply</button>
                            ) : (
                                <button className="border-2 py-2 px-10 mt-5 border-emerald-500 text-white hover:text-emerald-500 bg-emerald-500 hover:bg-white " disabled>Already applied</button>
                            ): null 
                            }
                    </div>
                </div>
            </div>
            {/* <div className="flex w-2/3 mt-10 gap-x-8">
                <div className="w-[65%] bg-emerald-400 rounded-xl shadow-xl">
                    <div className="m-16">
                        <h1 className="text-2xl text-center">{advertisement.title}</h1>
                        <p className="mt-8">{advertisement.description}</p>
                        <div className="mt-16 flex justify-between">
                            <div className="flex justify-center items-center w-1/3 h-36 border-4 rounded-xl">
                                <p>Wages : {advertisement.wages}</p>
                            </div>
                            <div className="flex justify-center items-center w-1/3 h-36 border-4 rounded-xl">
                                <p>Work time : {advertisement.workingTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="flex flex-col justify-center h-[64%] bg-emerald-400 rounded-xl p-8 shadow-xl">
                        <div className="flex justify-center items-center w-full h-full border-2 border-emerald-500 text-8xl">
                            {companyInitials}
                        </div>
                        <div className="mt-4">
                            <span className="underline">{company.name}</span>
                            <span className="ml-8">Founded the {company.creationDate !== undefined ? company.creationDate.slice(0, 10) : null}</span>
                        </div>
                        <p>{company.workForce} employees</p>
                        <p>Sales revenue: {company.salesRevenue}</p>
                        <p>Based at {company.city}, {company.country}</p>
                        </div>
                        <div className="flex justify-center items-center h-[32%] mt-8 bg-emerald-400 rounded-xl shadow-xl">
                            {canApply ? (
                                <button className="border-4 border-r-2 p-4 rounded-l-xl border-emerald-600 hover:bg-emerald-200" onClick={() => setIsApplying(true)}>Apply</button>
                            ) : (
                                <button className="border-4 border-r-2 p-4 rounded-l-xl border-emerald-600 hover:bg-emerald-200" disabled>Already applied</button>
                            )}
                            <button className="border-4 border-l-2 p-4 rounded-r-xl border-emerald-600 hover:bg-emerald-200" onClick={() => props.setIsAdvertisementOpen(false)}>Return</button>
                        </div>
                    </div>
                </div> */}
        </>
    );
}