import UseStepperContext from "../../../use/UseStepperContext";
import {
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseEventRegistrationContext from "../../../use/UseEventRegistrationContext";

type DateFormData = z.infer<typeof DateFormSchema>;

const DateFormSchema = z.object({
    startDate: z.string().min(10),
    endDate: z.string().min(10),
    startTime: z.string().min(5),
    endTime: z.string().min(5),

})

export default function DateForm() {
  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoDateForm, setInfoDateForm } = UseEventRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DateFormData>({
      resolver: zodResolver(DateFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
            startDate: infoDateForm.startDate,
            endDate: infoDateForm.endDate,
            startTime: infoDateForm.endTime,
            endTime: infoDateForm.endTime,
          },
    })

  const onSubmit = (data: DateFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });

    setInfoDateForm({
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.endTime,
        endTime: data.endTime,
  });
  }  
  const handlePrev = (e: any) => {
    setInfoStepper({
      activeStep: infoStepper.activeStep-1
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
      <div className="flex flex-row gap-4">
        <Input size="lg" 
        label="data de inicio" 
        maxLength={10}
        type="date"
        {...register("startDate")}
        error={Boolean(errors.startDate)}
        containerProps={{ className: "min-w-[20px]" }}
        />
      
        <Input size="lg" 
        label="horário de início" 
        maxLength={5}
        type="time"
        {...register("startTime")}
        error={Boolean(errors.startTime)}
        containerProps={{ className: "min-w-[20px]" }}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input size="lg" 
        label="data de término" 
        maxLength={10}
        type="date"
        {...register("endDate")}
        error={Boolean(errors.endDate)}
        containerProps={{ className: "min-w-[20px]" }}
        />
      
        <Input size="lg" 
        label="horário de término" 
        maxLength={5}
        type="time"
        {...register("endTime")}
        error={Boolean(errors.endTime)}
        containerProps={{ className: "min-w-[20px]" }}
        />
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