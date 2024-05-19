'use client'
import CartTickets from "@/components/ShoppingCart/CartTickets"
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import {  useState, useEffect } from "react";
import { Evento, Eventos } from "../../../../lib/evento";

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
    return []}


      
export default function ListTickets(){
    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const  data = await reponse.json();
        setEvents(data);
      }
    
    useEffect(() => {
          fetchEvents();
      }, []);
    
    const [events, setEvents] = useState<Eventos>([]);
    const { cartItems } = useShoppingCart()

    let cartEventos: Eventos = []
    cartEventos = cartItems?.reduce((resultado:Eventos, item) =>{
              const evento = searchLotacao(events, item.id)[0];
              if (!resultado?.includes(evento)) {
                resultado?.push(evento);
              }
                return resultado;
        }, [])
        
    return(
        <div className="bg-[#FFF9F9] w-[350px] min-h-[615px] mt-3 rounded-xl flex flex-col items-center">
            <h1 className="text-center text-[30px]">Carrinho de Compras</h1>
            {cartEventos.length == 0?"Carrinho está vazio":""}
            {cartEventos?.map((evento, index)=>(
                <CartTickets key={index} event={evento} banner={events.find((ev)=>ev.id === evento?.id)?.banner} lotacoes={evento?.lotacao}></CartTickets>
            ))||"Carrinho está vazio"}
        </div>
    )
}