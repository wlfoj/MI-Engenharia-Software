'use client';

import React from 'react';
import Cardform from '../Cardform';
import FlippableCard from '../FlippableCard';
import { PayContext } from '../../../contexts/payContext';

import {
    Button,
    Dialog,
} from "../../ClientSide";


{/*Teste*/}
export default function Payment() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [infoCard, setInfoCard] = React.useState({
        cardNumber: "",
        name: "",
        date: "",
        cvv: "",
        fucus: true

    })

    const cleanInfoCard = () => {
        setInfoCard({
            cardNumber: "",
            name: "",
            date: "",
            cvv: "",
            fucus: true
        })
    }

    return (
        <React.Fragment>

            <PayContext.Provider value={{ infoCard, setInfoCard }} >
                <Button onClick={()=>{cleanInfoCard(); handleOpen()}}>Adicionar Cartão</Button>
                <Dialog
                    size="xl"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent shadow-none overflow-auto"
                >
                    <div className="mx-auto w-full h-[90vh] bg-white p-6 gap-y-5 overflow-auto" >
                        <div className='flex flex-col h-[50%] w-full justify-center lg:mb-5 items-center'>
                            <FlippableCard />
                        </div>
                        <div className="flex justify-center h-[50%]">
                            <Cardform click={handleOpen}/>
                        </div>
                    </div>

                </Dialog>
            </PayContext.Provider>

        </React.Fragment>
    )
}