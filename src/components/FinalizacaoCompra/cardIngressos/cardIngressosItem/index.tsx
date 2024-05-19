"use client";
import { Lotacao } from "@prisma/client";
import { useState } from "react";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";


function lotacoesDoSetor(listaLotacoes: any, idDoSetor: number) {
    return listaLotacoes.filter((lotacao: any) => {
        return lotacao.id_setor === idDoSetor
    })
}


export default function CardIngressoItem(props: any) {
    const { cartItems } = useShoppingCart()

    let setores: number[] = []
    setores = props.lotacoes?.reduce((resultado: number[], lot: Lotacao) => {
        if (!resultado?.includes(lot.id_setor)) {
            resultado?.push(lot.id_setor);
        }
        return resultado;
    }, [])

    const valorTotal = setores?.reduce((total, id) => {
        const lotacoes = lotacoesDoSetor(props.lotacoes, id);
        return total + lotacoes.reduce((valor: any, lot: any) => {
            return valor + ((cartItems.find((it) => it.id === lot.id)?.quantidade || 0) * lot.valorTotal)
        }, 0)
    }, 0) 

    const quantidadeIngressos = setores?.reduce((total, id) => {
        const lotacoes = lotacoesDoSetor(props.lotacoes, id);
        return total + lotacoes.reduce((valor: any, lot: any) => {
            return valor + ((cartItems.find((it) => it.id === lot.id)?.quantidade || 0) )
        }, 0)
    }, 0) 

    return (

        <div className="card flex flex-row px-2 py-2">

            <div className="card-details flex flex-row  rounded-lg bg-gray-200 h-12 w-full">
                <img src={props.imagem}
                    alt="thumnail" className="tumbnail rounded-lg px-py "
                    height="50" width="75" />

                <div className="top flex flex-row justify justify-between  space-x-16">
                    <div className=" flex flex-col w-16">
                        <p className=" text-[11px] font-sans pl-2">
                            {props.event?.nome}
                        </p>
                    </div>
                    <div className="flex flex-col w-16">
                        <p className="text-[11px] font-sans ">
                            Quantidade: 
                        </p>
                        <p className="text-[11px] font-sans  ">
                            {quantidadeIngressos}X
                        </p>
                        <p className="text-[8px] font-sans my-2">Total:{(valorTotal)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>


                </div>

            </div>


        </div>
    )
}