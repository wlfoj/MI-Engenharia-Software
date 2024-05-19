'use client'
import {Carousel} from "../../ClientSide";
import { data } from '@/data/eventsData/data';
import { useState, useEffect } from 'react';
import { getEventos } from "../../../../lib/evento";

interface Evento {
  nome: string,
  horaInicio: string,
  horaFim: string,
  descricao: string,
  banner: string,
  id_endereco: number,
  id_promoter: string,
  status: string,
  endereco: {
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    numero: number,
    rua: string,
    complemento: string
  }
  lotacoes: [
    lotacao: {
      id_perfil: number,
      id_setor: number,
      quantidade: number,
      valorTotal: number
    }
  ]
}

export default function Carrossel(props: any){
    const [eventosCarrossel, setEventosCarrossel] = useState<Evento[]>([]);
  
    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const  data = await reponse.json();
        setEventosCarrossel(data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    
    return(
        <Carousel className="rounded-xl">

          {eventosCarrossel.map((evento, index) =>(
            <div key={index} className="h-full">
              <img src={evento.banner} alt={evento.nome} className="h-full w-full object-cover lg:px-[150px]"/>
            </div>
          ))}
      </Carousel>
    )
}