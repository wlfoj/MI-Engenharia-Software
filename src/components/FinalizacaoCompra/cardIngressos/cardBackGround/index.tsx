"use client";
import CardIngressoItem from "../cardIngressosItem"
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import { useState, useEffect } from "react";
import { Evento, Eventos } from "../../../../../lib/evento";



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



export default function CardIngresso() {

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

   

    return (
        <div className="container  mx-auto">

            <div className="bg-white overflow-y-auto sm:h-52 md:w-72 md:h-[340px]  lg:h-96 w-96 rounded-lg ">

                <h6 className="text font-semibold px-2">Revisar Ingressos</h6>

                <div>
                    {cartEventos?.map((evento, index) => (
                        <CardIngressoItem key={index} event={evento} imagem={events.find((ev) => ev.id === evento?.id)?.banner} lotacoes={evento?.lotacao}/>
                    )) || "Nenhum ingresso foi adicionado ao carrinho"}

                </div>
            </div>

        </div>
    )
}