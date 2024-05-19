"use client"

import {  useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@/components/ClientSide";
import Sector from "@/components/ShoppingCart/Sectors"
import { Lotacao } from "@prisma/client";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
 
function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function lotacoesDoSetor(listaLotacoes: any, idDoSetor: number){
  return listaLotacoes.filter((lotacao: any)=>{
            return lotacao.id_setor === idDoSetor
            })
}
export default function CartTickets(props:any) {
  const {cartItems} = useShoppingCart()
  const [open, setOpen] = useState(0);
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const setor = ['Vip', 'Camarote', 'Backstage']

  let setores: number []= []
    setores = props.lotacoes?.reduce((resultado:number[], lot: Lotacao) =>{
              if (!resultado?.includes(lot.id_setor)) {
                resultado?.push(lot.id_setor);
              }
                return resultado;
        }, [])
  
  const valorTotal = setores?.reduce((total, id) =>{
    const lotacoes = lotacoesDoSetor(props.lotacoes, id);
    return total + lotacoes.reduce((valor: any, lot: any) =>{
        return valor + ((cartItems.find((it) => it.id === lot.id)?.quantidade || 0)* lot.valorTotal) 
    }, 0)
  }, 0)
  
  return (
    <div>
        <Accordion className="p-1" open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)} className="bg-gray-400 rounded-t-lg">
              <div className= "my-auto">

              <img src={props.banner} 
                  alt="img1" 
                  className="h-[90px] min-w-[140px] m-2 rounded-md" />

              </div>

              <div className="pt-3 pl-2 w-full">
                  <h1 className="text-[12px] text-center font-bold">{props.event?.nome}</h1>
                  <h1 className="text-[10px] text-center pl-1 mt-[30px] font-bold">Valor total:</h1>
                  <h1 className="text-[12px] text-center pl-1">{(valorTotal)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h1>
              </div>
          </AccordionHeader>
          <AccordionBody className="bg-gray-300">
            {setores?.map((id)=>(
              <Sector key={id} nomeSetor={setor[id - 1]} idSetor={id} lotacoes_setor={lotacoesDoSetor(props.lotacoes, id)}></Sector>
            ))}
            <p className="text-right pr-1 text-[#404C76] font-bold text-[14px]">Valor Total: {
              (valorTotal)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
          </AccordionBody>
        </Accordion>
    </div>
  );
}