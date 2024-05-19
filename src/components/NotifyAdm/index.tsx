import {useState} from 'react'
import { useEffect } from 'react';
import { Badge } from '../ClientSide';
import { BellIcon } from '@heroicons/react/24/outline';
import { boolean } from 'zod';

export default function NotifyAdm() {

    const [isNew, setIsNew] = useState()

    //Consulta a API
    const [items, setItems] = useState([]);
 
    const fetchNewData = async () => {
        const reponse1 = await fetch("/api/administrador");
        const reponse2 = await fetch("/api/promoter");
        const reponse3 = await fetch("/api/evento");

        const  newDataADM = await reponse1.json();
        const  newDataProm = await reponse2.json();
        const  newDataEvent = await reponse3.json();

        setIsNew(newDataADM);
    }
 
    useEffect(() => {
        fetchNewData();
    }, []);


    if (isNew === true){
        return (
            <Badge>
                <BellIcon className="h-8 w-8" />
            </Badge>
        )
    } else{
        return (
            <BellIcon className="h-8 w-8" />
        )
    }
}