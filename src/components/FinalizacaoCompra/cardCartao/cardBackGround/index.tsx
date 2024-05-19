"use client"
import CardCartaoItem from "../cardCartaoItem"
import Dropdown from "../dropdownParcelas"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Data {
    id: number;
    perfil_foto: string | null;
    cpf: string;
    data_nasc: string;
    id_usuario: number;
    id_cartao: number;
    id_endereco: number;
    telefone: string;
    endereco: {
        id: number;
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
        complemento: string;
    };
    usuario: {
        id: number;
        nome: string;
        email: string;
        senha: string;
    };
    cartao: {
        id: number;
        num_cartao: string;
        dono_cartao: string;
        data_vencimento: string;
        cvv: string;
    };
    compras: any[];
}


export default function CardCartao() {

    const [type, setType] = useState("registrationData");
    const [data, setData] = useState<Data | null>(null);
    const { data: session } = useSession();
    console.log(session)
    const cpf = session?.user?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof cpf === 'undefined') {
                    // Se o cpf for undefined, aguarde 1 segundo e chame a função novamente
                    setTimeout(fetchData, 1000);
                    return;
                }
                const response = await fetch(`/api/cliente/${cpf}`);
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [cpf]);

    return (
        <div className="container py-auto mx-auto">
            <div className="bg-white overflow-y-auto sm:h-[150px] md:w-64 md:h-[155px] lg:h-[210px] w-96 rounded-lg  ">

                <h6 className="font-semibold px-2">Método de Pagamento</h6>

                <CardCartaoItem finalCartao= {data?.cartao.num_cartao.slice(14)} dataVencimento = {data?.cartao.data_vencimento} />

                <div className="relative flex flex-col justify-center items-center gap-5 pt-1">
                    <Dropdown />
                </div>
            </div>

        </div>
    )
}