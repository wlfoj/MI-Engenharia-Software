"use client";
import React, { useState } from "react";
import CardEventoAdm from "@/components/Admin/EventsAdmin";


export default function AdmHome() {

    interface IEndereco {
        rua: string;
        bairro: string;
        cidade: string;
    }
    
    const [numOfElement, setNumOfElement] = useState(6);

    //------ Consulta a API
    /*
    const [events, setEvents] = useState([]);
    
    const fetchEvents = async () => {
        const reponse = await fetch("/api/evento");
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
        eventData: [{
            id: 1,
            banner: "/img/event-banner/show_djavan.jpeg",
            nome: "Djavan turnê D",
            horaInicio: "2023-04-02T23:00:00.000Z",
            endereco: {
                rua: "Rua A",
                bairro: "Centro",
                cidade: "Recife",
            }
        },
        {
            id: 2,
            banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            nome: "Festival de Música",
            horaInicio: "2023-03-02T23:00:00.000Z",
            endereco: {
                rua: "Rua A",
                bairro: "Centro",
                cidade: "Rio de Janeiro",
            }
        },
        {
            id: 3,
            banner: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            nome: "Festa Junina",
            horaInicio: "2023-04-03T23:00:00.000Z",
            endereco: {
                rua: "Rua A",
                bairro: "Centro",
                cidade: "Campinas",
            }
        },
        {
            id: 4,
            banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            nome: "Baile de Formatura",
            horaInicio: "2023-05-04T23:00:00.000Z",
            endereco: {
                rua: "Rua A",
                bairro: "Centro",
                cidade: "Belo Horizonte",
            }
        },
        {
            id: 5,
            banner: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            nome: "Feira de Arte e Artesanato",
            horaInicio: "2023-06-05T23:00:00.000Z",
            endereco: {
                rua: "Rua A",
                bairro: "Centro",
                cidade: "Porto Alegre",
            }
        },
        {
            id: 6,
            banner: "https://alphaconvites.com.br/wp-content/uploads/2023/01/festa-antes-formatura-scaled-1-2048x1367.jpg",
            nome: "Evento 6",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 7,
            banner: "https://www.paxbahia.com.br/images/bl/festas-juninas-na-bahia-programacao.jpg",
            nome: "Evento 7",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 8,
            banner: "https://lesdemoiselles.com.br/wp-content/uploads/2022/04/pexels-javon-swaby-3279692-1024x683.jpg",
            nome: "Evento 8",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 11,
            banner: "https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg",
            nome: "Evento 11",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 21,
            banner: "https://alphaconvites.com.br/wp-content/uploads/2023/01/festa-antes-formatura-scaled-1-2048x1367.jpg",
            nome: "Evento 21",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 31,
            banner: "https://www.paxbahia.com.br/images/bl/festas-juninas-na-bahia-programacao.jpg",
            nome: "Evento 31",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 41,
            banner: "https://lesdemoiselles.com.br/wp-content/uploads/2022/04/pexels-javon-swaby-3279692-1024x683.jpg",
            nome: "Evento 41",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 51,
            banner: "https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg",
            nome: "Evento 51",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 61,
            banner: "https://alphaconvites.com.br/wp-content/uploads/2023/01/festa-antes-formatura-scaled-1-2048x1367.jpg",
            nome: "Evento 61",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 71,
            banner: "https://www.paxbahia.com.br/images/bl/festas-juninas-na-bahia-programacao.jpg",
            nome: "Evento 71",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        },
        {
            id: 81,
            banner: "https://lesdemoiselles.com.br/wp-content/uploads/2022/04/pexels-javon-swaby-3279692-1024x683.jpg",
            nome: "Evento 81",
            horaInicio: "2023-06-01T21:00:00.000Z",
            endereco: {
                rua: "Rua da Paz",
                bairro: "Centro",
                cidade: "São Paulo",
            }
        }
        ]
    };
    // ----- Fim Dados sem BD -----------

    const slice = data.eventData.slice(0, numOfElement);  //const slice = events.slice(0, numOfElement);

    function formatDate(date: string): string {
        const fullDate = date.slice(0,16).replaceAll('-', '/').replaceAll('T', '-').split('-');   
        const dateymdA = fullDate[0].split('/').reverse();      // Obtém o ano, mês e dia para ordenar como -> dia/mês/ano
        const dateymdS = `${dateymdA[0]}/${dateymdA[1]}/${dateymdA[2]}`;    // Formata a data para ser exibida corretamente
        return `${dateymdS} - ${fullDate[1]}`
    }

    function formatLocalEvento(endereco: IEndereco): string {
        return endereco.rua + ", " + endereco.bairro + ", " + endereco.cidade
    }

    const loadMore = () => {
        setNumOfElement(numOfElement + numOfElement)
    }

    return (
        <div className="flex flex-col h-full items-center justify-center mt-4 pt-20 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
            <div className="grid grid-cols-12 md:col-span-6 xl:col-span-4 h-full xl:gap-x-14 md:gap-8 gap-y-8 mt-4 mb-4">  {/*Layout para essa página*/}
                {slice.map((item, index) => {
                    return (<CardEventoAdm key={item.id} imagemEvento={item.banner} nomeEvento={item.nome} dataEvento={formatDate(item.horaInicio)} localEvento={formatLocalEvento(item.endereco)} evento={item.id} />)
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