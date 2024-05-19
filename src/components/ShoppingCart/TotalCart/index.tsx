'use client'
import {  useState, useEffect } from "react";
import {Button} from '@/components/ClientSide'
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import Link from 'next/link';
import { Eventos } from "../../../../lib/evento";

export default function TotalCart(){
    const { cartItems } = useShoppingCart()

    const [eventos, setEventos] = useState<Eventos>([]);
    
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

    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const  data = await reponse.json();
        setEventos(data);
    }
  
    useEffect(() => {
        fetchEvents();
    }, []);

    return(
        <div className="flex flex-col w-[350px] h-[200px] bg-[#FFF9F9] rounded-lg">

            <h1 className="text-center text-[30px]">Total do Carrinho:</h1>

            <div className="flex items-center justify-center m-auto bg-[#D9D9D9] h-[50px] w-[270px]">
                <div className="text-center text-[30px]">
                    {
                    (cartItems?.reduce((total, cartItem) => {
                    const item = searchLotacao(eventos, cartItem.id)[1]
                    return total + (item?.valorTotal || 0) * cartItem.quantidade
                    }, 0) || "R$0,00").toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                
                </div>
            </div>

            <div className="flex flex-col items-center mt-auto mb-2">
                <Link href={'/cliente/finalizacaoCompra'}><Button className="bg-purple-800 w-[140px] h-[40px] p-0 rounded-xl">Fechar pedido</Button></Link> 
            </div>
        </div>
    )
}