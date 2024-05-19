'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Input,
    Button,

} from "../../ClientSide";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';



type addressFormData = z.infer<typeof addressSchema>;

const addressSchema = z.object({
    cep: z.string().min(8, { message: 'Preencha o CEP corretamente' }),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.string().min(1, { message: 'Preencha a Número corretamente' }),
    complement: z.string(),
})


export default function EditAddress() {

    const [cep, setCep] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [estado, setEstado] = useState([] as any);
    const [erro, setErro] = useState(false);


    const handleChangeCep = (event: any) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/\D/g, '');
        setCep(sanitizedValue);
    };

    const handleChangeState = (event: any) => {
        if (cep.length === 8) {
            return;
        }
        const { value } = event.target;
        const sanitizedValue = value.replace(/[0-9]/g, ''); 
        setState(sanitizedValue);
    };

    const handleChangeCity = (event: any) => {
        if (cep.length === 8) return;
        const { value } = event.target;
        const sanitizedValue = value.replace(/[0-9]/g, ''); 
        setCity(sanitizedValue);
    }

    const handleChangeNeighborhood = (event: any) => {
        if (cep.length === 8 && estado[1] !== "") return;
        const { value } = event.target;
        const sanitizedValue = value.replace(/[0-9]/g, ''); 
        setNeighborhood(sanitizedValue);
    }

    const handleChangeStreet = (event: any) => {
        if (cep.length === 8 && estado[0] !== "") return;
        const { value } = event.target;
        const sanitizedValue = value.trim(); 
        setStreet(sanitizedValue);
    }

    const handleChangeNumber = (event: any) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/\D/g, '');
        setNumber(sanitizedValue);
    }


    const handleFetchCep = useCallback(async (cep: string) => {
        const data = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        console.log(data);
        const response = data.data;
        if (response.erro) {
            setErro(true);
            return;
        }
        setEstado([response.logradouro, response.bairro]);
        setState(response.uf);
        setCity(response.localidade);
        setNeighborhood(response.bairro);
        setStreet(response.logradouro);
        setErro(false);

    }, []);

    useEffect(() => {
        if (cep.length !== 8) return;
        handleFetchCep(cep);
    }, [cep]);

    const { register,watch, handleSubmit, formState: { errors } } = useForm<addressFormData>({
        resolver: zodResolver(addressSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            cep: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: '',
        },

    });

    const { data: session } = useSession();
    const router = useRouter();

    async function editAddress(data: addressFormData) {
        const jaison = {
            rua: street,
            numero: parseInt(data.number),
            bairro: neighborhood,
            cidade: city,
            estado: state,
            cep: data.cep,
            complemento: data.complement,
            identificadorDoDono: session?.user?.id,
            tipoDoUsuario: 'cliente'

        }
        await axios.put("/api/endereco", jaison);

    }


    const onSubmit = (data: addressFormData) => {
        if(erro === true) return;
        editAddress(data);
        router.push('/profile/costumer');
    }


    return (
        <div className="w-full h-[80vh] md:h-[80vh] md:w-[70%] lg:w-[60%] xl: gap-3 flex flex-col justify-center items-center overflow-auto bg-white rounded-xl">
            <h2 className="text-2xl font-bold text-center">Editar Endereço</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 overflow-auto">
                <Input {...register('cep')} type='text' value={cep} onChange={handleChangeCep} maxLength={8} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='CEP*'></Input>
                {errors.cep?.message && <p className="text-red-500 text-sm">{errors.cep?.message}</p>}
                {erro && <p className="text-red-500 text-sm">CEP não encontrado</p>}
                <Input {...register('state')} value={state} onChange={handleChangeState} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Estado*' />
                <Input {...register('city')} value={city} onChange={handleChangeCity} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Cidade*' />
                <Input {...register('neighborhood')} value={neighborhood} onChange={handleChangeNeighborhood} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Bairro*' />
                {errors.neighborhood?.message && <p className="text-red-500 text-sm">{errors.neighborhood?.message}</p>}
                <Input {...register('street')} value={street} onChange={handleChangeStreet} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Logradouro*' />
                {errors.street?.message && <p className="text-red-500 text-sm">{errors.street?.message}</p>}
                <Input {...register('number')} value={number} onChange={handleChangeNumber} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Número*' />
                {errors.number?.message && <p className="text-red-500 text-sm">{errors.number?.message}</p>}
                <Input {...register('complement')} className='w-[15rem] sm:w-[20rem] lg:w-[30rem]' label='Complemento' />
                <div className='flex flex-col md:flex-row w-full gap-2'>
                    <Link className="w-full" href='/profile/costumer'><Button fullWidth color="red">Cancelar</Button></Link>
                    <Button type='submit' fullWidth>Salvar</Button>
                </div>
            </form>
        </div>

    )
}
