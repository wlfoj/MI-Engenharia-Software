"use client";
import CardPreco from "../cardBackGround"
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import { useState, useEffect } from "react";
import { Evento, Eventos } from "../../../../../lib/evento";
import Preco from "../CardPreco";

function searchLotacao(eventos: any, lotacaoId: number) {
    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];
        for (let i = 0; i < evento.lotacao.length; i++) {
            const lotacao = evento.lotacao[i];
            if (lotacao.id === lotacaoId) {
                return [evento, lotacao]
            }
        }
    }
    return []
}

export default function CardPrecoTotal(props:any){

    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const data = await reponse.json();
        setEvents(data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const [events, setEvents] = useState<Eventos>([]);
    const { cartItems } = useShoppingCart()

    let cartEventos: Eventos = []
    cartEventos = cartItems?.reduce((resultado: Eventos, item) => {
        const evento = searchLotacao(events, item.id)[0];
        if (!resultado?.includes(evento)) {
            resultado?.push(evento);
        }
        return resultado;
    }, []) 

    return(
        <div className="card flex flex-row  px-2 py-2 h-[220px]">

        <div className="flex flex-row rounded-lg  sm:h-[120px] sm:w-[450px] md:h-[130px] md:w-[300px]  lg:w-[300px] lg:h-[200px] px-2 py-2">

                <h2 className="font-semibold px-1 text-[11px] ">Ingressos:</h2> 

                <div className="flex flex-col items-end ">
                    
                    <div>
                    {cartEventos?.map((evento, index) => (
                        <Preco key={index} lotacoes = {evento?.lotacao}/> 
            
                    )) }
                    
                    <p className="font-sans text-[8px] sm:px-60 md:px-28 py-1">Total: {
                    (cartItems?.reduce((total, cartItem) => {
                    const item = searchLotacao(events, cartItem.id)[1]
                    return total + (item?.valorTotal || 0) * cartItem.quantidade
                    }, 0) || "R$0,00").toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>

                    <button className="bg-purple-800  h-[23px] w-[100px] rounded-lg font-sans text-[10px] text-white">Finalizar Pagamento</button>
                    
                    </div>

                    
                    
                </div>

                

                

        </div>

        </div>
    )
}