import React from "react";
import {  Typography } from "../../../ClientSide";
import { CiCreditCardOff } from "react-icons/ci";
import Payment from "@/components/creditcard/ButtonPayment";


export default function NoCard() {


    return (
        <div className="flex flex-col w-full h-full items-center justify-center md:min-h-[50rem] bg-white">

            <Typography variant="h4" className="font-normal text-center">
                Você não possui cartão cadastrado.
            </Typography>
            <div className="w-[17rem] h-[14rem] sm:w-[24rem] sm:h-[18rem] md:w-[30rem] md:h-[24rem]">
                <CiCreditCardOff className="w-[17rem] h-[14rem] sm:w-[24rem] sm:h-[18rem] md:w-[30rem] md:h-[24rem]" />
            </div>
            <Payment />

        </div>
    )
}