import UseStepperContext from "../../../use/UseStepperContext";
import {
  Input,
  Button,
  Select
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseEventRegistrationContext from "../../../use/UseEventRegistrationContext";

type TicketFormData = z.infer<typeof TicketFormSchema>;

const TicketFormSchema = z.object({
    sector: z.string(),
    profile: z.string(),
    amount: z.string(),
    price: z.string(),
})

export default function TicketForm() {

  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoTicketForm, setInfoTicketForm } = UseEventRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TicketFormData>({
      resolver: zodResolver(TicketFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
            sector: infoTicketForm.sector,
            profile: infoTicketForm.profile,
            amount: infoTicketForm.amount,
            price: infoTicketForm.price,
          },
    })

  const onSubmit = (data: TicketFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });
    
    setInfoTicketForm({
      sector: data.sector,
      profile: data.profile,
      amount: data.amount,
      price: data.price,
  });
}

const handlePrev = (e: any) => {
  setInfoStepper({
    activeStep: infoStepper.activeStep-1
  });
}

return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
    <div>
    <label htmlFor="Setor" className="block mb-2 text-sm font-medium left text-[#607d8b]">Setor do Ingresso</label>
    <select
      id="Setor"
      className="bg-transparent border border-[#607d8b] text-[#607d8b] text-sm rounded-lg focus:ring-[#404c76] focus:border-[#404c76] block w-full p-2.5"
      {...register("sector")}>
      <option value="area-vip">Área vip</option>
      <option value="backstage">Backstage</option>
      <option value="camarote">Camarote</option>
      
    </select>
    </div>
    <div>
    <label htmlFor="perfil" className="block mb-2 text-sm font-medium text-[#607d8b]">Perfil do Ingresso</label>
    <select
      id="perfil"
      className="bg-transparent border border-[#607d8b] text-[#607d8b] text-sm rounded-lg focus:ring-[#404c76] focus:border-[#404c76] block w-full p-2.5"
      {...register("profile")}>
      <option value="meia-entrada">Meia entrada</option>
      <option value="entrada-inteira">Entrada inteira</option>
      <option value="entrada-gratuita">Entrada gratuita</option>
    </select>
    </div>
    <Input
      size="lg"
      label="quantidade*"
      {...register("amount")}
      color="indigo"
      error={Boolean(errors.amount)}
      containerProps={{ className: "min-w-[20px]" }}
    />
    <Input
      size="lg"
      label="preço"
      {...register("price")}
      color="indigo"
      error={Boolean(errors.price)}
    />
    <div className="flex flex-row w-full justify-between mt-4 mb-8">
      <Button onClick={handlePrev} className="bg-[#404c76]  hover:shadow-[#404c76]/50">
        Voltar
      </Button>
      <Button className="bg-[#404c76]  hover:shadow-[#404c76]/50">
        Cadastrar Ingresso
      </Button>
      <Button type="submit" className="bg-[#404c76]  hover:shadow-[#404c76]/50">
        Próximo
      </Button>
    </div>
  </form>
);
}