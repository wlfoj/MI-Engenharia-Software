import UseStepperContext from "../../../use/UseStepperContext";
import {
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseEventRegistrationContext from "../../../use/UseEventRegistrationContext";

type BasicInformationFormData = z.infer<typeof BasicInformationFormSchema>;

const BasicInformationFormSchema = z.object({
    name: z.string().min(1),
    image: z.string()

})

export default function BasicInformationForm() {

  const { infoStepper, setInfoStepper } = UseStepperContext();

  const { infoBasicInformationForm, setInfoBasicInformationForm } = UseEventRegistrationContext();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BasicInformationFormData>({
      resolver: zodResolver(BasicInformationFormSchema),
      criteriaMode: 'all',
          mode: 'all',
          defaultValues: {
            name: infoBasicInformationForm.name,
            image: infoBasicInformationForm.image,
          },
    })

  const onSubmit = (data: BasicInformationFormData) => {
    
    setInfoStepper({
      activeStep: infoStepper.activeStep+1
    });
    
    setInfoBasicInformationForm({
      name: data.name,
      image: data.image,
  });
}
  const handlePrev = (e: any) => {
    setInfoStepper({
      activeStep: infoStepper.activeStep-1
    });
  }

return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center px-8 gap-4 w-full mt-8">
    <Input
      size="lg"
      label="nome do evento*"
      {...register("name")}
      color="indigo"
      error={Boolean(errors.name)}
      containerProps={{ className: "min-w-[20px]" }}
    />
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
Clique para carregar</span> ou arraste e solte</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
    <div className="flex flex-row w-full justify-between mt-4 mb-8">
      <Button onClick={handlePrev} className="bg-[#404c76] hover:shadow-[#404c76]/50">
        Voltar
      </Button>
      <Button type="submit" className="bg-[#404c76] hover:shadow-[#404c76]/50">
        Próximo
      </Button>
    </div>
  </form>
  );
}
