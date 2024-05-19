'use client'
import React from 'react';
import { Typography, Input, Button } from '../../../components/ClientSide';
import { data } from './../../../data/eventsData/data';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';



const RecSenhaPage: React.FC = () => {
    const router = useRouter();


    type loginFormData = z.infer<typeof loginASchema>;

    const loginASchema = z.object({
        email: z.string().email({ message: 'Email inválido' }),

    })
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginASchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            email: '',
        },

    });


    async function esquecerSenha(data: any) {
        const res = await fetch("/api/usuario/esqueceu-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: `${data.email}` })
        })
    }

    const rende = async (data: any) => {
        esquecerSenha(data);
        router.push('/auth/sign-in');
    }

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen '>
            <form onSubmit={handleSubmit(rende)} className='w-[90%] md:w-[25%] md:h-[50%] h-[60%]  flex flex-col items-center justify-center bg-white gap-2 rounded-lg'>
                <Typography variant="h4">Recuperação de Senha</Typography>
                <Typography variant="h5">Digite o seu email:</Typography>
                <div className='w-[80%] mt-8 mb-8 gap-2'>
                    <Input {...register('email')} type="email" label="Email"></Input>
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    <Button fullWidth className='mt-8' type='submit'>Enviar</Button>
                </div>

            </form>
        </div>
    )
}

export default RecSenhaPage;