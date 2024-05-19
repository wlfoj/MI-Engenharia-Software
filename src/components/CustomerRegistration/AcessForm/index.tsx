import {
  Input,
  Button,
  Typography,
} from "../../ClientSide";
import React from "react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseStepperContext from "../../../use/UseStepperContext";
import { useForm } from "react-hook-form";
import UseCustomerRegistrationContext from "../../../use/UseCustomerRegistrationContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdEmail } from "react-icons/md";
import Password from "@/components/ChangePassword";

type AcessFormData = z.infer<typeof AcessFormSchema>;

const AcessFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  passwordConfirm: z.string(),
})
.refine((data) => data.password === data.passwordConfirm, {
  message: "Senhas diferentes",
  path: ["passwordConfirm"],
});

export default function AcessForm() {
  const { infoStepper, setInfoStepper } = UseStepperContext();
  const { infoAcessForm, setInfoAcessForm, infoAdressForm, infoPersonalForm } = UseCustomerRegistrationContext();

  const { register, handleSubmit, formState: { errors } } = useForm<AcessFormData>({
      resolver: zodResolver(AcessFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
              email: infoAcessForm.email,
              password: infoAcessForm.password,
          },
    })
    
  
    async function createCliente(cliente: any) {
      const jaison = JSON.stringify({
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        data_nasc: cliente.data_nasc,
        usuario: {
          nome: cliente.nome,
          email: cliente.email,
          senha: cliente.password
        },
        endereco: {
          rua: cliente.rua,
          numero: cliente.numero,
          bairro: cliente.bairro,
          cidade: cliente.cidade,
          estado: cliente.estado,
          cep: cliente.cep,
          complemento: cliente.complemento,
        },
        cartao: {
          num_cartao: cliente.num_cartao,
          dono_cartao: cliente.dono_cartao,
          data_vencimento: cliente.data_vencimento,
          cvv: cliente.cvv,
        }
      })
  
      /* Mostrando no console do navegador o formato do json usado para enviar os dados para API */
      console.log("Exemplo de como o JSON para criação de um Cliente deve ser feito:\n" +
        jaison)
  
      /* Enviando de verdade para API */
      const res = await fetch("/api/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jaison
      })
    }

  const onSubmit = (data: AcessFormData) => {

    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });

    setInfoAcessForm({
      email: data.email,
      password: data.password,
    });

    const cliente = {
      nome: infoPersonalForm.name,
      cpf: infoPersonalForm.CPF.replace(/[.-]/gi,""),
      email: data.email,
      password: data.password,
      data_nasc: new Date(infoPersonalForm.birthDate),
      telefone: infoPersonalForm.phone.replace(/[()-\s)]/gi,""),
      rua: infoAdressForm.street,
      numero: Number(infoAdressForm.number),
      bairro: infoAdressForm.district,
      cidade: infoAdressForm.city,
      estado: infoAdressForm.state,
      cep: infoAdressForm.CEP,
      complemento: infoAdressForm.complement,
      num_cartao: null,
      dono_cartao: null,
      data_vencimento: null,
      cvv: null,
    }

    createCliente(cliente)
}

  const handlePrev = (e: any) => {
    setInfoStepper({
      activeStep: infoStepper.activeStep-1
    });
  
  }

return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
   
    <Input size="lg" 
      label="E-mail*" 
      containerProps={{ className: "min-w-[72px]" }}
      {...register("email")}
      color="indigo"
      error={Boolean(errors.email)}
    />   

    <Input size="lg" 
      type="password"
      label="Senha*" 
      containerProps={{ className: "min-w-[72px]" }}
      {...register("password")}
      color="indigo"
      error={Boolean(errors.password)}
    /> 

    <div className="flex flex-col w-full">
      <Input size="lg" 
        type="password"
        label="Confirmação da Senha*" 
        containerProps={{ className: "min-w-[72px]" }}
        {...register("passwordConfirm")}
        color="indigo"
        error={Boolean(errors.passwordConfirm)}
      />
      {errors.passwordConfirm?.message && 
        <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
          <InformationCircleIcon className="w-4 h-4 -mt-px" />
          {errors.passwordConfirm?.message}
        </Typography> }
    </div>

    <div className="flex flex-row w-full justify-between mt-4 mb-8">
      <Button onClick={handlePrev} className="bg-[#404c76]  hover:shadow-[#404c76]/50">
        Voltar
      </Button>
      <Button type="submit" className="bg-[#404c76]  hover:shadow-[#404c76]/50">
        Próximo
      </Button>
    </div>
  </form>
);
}