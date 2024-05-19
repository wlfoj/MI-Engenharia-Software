import UseStepperContext from "../../../use/UseStepperContext";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "../../ClientSide";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UsePromoterRegistrationContext from "@/use/UsePromoterRegistrationContext";

function formatCEP(value:string) {
  return value
  .replace(/[^0-9]/g, "")
  .replace(/^([0-9]{5})([0-9]{1,3})$/, "$1-$2")
  }

type AdressFormData = z.infer<typeof AdressFormSchema>;

const AdressFormSchema = z.object({
  CEP: z.string().min(9),
  state: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string(),

})

export default function AdressForm() {

  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoAdressForm, setInfoAdressForm } = UsePromoterRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AdressFormData>({
      resolver: zodResolver(AdressFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
              CEP: infoAdressForm.CEP,
              state: infoAdressForm.state,
              city: infoAdressForm.city,
              district: infoAdressForm.district,
              street: infoAdressForm.street,
              number: infoAdressForm.number,
              complement: infoAdressForm.complement,
          },
    })

  const onSubmit = (data: AdressFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });
    
    setInfoAdressForm({
      CEP: data.CEP,
      state: data.state,
      city: data.city,
      district: data.district,
      street: data.street,
      number: data.number,
      complement: data.complement,
  });
}
  const handlePrev = (e: any) => {
    setInfoStepper({
      activeStep: infoStepper.activeStep-1
    });
  }

  const CEP = watch("CEP")

  useEffect(() => {
    setValue("CEP", formatCEP(CEP))
  },[CEP])

return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
    <div className="flex flex-row gap-4">
      <Input size="lg" 
        maxLength={9}
        label="CEP*" 
        {...register("CEP")}
          color="indigo"
          error={Boolean(errors.CEP)}
          containerProps={{ className: "min-w-[20px]" }}
      />
      <Input size="lg" 
        label="Estado*" 
        {...register("state")}
          color="indigo"
          error={Boolean(errors.state)}
          containerProps={{ className: "min-w-[20px]" }}
      />
    </div>
    <div className="flex flex-row gap-6">
      <Input size="lg" 
        label="Cidade*" 
        {...register("city")}
          color="indigo"
          error={Boolean(errors.city)}
          containerProps={{ className: "min-w-[20px]" }}
      />
      <Input size="lg" 
        label="Bairro*" 
        {...register("district")}
          color="indigo"
          error={Boolean(errors.district)}
          containerProps={{ className: "min-w-[20px]" }}
      />
    </div>
    <div className="flex flex-row gap-6">
      <Input size="lg" 
        label="Rua*" 
        {...register("street")}
          color="indigo"
          error={Boolean(errors.street)}
          containerProps={{ className: "min-w-[20px]" }}
      />
      <Input size="lg" 
        label="Número*" 
        {...register("number")}
          color="indigo"
          error={Boolean(errors.number)}
          containerProps={{ className: "min-w-[20px]" }}
      />
    </div> 
    <Input size="lg" 
      label="Complemento" 
      {...register("complement")}
          color="indigo"
          error={Boolean(errors.complement)}
    />   
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