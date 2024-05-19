

"use client";
import { ThemeProvider, Typography } from "@material-tailwind/react";
import { CustomerRegistrationContext } from "../../contexts/CustomerRegistrationContext";
import { StepperContext } from "../../contexts/StepperContext";
import React from "react";
import RegistrationSteps from "@/components/CustomerRegistration/Stepper";
 

export default function CustomerRegistration() {
  const [infoPersonalForm, setInfoPersonalForm] = React.useState({
    name: "",
    birthDate: "",
    CPF: "",
    phone: "",
  })

  const [infoAdressForm, setInfoAdressForm] = React.useState({
    CEP: "",
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: "",
  })

  const [infoAcessForm, setInfoAcessForm] = React.useState({
    email: "",
    password: "",
  })

  const [infoStepper, setInfoStepper] = React.useState({
    activeStep: 0
  })


  return (
      <StepperContext.Provider value={{ infoStepper, setInfoStepper }}>
        <CustomerRegistrationContext.Provider value={{ infoPersonalForm, setInfoPersonalForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm }} >
          <div className="w-full h-[90%] flex justify-center p-4">
            <div className="flex flex-col items-center w-[500px] h-fit rounded-lg bg-gray-200">
              <Typography variant="h2" className="text-[#404c76] mt-6 ml-4">
                Seja nosso cliente!
              </Typography>
              <Typography variant="small" className="text-[#404c76] mb-4 ml-4">
                Cadastre-se no sistema para fazer suas compras.
              </Typography>
              <RegistrationSteps />  
            </div>
          </div>
        </CustomerRegistrationContext.Provider>
      </StepperContext.Provider>
  );
}
