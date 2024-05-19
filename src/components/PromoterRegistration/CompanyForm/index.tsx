import {
  Input,
  Button,
  ButtonGroup,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UseStepperContext from "../../../use/UseStepperContext";
import UsePromoterRegistrationContext from "@/use/UsePromoterRegistrationContext";

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

  function formatCNPJ(value:string) {
    return value
    .replace(/[^0-9]/g, "")
    .replace(/^([0-9]{2})([0-9]{1,3})$/, "$1.$2")
    .replace(/^([0-9]{2})([0-9]{3})([0-9]{1,3})$/, "$1.$2.$3")
    .replace(/^([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{1,4})$/, "$1.$2.$3/$4")
    .replace(/^([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{1,2})$/, "$1.$2.$3/$4-$5")
    }

type CompanyFormData = z.infer<typeof CompanyFormSchema>;

const CompanyFormSchema = z.object({
name: z.string().min(1),
CPF: z.string(),
CNPJ: z.string(),
phone: z.string().min(15),

}).refine((data) => data.CNPJ.length === 18 || data.CPF.length === 14, {
  path: ["CPF", "CNPJ"],
});

export default function CompanyForm() {

  const [select, setSelect] = React.useState(0);
  const handleSelectFisicPerson = () => {setSelect(0); setValue("CPF","")};
  const handleSelectJuridicPerson = () => {setSelect(1); setValue("CNPJ","")};

  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoCompanyForm, setInfoCompanyForm } = UsePromoterRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CompanyFormData>({
      resolver: zodResolver(CompanyFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
              name: infoCompanyForm.name,
              CPF: infoCompanyForm.CPF,
              CNPJ: infoCompanyForm.CNPJ,
              phone: infoCompanyForm.phone,
          },
    })

  const onSubmit = (data: CompanyFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });

    setInfoCompanyForm({
      name: data.name,
      CPF: data.CPF,
      CNPJ: data.CNPJ,
      phone: data.phone,
  });
  }

  const CPF = watch("CPF")
  const CNPJ = watch("CNPJ")
  const phone = watch("phone")

  useEffect(() => {
    setValue("CPF", formatCPF(CPF))
  },[CPF])

  useEffect(() => {
    setValue("CNPJ", formatCNPJ(CNPJ))
  },[CNPJ])


  useEffect(() => {
    setValue("phone", formatPhone(phone))
  },[phone])
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
      <div className="flex flex-col w-full">
        <Typography variant="h6" className="text-[#404c76]">Tipo de Conta</Typography>
        <div className="flex flex-row w-full mt-2 gap-4">
          <Button variant="outlined" 
          className={select === 0 ? "text-[#404c76] border-[#404c76] focus:ring-transparent" : "text-blue-gray-200 border-blue-gray-200 focus:ring-transparent"} 
          onClick={handleSelectFisicPerson}>
            Pessoa Física
          </Button>
          <Button variant="outlined"
          className={select === 1 ? "text-[#404c76] border-[#404c76] focus:ring-transparent" : "text-blue-gray-200 border-blue-gray-200 focus:ring-transparent"} 
          onClick={handleSelectJuridicPerson}>
            Pessoa Jurídica
          </Button>
        </div> 
      </div>
     
      <Input size="lg" 
        label={select === 0 ? "Nome Completo*" : "Nome da Empresa*"}
        {...register("name")}
        color="indigo"
        error={Boolean(errors.name)}
        containerProps={{ className: "min-w-[0px]" }}
      />

      <div className="flex flex-row gap-4">{}
        {select === 0 ? <Input size="lg" 
        label="CPF"
        maxLength={14}
        {...register("CPF")}
        error={Boolean(errors.CPF)}
        containerProps={{ className: "min-w-[20px]" }}
        /> : <Input size="lg" 
        label="CNPJ"
        maxLength={18}
        {...register("CNPJ")}
        error={Boolean(errors.CNPJ)}
        containerProps={{ className: "min-w-[20px]" }}
        />}
      
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