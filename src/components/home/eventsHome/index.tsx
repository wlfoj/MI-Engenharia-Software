'use client'
import { data } from '@/data/eventsData/data';
import { useState, useEffect } from 'react';
import EventCard from '@/components/home/eventCard';

interface Evento {
    id: number,
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

function dataDaHora(hora: string){
  const horammdd = hora.slice(0, 10);
  const horaddmm = horammdd.slice(8, 10) + "/" + horammdd.slice(5, 7) + "/" + horammdd.slice(0, 4);
  return horaddmm;
}

export default function EventsHome() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    
    const fetchEvents = async () => {
        const reponse = await fetch(`/api/evento`);
        const  data = await reponse.json();
        setEventos(data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);
    
    return (
        <div>
        {eventos.map((evento, index) =>(
            <div key={index}>
                
                <EventCard id= {evento.id} imagem={evento.banner} data={dataDaHora(evento.horaInicio)} local={`${evento.endereco.cidade} - ${evento.endereco.estado}`}>
                    {evento.nome}
                </EventCard>
            </div>
        ))}
        </div>
    )
}
