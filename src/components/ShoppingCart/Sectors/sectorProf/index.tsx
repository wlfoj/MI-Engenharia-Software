import {Button} from '@/components/ClientSide'
import {  useState, useEffect } from "react";
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import { Evento } from '../../../../../lib/evento';

  function searchLotacao (eventos: any, lotacaoId: number) {
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


export default function SectorProf(props:any){
    const [events, setEvents] = useState<Evento[]>([]);
    const {  getItemQuantityDef, 
        increaseCartQuantityDef, 
        decreaseCartQuantityDef} = useShoppingCart()

    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const  data = await reponse.json();
        setEvents(data);
    }
 
    useEffect(() => {
        fetchEvents();
    }, []);

    function handleInc(){
        increaseCartQuantityDef(props.id)
    }

    function handleDec(){
        decreaseCartQuantityDef(props.id)
    }
    const perfis = ['Inteira', 'Meia', 'Gratuita']
    const quantidade = getItemQuantityDef(props.id)
    const item = searchLotacao(events, props.id)[1]
    return(
        <div className="grid grid-cols-3 h-[30px]">

            <p className="flex mx-auto text-center items-center text-[14px] text-[#404C76] font-bold">{perfis[item?.id_perfil - 1]}</p>
            
            <div className="flex mx-auto text-center items-center">
                
                <Button onClick={() => handleDec()} className="h-[15px] w-[15px] p-0 text-blue-gray-700 bg-gray-500">-</Button>

                <p className='mx-1 bg-[#D9D9D9] text-[16px] w-[20px]'>{quantidade}</p>

                <Button onClick={() => handleInc()} className="h-[15px] w-[15px] p-0 text-blue-gray-700 bg-gray-500">+</Button>
                
                <Button className="h-[20px] w-[20px] p-0 bg-transparent ml-1">
                    <img src="/icons/bin.svg" alt="" className="h-[15px] w-[15px]"/>
                </Button>
            </div>

            <div className= "flex ml-1 col-auto row-auto items-center">
                <p className="flex text-left text-[14px] items-center ">{(item?.valorTotal * quantidade).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
            </div>

        </div>
    )
}