import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseStepperContext from "../../../use/UseStepperContext";
import { useForm } from "react-hook-form";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import UsePromoterRegistrationContext from "@/use/UsePromoterRegistrationContext";
import CompanyForm from "../CompanyForm";

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
  const { infoAcessForm, setInfoAcessForm, infoAdressForm, infoCompanyForm } = UsePromoterRegistrationContext();

  const { register, handleSubmit, formState: { errors } } = useForm<AcessFormData>({
      resolver: zodResolver(AcessFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
              email: infoAcessForm.email,
              password: infoAcessForm.password,
          },
    })

    

    async function createPromoter(promoter: any) {
      const jaison = JSON.stringify({
        cpf: promoter.cpf,
        cnpj: promoter.cpnj,
        status: promoter.status,
        data_nasc: promoter.data_nasc,
        telefone: promoter.telefone,
        usuario: {
          nome: promoter.nome,
          email: promoter.email,
          senha: promoter.password
        },
        endereco: {
          rua: promoter.rua,
          numero: promoter.numero,
          bairro: promoter.bairro,
          cidade: promoter.cidade,
          estado: promoter.estado,
          cep: promoter.cep,
          complemento: promoter.complemento,
        }
      })
  
      /* Mostrando no console do navegador o formato do json usado para enviar os dados para API */
      console.log("Exemplo de como o JSON para criação de um Promoter deve ser feito:\n" +
        jaison)
  
      /* Enviando de verdade para API */
      const res = await fetch("/api/promoter", {
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
    })

    const promoter = {
      nome: infoCompanyForm.name,
      cpf: infoCompanyForm.CPF.replace(/[.-]/gi,""),
      cpnj: infoCompanyForm.CNPJ.replace(/[.-/]/gi,""),
      email: data.email,
      password: data.password,
      status: 'pendente',
      data_nasc: new Date("1999-05-30"),
      telefone: infoCompanyForm.phone.replace(/[()-\s)]/gi,""),
      rua: infoAdressForm.street,
      numero: Number(infoAdressForm.number),
      bairro: infoAdressForm.district,
      cidade: infoAdressForm.street,
      estado: infoAdressForm.state,
      cep: infoAdressForm.CEP,
      complemento: infoAdressForm.complement
    }
    
    createPromoter(promoter)
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