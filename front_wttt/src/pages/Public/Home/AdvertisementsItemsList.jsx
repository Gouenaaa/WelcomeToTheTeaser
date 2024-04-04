import axios from "axios";
import { useState, useEffect } from "react";
import { AdvertisementItem } from "./AdvertisementItem";

export function AdvertisementsItemsList(props){
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/advertisements?itemsPerPage=9&page='+props.page, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => setAdvertisements(response.data));
  }, [props.page]);

  return (
    <div className="flex flex-col items-center w-[100%] gap-5">
      {advertisements.map(advertisement => {
        return <AdvertisementItem {...advertisement} key={advertisement.id} setAdvertisementId={props.setAdvertisementId} setIsAdvertisementOpen={props.setIsAdvertisementOpen}/>
      })}
    </div>
  );
}