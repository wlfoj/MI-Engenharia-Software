'use client'
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type loginFormData = z.infer<typeof loginASchema>;

const loginASchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(3, { message: 'Senha deve conter no mínimo 8 caracteres' }),
})

const LoginAdm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [credentials, setCredentials] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginASchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
        },

    });




    const onSubmit = async (data: loginFormData) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (result && result.error === 'CredentialsSignin') {
            result.error ? setCredentials(true) : setCredentials(false);
        }

    }

    useEffect(() => {
        const redirectToRolePage = async () => {
            if (session && session.user) {
                if (session.user.role === "cliente") {
                    router.push("/");
                } else if (session.user.role === "promoter") {
                    router.push("/promoter/eventos");
                } else if (session.user.role === "administrador") {
                    router.push("/administrador/eventos");
                }
            }
        };

        redirectToRolePage();
    }, [session]);


    return (

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {credentials && <p className="text-red-500 text-xs">Email ou senha não são compatíveis</p>}
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                        {...register('email')}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Senha
                    </label>
                    <div className="text-sm">
                        <Link href="/auth/recsenha" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Esqueceu sua senha?
                        </Link>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        {...register('password')}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Entrar
                </button>
            </div>
        </form>
    )
}

export default LoginAdm;