"use client";
import CardEventoPromoter from "@/components/cardEventoPromoter"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

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

interface Promoter {
    cpf: string,
    cnpj: string,
    status: string,
    data_nasc: Date,
    telefone: string,
    id: string,
    usuario: {
        nome: string,
        email: string,
        senha: string
    },
    endereco: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string,
        complemento: string,
    }
}

export default function eventosPromoter() {

    const [numOfElement, setNumOfElement] = useState(6);

    const [eventos, setEventos] = useState<Evento[]>([]);
    const [promoter, setPromoter] = useState<Promoter | null>(null);

    const { data: session } = useSession();
    const cpf = session?.user?.id; 
   

    useEffect(() => {
        const fetchPromoter = async () => {
            try {
                if (typeof cpf === 'undefined') {
                    // Se o cpf for undefined, aguarde 1 segundo e chame a função novamente
                    setTimeout(fetchPromoter, 1000);
                    return;
                }
                const response = await fetch(`/api/promoter/${cpf}`);
                const jsonPromoter = await response.json();
                setPromoter(jsonPromoter);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPromoter();
    }, [cpf]);
    

    const fetchEvents = async () => {
        const reponse = await fetch("http://localhost:3000/api/evento");
        const data = await reponse.json();
        setEventos(data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);




    // ----- Fim Consulta a API

    const slice = eventos.slice(0, numOfElement);  //const slice = events.slice(0, numOfElement);

    function formatDate(date: string): string {
        const fullDate = date.slice(0, 16).replaceAll('-', '/').replaceAll('T', '-').split('-');
        const dateymdA = fullDate[0].split('/').reverse();      // Obtém o ano, mês e dia para ordenar como -> dia/mês/ano
        const dateymdS = `${dateymdA[0]}/${dateymdA[1]}/${dateymdA[2]}`;    // Formata a data para ser exibida corretamente
        return `${dateymdS} - ${fullDate[1]}`
    }

    function formatLocalEvento(endereco: any): string {
        return endereco.rua + ", " + endereco.bairro + ", " + endereco.cidade
    }

    const loadMore = () => {
        setNumOfElement(numOfElement + numOfElement)
    }

    return (
        <div className="flex flex-col h-full items-center justify-center mt-4 pt-20 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
            <div className="grid grid-cols-12 md:col-span-6 xl:col-span-4 h-full xl:gap-x-14 md:gap-8 gap-y-8 mt-4 mb-4">  {/*Layout para essa página*/}
                {slice.map((item, index) => {
                        if(item.id_promoter == promoter?.id){
                        return (<CardEventoPromoter key={item.id} imagem={item.banner} nome={item.nome} data={formatDate(item.horaInicio)} local={formatLocalEvento(item.endereco)} evento={item.id} /> )
                    } 
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