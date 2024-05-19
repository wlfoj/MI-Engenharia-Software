import {zodResolver} from '@hookform/resolvers/zod';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import React from 'react';





// Status auxiliares para exibir alerts para informar aos usuários
enum status {
	EMPTY, // status inicial
	SUCESS,
	ERROR,
}

// Validação de tipos no campo
type personalFormData = z.infer<typeof personalSchema>;

const personalSchema = z.object({
 	name: z.string(),
	email: z.string().email({message: 'O email é inválido'}),
	phone: z.string().regex(/^\d+$/, 'Apenas dígitos são permitidos').min(10, {message: 'Exemplo: 7100000000'}),
	street: z.string().min(1, {message: 'Exemplo: Novo horizonte'}),
	neighborhood: z.string().min(1, {message: 'Exemplo: Centro'}),
	complement: z.string(),
	number: z.string().min(1, {message: 'Exemplo: 1'}),
	city: z.string().min(1, {message: 'Exemplo: Feira de Santana'}),
	state: z.string().min(2, {message: 'Exemplo: BA'}),
	cep: z.string().regex(/^\d+$/, 'Apenas dígitos são permitidos').min(8, {message: 'Exemplo: 44000002'}),
  
	selectField: z.enum(['cpf', 'cnpj']),
	cpf_cnpj: z.string().regex(/^\d+$/, 'Apenas dígitos são permitidos').refine((value) => {
	return value.length === 11 || value.length === 14 ;
	}, { message: 'Formato inválido para CPF ou CNPJ' }),
})

export default function FormPersonalData(props: any) {
	// Para o alert
	const [statusAlert, setStatusAlert] = useState<status>(status.EMPTY);
  //
  const {register,handleSubmit,formState:{errors} } = useForm<personalFormData>({
      resolver: zodResolver(personalSchema),
      criteriaMode: 'all',
      mode: 'all',
      defaultValues: {
          name: props.user.usuario.nome,//
          cpf_cnpj: props.user.cpf ? props.user.cpf : props.user.cnpj,// 
          email: props.user.usuario.email,//
          phone: props.user.telefone,//
          street: props.user.endereco.rua,//
          neighborhood: props.user.endereco.bairro,
          complement: props.user.endereco.complemento,
          number: props.user.endereco.numero,
          city: props.user.endereco.cidade,//
          state: props.user.endereco.estado,//
          cep: props.user.endereco.cep,//
          selectField: props.user.cpf ? 'cpf' : 'cnpj'
      },
  	});

    const onSubmit = async (data: personalFormData) => {
      // Construindo o objeto de requisição
      const user_data: any = {};
      // Chama API
      const res = await fetch(`/api/usuario/alterar-senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: user_data
      })
      // Se conseguiu alterar a senha (200-OK)
      if (res.status == 200){
        setStatusAlert(status.SUCESS)
      }
      // Se o usuário preencheu algum campo de forma errada (400-BAD REQUEST)
      else if(res.status == 400){

      }
      // Se tiver dado problema no servidor (500-SERVIDOR ERROR)
      else if (res.status == 500){// Talvez colocar o else seja melhor
        setStatusAlert(status.ERROR)
      }

        console.log(data);
    }


  return (
 	
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

			{/* Nome */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
					{...register('name')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}
              </div>
            </div>

			{/* Identificador */}
            <div className="sm:col-span-3 flex">
				<div>
					<label className="block text-sm font-medium leading-6 text-gray-900">
						Identificador
					</label>
					<div className="mt-2 block sm:flex">
					<select disabled {...register('selectField')} className='block w-[80%] max-w-[90px] rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
						<option value="cpf">CPF</option>
						<option value="cnpj">CNPJ</option>
					</select>
						<input
              maxLength={props.user.cpf ? 11 : 14}
							{...register('cpf_cnpj')}
							type="text"
							className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					{errors.cpf_cnpj && <span className="text-red-500">{errors.cpf_cnpj.message}</span>}
				</div>
            </div>


			{/* Email */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
					{...register('email')}
                    type="email"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.email?.message && <span className="text-red-500">{errors.email?.message}</span>}
              </div>
            </div>

            {/* Telefone */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Telefone
              </label>
              <div className="mt-2">
                <input
					{...register('phone')}
                    type="phone"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
			  {errors.phone?.message && <span className="text-red-500">{errors.phone?.message}</span>}
            </div>

			{/* Endereço */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Rua
              </label>
              <div className="mt-2">
                <input
					{...register('street')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.street?.message && <span className="text-red-500">{errors.street?.message}</span>}
              </div>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Número
              </label>
              <div className="mt-2">
                <input
					{...register('number')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.number?.message && <span className="text-red-500">{errors.number?.message}</span>}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Bairro
              </label>
              <div className="mt-2">
                <input
					{...register('neighborhood')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.neighborhood?.message && <span className="text-red-500">{errors.neighborhood?.message}</span>}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Complemento
              </label>
              <div className="mt-2">
                <input
					{...register('complement')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.complement?.message && <span className="text-red-500">{errors.complement?.message}</span>}
              </div>
            </div>

			{/* Cidade */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Cidade
              </label>
              <div className="mt-2">
                <input
					{...register('city')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.city?.message && <span className="text-red-500">{errors.city?.message}</span>}
              </div>
            </div>

			{/* Estado */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <div className="mt-2">
                <input
					{...register('state')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.state?.message && <span className="text-red-500">{errors.state?.message}</span>}
              </div>
            </div>

			{/* CEP */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                CEP
              </label>
              <div className="mt-2">
                <input
					{...register('cep')}
                    type="text"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
				{errors.cep?.message && <span className="text-red-500">{errors.cep?.message}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md w-[150px] bg-[#404C76] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

function getValues() {
  throw new Error('Function not implemented.');
}
