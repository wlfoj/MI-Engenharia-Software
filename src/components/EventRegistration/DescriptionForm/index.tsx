import UseStepperContext from "../../../use/UseStepperContext";
import {
  Input,
  Button,
  Textarea,
  
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseEventRegistrationContext from "../../../use/UseEventRegistrationContext";

type DescriptionFormData = z.infer<typeof DescriptionFormSchema>;

const DescriptionFormSchema = z.object({
    Description: z.string().min(1),
})

export default function DescriptionForm() {
  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoDescriptionForm, setInfoDescriptionForm } = UseEventRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DescriptionFormData>({
      resolver: zodResolver(DescriptionFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
            Description: infoDescriptionForm.Description,
          },
    })

  const onSubmit = (data: DescriptionFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });

    setInfoDescriptionForm({
        Description: data.Description,
  });
  }  
  const handlePrev = (e: any) => {
    setInfoStepper({
      activeStep: infoStepper.activeStep-1
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
      <Textarea 
      cols={30}
      rows={5} 
      label="descrição do evento"
      {...register("Description")}
        color="indigo"
        error={Boolean(errors.Description)}
        containerProps={{ className: "min-w-[20px]" }}
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