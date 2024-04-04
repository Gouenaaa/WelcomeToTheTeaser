import { useState } from "react";
import { AdvertisementsItemsList } from "./AdvertisementsItemsList";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import axios from "axios";
import { Advertisement } from "./Advertisement";

export function Home(){
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [isAdvertisementOpen, setIsAdvertisementOpen] = useState(false);
    const [advertisementId, setAdvertisementId] = useState();    

    axios.get('http://127.0.0.1:8000/api/advertisements', {
        headers: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
        }
    })
    .then((response => {
        setLastPage(Math.ceil(response.data['hydra:totalItems']/9));
    }));

    return (
        <>
        {isAdvertisementOpen ? <Advertisement setIsAdvertisementOpen={setIsAdvertisementOpen} advertisementId={advertisementId}  /> : (
            <div className="flex flex-col w-2/3 h-full mt-10">
                <div className="flex flex-wrap gap-8">
                    <AdvertisementsItemsList page={page} setAdvertisementId={setAdvertisementId} setIsAdvertisementOpen={setIsAdvertisementOpen} />
                </div>
                <div className="flex justify-center rounded-xl text-xl gap-x-8 mt-4">
                    <button onClick={() => setPage(1)}><BsChevronDoubleLeft /></button>
                    {page === 1 ? <button className="underline" onClick={() => setPage(page)}>{page}</button> : page+1 <= lastPage ? <button onClick={() => setPage(page-1)}>{page-1}</button> : <button onClick={() => setPage(page-2)}>{page-2}</button>}
                    {page === 1 ? <button onClick={() => setPage(page+1)}>{page+1}</button> : page+1 <= lastPage ? <button className="underline" onClick={() => setPage(page)}>{page}</button> : <button onClick={() => setPage(page-1)}>{page-1}</button>}
                    {page === 1 ? <button onClick={() => setPage(page+2)}>{page+2}</button> : page+1 <= lastPage ? <button onClick={() => setPage(page+1)}>{page+1}</button> : <button className="underline" onClick={() => setPage(page)}>{page}</button>}
                    <button onClick={() => setPage(lastPage)}><BsChevronDoubleRight /></button>
                </div>
            </div>
        )}
        </>
    );
}