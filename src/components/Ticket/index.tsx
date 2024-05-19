"use client"

import { Cliente } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import { usePathname} from 'next/navigation'
import QRCode from "qrcode.react";



export default function Ticket(ticket:any) {
  const path = usePathname()
  const site = "https://backend-wilbortick.vercel.app"

  const [ticketInfo, setTicketInfo] = useState({
    event: ticket.data.nome_evento,
    date: moment(ticket.data.data).format("DD/MM/YYYY"),
    local: ticket.data.local.rua,
    promoter: ticket.data.promoter,
    code: ticket.data.id_ingresso,
    profile: ticket.data.perfil,
    sector: ticket.data.setor,
    name: ticket.data.nome_cliente,
    cpf: ticket.data.cpf,
  });

  return (
    <div className="flex w-screen h-fit justify-center items-center p-4 max-w-[720px]">
      <div className="flex flex-col  gap-2 w-full h-full rounded-lg">
        <div className="flex flex-row justify-between items-center w-full h-24 bg-gray-200 rounded-lg p-4">
          <img className="h-16"
            src="/icons/logo.svg" >
          </img>
          <h1 className="text-4xl font-extrabold text-[#404c76] ">
            E-TICKET
          </h1>
        </div>
        <div className="flex flex-col w-full h-full bg-gray-200 rounded-lg p-4 gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 w-full">
            <h1 className="break-all text-3xl font-bold text-[#404c76] col-span-2 md:col-span-3">
              {ticketInfo.event}
            </h1>
            <div className="col-span-2 md:col-span-1">
              <h1 className="font-semibold text-[#404c76]">Local</h1>
              <p className="break-all text-[#404c76]">{ticketInfo.local}</p>
            </div>
            <div>
              <h1 className="font-semibold text-[#404c76]" >Data</h1>
              <p className="text-[#404c76]" >{ticketInfo.date}</p>
            </div>
            <div>
            <h1 className="font-semibold text-[#404c76]">Promoter</h1>
              <p className="text-[#404c76]" >{ticketInfo.promoter}</p>
            </div>
          </div>
          <hr className="border-[#404c76] border-2 border-dashed"/>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 w-full">
                <h1 className="text-2xl font-semibold text-[#404c76] col-span-2">
                  Informações do Ingresso
                </h1>
                <div className="col-span-2">
                  <h1 className="font-semibold text-[#404c76]" >Código do Ingresso</h1>
                  <p className="text-[#404c76]" >{ticketInfo.code}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-[#404c76]" >Perfil</h1>
                  <p className="text-[#404c76]" >{ticketInfo.profile}</p>
                </div>
                <div>
                <h1 className="font-semibold text-[#404c76]" >Setor</h1>
                  <p className="text-[#404c76]" >{ticketInfo.sector}</p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-[#404c76] ">
                  Titular do Ingresso
                </h1>
                <div>
                  <h1 className="font-semibold text-[#404c76]" >Nome</h1>
                  <p className="break-all text-[#404c76]">{ticketInfo.name}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-[#404c76]" >CPF</h1>
                  <p className="text-[#404c76]" >{ticketInfo.cpf}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg p-4 items-center bg-[#404c76]">
              <h1 className="text-2xl font-semibold text-gray-200 pb-2">
                QR CODE
              </h1>
              <QRCode
              size={200}
              value={site+path}/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
