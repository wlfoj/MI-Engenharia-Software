"use client";
import React, { useEffect, useState } from "react";
import CardEventoAdm from "@/components/TicketList/Card";


export default function ActiveTickets() {

    
    const [numOfElement, setNumOfElement] = useState(6);

    //------ Consulta a API
    /*
    const [events, setEvents] = useState([]);
    
    const fetchEvents = async () => {
        const reponse = await fetch("http://localhost:3000/api/evento");
        const  data = await reponse.json();
        setEvents(data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);
    
    */
    // ----- Fim Consulta a API

    // ----- Dados sem BD -----------
    const data = {
        eventData: [
        {
            id: 3,
            banner: "https://www.paxbahia.com.br/images/bl/festas-juninas-na-bahia-programacao.jpg",
            nome: "Evento 33",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Jardim das Flores",
                cidade: "São Paulo",
            }
        },
        {
            id: 4,
            banner: "https://lesdemoiselles.com.br/wp-content/uploads/2022/04/pexels-javon-swaby-3279692-1024x683.jpg",
            nome: "Evento 44",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Jardim das Flores",
                cidade: "São Paulo",
            }
        },
        {
            id: 21,
            banner: "https://alphaconvites.com.br/wp-content/uploads/2023/01/festa-antes-formatura-scaled-1-2048x1367.jpg",
            nome: "Evento 214",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Jardim das Flores",
                cidade: "São Paulo",
            }
        },
        ]
    };
    // ----- Fim Dados sem BD -----------

    const slice = data.eventData.slice(0, numOfElement);  //const slice = events.slice(0, numOfElement);

    function formatDate(date: string): string {
        const dd = date.slice(0,16).replaceAll('-', '/').replaceAll('T', '-').split('-');   
        return dd[0] + " - " + dd[1]
    }

    const loadMore = () => {
        setNumOfElement(numOfElement + numOfElement)
    }

    return (
        <div className="flex flex-col h-full items-center justify-center mt-4 ">
            <div className="grid grid-cols-12 md:col-span-6 xl:col-span-4 h-full xl:gap-x-14 md:gap-8 gap-y-8 mt-4 mb-4">  {/*Layout para essa página*/}
                {slice.map((item, index) => {
                    return (<CardEventoAdm imagemEvento={item.banner} nomeEvento={item.nome} dataEvento={formatDate(item.horaInicio)} localEvento={item.endereco.rua + ", " + item.endereco.bairro + ", " + item.endereco.cidade} evento="/ticket" />)
                })}
                <div className="object-center text-center col-span-12 mt-10 mb-3">
                    <button className="bg-roxo-wil h-[36px] w-[230px] text-white font-sans text-sm font-semibold text-center object-center rounded-full shadow-md shadow-black/40" onClick={() => loadMore()}>
                        MAIS EVENTOS
                    </button>
                </div>
            </div>
        </div>


    )
}