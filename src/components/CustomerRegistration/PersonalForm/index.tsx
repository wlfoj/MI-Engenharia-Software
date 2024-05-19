'use client';

import {
  Input,
  Button,
} from "../../ClientSide";
import React, { useEffect } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UseStepperContext from "../../../use/UseStepperContext";
import UseCustomerRegistrationContext from "../../../use/UseCustomerRegistrationContext";

function formatPhone(value:string) {
  return value
  .replace(/[^0-9]/g, "")
  .replace(/^([0-9]{1,2})$/, "($1)")
  .replace(/^([0-9]{2})([0-9]{1})$/, "($1)$2")
  .replace(/^([0-9]{2})([0-9]{1})([0-9]{1,4})$/, "($1)$2 $3")
  .replace(/^([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{1,4})$/, "($1)$2 $3-$4")
  }
  
  function formatCPF(value:string) {
  return value
  .replace(/[^0-9]/g, "")
  .replace(/^([0-9]{3})([0-9]{1,3})$/, "$1.$2")
  .replace(/^([0-9]{3})([0-9]{3})([0-9]{1,3})$/, "$1.$2.$3")
  .replace(/^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{1,2})$/, "$1.$2.$3-$4")
  }

type PersonalFormData = z.infer<typeof PersonalFormSchema>;

const PersonalFormSchema = z.object({
name: z.string().min(1),
birthDate: z.string().min(10),
CPF: z.string().min(14),
phone: z.string().min(15),

})

export default function PersonalForm() {
  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoPersonalForm, setInfoPersonalForm } = UseCustomerRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PersonalFormData>({
      resolver: zodResolver(PersonalFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
              name: infoPersonalForm.name,
              birthDate: infoPersonalForm.birthDate,
              CPF: infoPersonalForm.CPF,
              phone: infoPersonalForm.phone,
          },
    })

  const onSubmit = (data: PersonalFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });

    setInfoPersonalForm({
      name: data.name,
      birthDate: data.birthDate,
      CPF: data.CPF,
      phone: data.phone,
  });
  }

  const CPF = watch("CPF")
  const phone = watch("phone")

  useEffect(() => {
    setValue("CPF", formatCPF(CPF))
  },[CPF])

  useEffect(() => {
    setValue("phone", formatPhone(phone))
  },[phone])
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
      <Input size="lg" 
        label="Nome Completo*" 
        {...register("name")}
        color="indigo"
        error={Boolean(errors.name)}
        containerProps={{ className: "min-w-[20px]" }}
      />

      <Input size="lg" 
        label="Data de Nascimento" 
        maxLength={10}
        type="date"
        {...register("birthDate")}
        error={Boolean(errors.birthDate)}
        containerProps={{ className: "min-w-[20px]" }}
      />
      <div className="flex flex-row gap-4">
        <Input size="lg" 
        label="CPF*" 
        maxLength={14}
        {...register("CPF")}
        error={Boolean(errors.CPF)}
        containerProps={{ className: "min-w-[20px]" }}
        />
      
        <Input size="lg" 
          label="Telefone*" 
          maxLength={15}
          {...register("phone")}
          error={Boolean(errors.phone)}
          containerProps={{ className: "min-w-[20px]" }}
        />
      </div>
      <div className="flex flex-row w-full justify-end mt-4 mb-8">
        <Button type="submit" className="bg-[#404c76] hover:shadow-[#404c76]/50">
          Próximo
        </Button>
      </div>
    </form>
  
  );
}