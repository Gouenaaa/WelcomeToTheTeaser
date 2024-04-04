import axios from "axios";
import { useEffect, useState } from "react";
import PlaceIcon from '@mui/icons-material/Place';

export function AdvertisementItem(props){
    const [company, setCompany] = useState({});
    const [companyInitials, setCompanyInitials] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000'+props.company, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => setCompany(response.data));
    }, [props.company]);

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

    return (
        <>
            <div className="flex w-full shadow-lg bg-gray-50">
                <div className="flex flex-col w-1/6 p-6 aspect-square">
                    <div className="flex justify-center items-center w-full h-full border-2 border-emerald-500 text-3xl">{companyInitials}</div>
                </div>
                <div className="flex justify-between w-full px-5 py-5">
                    <div className="flex flex-col">
                        <div className="text-2xl font-bold">{props.title}</div>
                        <div className="text-lg my-1 underline">{company.name}</div>
                        <p className="text-gray-400 flex">{props.contractType}</p>
                        <p className="text-gray-400 flex"><PlaceIcon/> {company.city} ({company.country})</p>

                    </div>                 
                    <div className="flex flex-col gap-1">
                        <span className="block bg-gray-200 text-black py-1 px-3 mt-1">Working time: {props.workingTime}</span>
                        <span className="block bg-gray-200 text-black py-1 px-3 mt-1">Wages: {props.wages}</span>
                        <button onClick={() => {
                        props.setAdvertisementId(props.id);
                        props.setIsAdvertisementOpen(true);
                        }} 
                        className="btn self-end bg-emerald-400 text-white hover:bg-white border-2 border-emerald-400 hover:text-emerald-400 w-fit py-2 px-4 mt-1">Read More</button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}